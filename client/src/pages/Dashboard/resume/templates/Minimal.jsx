import React from "react";

function formatMonthYear(date) {
  if (!date) return "";
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const [year, month] = date.split("-");
  if (!year || !month) return date;
  return `${months[Number(month) - 1]} ${year}`;
}

function getValidUrl(url) {
  if (!url) return "";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
}

export default function Minimal({
  formData = {},
  education = [],
  experiences = [],
  projects = [],
}) {
  const skillsList = formData.skills
    ? [...new Set(
        formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      )]
    : [];

  const certsList = formData.certifications
    ? formData.certifications
        .split(/[,\n]/)
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  const languagesList = formData.languages
    ? formData.languages
        .split(/[,\n]/)
        .map((l) => l.trim())
        .filter(Boolean)
    : [];

  const validEducation = (education || []).filter(
    (edu) => edu.institution || edu.qualification
  );
  const validExperience = (experiences || []).filter(
    (exp) => exp.company || exp.role
  );
  const validProjects = (projects || []).filter((p) => p.title);

  return (
    <div className="w-full flex justify-center items-start bg-[#f5f6fa] p-4 print:p-0 print:bg-white">
      <div
        className="
          resume-sheet
          w-full max-w-[800px]
          min-h-[1122px]
          bg-white
          text-gray-900
          shadow-lg
          border border-gray-100
          p-8
          font-sans
          box-border
          print:border-0
          print:shadow-none
          print:p-8
          print:w-full
        "
        style={{ letterSpacing: "normal" }}
      >
        {/* Header */}
        <header className="text-center pb-6 mb-6 border-b border-gray-200">
          <h1 className="text-3xl font-light uppercase text-gray-900 leading-tight mb-1">
            {formData.fullName || "YOUR NAME"}
          </h1>

          <p className="text-sm text-gray-500 font-normal uppercase leading-normal mb-3">
            {formData.jobTitle || "Professional Title"}
          </p>

          <div className="flex flex-wrap justify-center items-center text-xs text-gray-500 leading-normal">
            {formData.email && <span className="mx-2 mb-1">{formData.email}</span>}
            {formData.phone && <span className="mx-2 mb-1">• {formData.phone}</span>}
            {(formData.address || formData.city) && (
              <span className="mx-2 mb-1">• {[formData.address || formData.city, formData.country].filter(Boolean).join(", ")}</span>
            )}
            {formData.linkedin && (
              <span className="mx-2 mb-1">
                • <a href={getValidUrl(formData.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700">LinkedIn</a>
              </span>
            )}
            {formData.github && (
              <span className="mx-2 mb-1">
                • <a href={getValidUrl(formData.github)} target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700">GitHub</a>
              </span>
            )}
            {formData.portfolio && (
              <span className="mx-2 mb-1">
                • <a href={getValidUrl(formData.portfolio)} target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700">Portfolio</a>
              </span>
            )}
          </div>
        </header>

        {/* Summary */}
        {formData.summary?.trim() && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xs font-semibold uppercase text-gray-400 mb-2.5 leading-snug">
              About
            </h2>
            <p className="text-xs leading-relaxed text-gray-700 text-justify mb-0">
              {formData.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {validExperience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-semibold uppercase text-gray-400 mb-3.5 leading-snug">
              Experience
            </h2>

            <div className="space-y-4">
              {validExperience.map((exp, index) => {
                const dateRange = [
                  formatMonthYear(exp.startDate),
                  exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate),
                ].filter(Boolean).join(" – ");

                const bullets = exp.description
                  ? exp.description.split("\n").map((l) => l.trim()).filter(Boolean)
                  : [];

                return (
                  <div key={index} className="text-xs break-inside-avoid mb-3">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-medium text-gray-900 text-sm">
                        {exp.role || "Role"}
                      </span>
                      {dateRange && (
                        <span className="text-[11px] text-gray-400 whitespace-nowrap">
                          {dateRange}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 italic mb-1.5">
                      {exp.company}{exp.city ? `, ${exp.city}` : ""}
                    </p>
                    {bullets.length > 0 && (
                      <ul className="mt-1 space-y-1 list-disc pl-5 text-gray-600 leading-relaxed">
                        {bullets.map((b, i) => (
                          <li key={i} className="mb-1">{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education */}
        {validEducation.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-semibold uppercase text-gray-400 mb-3.5 leading-snug">
              Education
            </h2>

            <div className="space-y-3">
              {validEducation.map((edu, index) => {
                const dateRange = [
                  edu.startYear,
                  edu.currentlyStudying ? "Present" : edu.endYear,
                ].filter(Boolean).join(" – ");

                return (
                  <div key={index} className="text-xs break-inside-avoid mb-2.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-medium text-gray-900 text-sm">
                        {edu.qualification}{edu.branch ? ` in ${edu.branch}` : ""}
                      </span>
                      {dateRange && (
                        <span className="text-[11px] text-gray-400 whitespace-nowrap">
                          {dateRange}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 mt-0.5">
                      {edu.institution}{edu.city ? `, ${edu.city}` : ""}
                      {edu.score ? ` • GPA/Score: ${edu.score}` : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {validProjects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-semibold uppercase text-gray-400 mb-3.5 leading-snug">
              Projects
            </h2>

            <div className="space-y-3">
              {validProjects.map((p, index) => {
                const bullets = p.description
                  ? p.description.split("\n").map((l) => l.trim()).filter(Boolean)
                  : [];

                return (
                  <div key={index} className="text-xs break-inside-avoid mb-3">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-medium text-gray-900 text-sm">
                        {p.title}
                        {p.technologies && (
                          <span className="text-gray-500 font-normal ml-2">
                            ({p.technologies})
                          </span>
                        )}
                      </span>
                      <div className="flex gap-2 text-[11px] text-gray-400">
                        {p.github && (
                          <a href={getValidUrl(p.github)} target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600 mr-2">GitHub</a>
                        )}
                        {p.live && (
                          <a href={getValidUrl(p.live)} target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600">Live</a>
                        )}
                      </div>
                    </div>
                    {bullets.length > 0 && (
                      <ul className="mt-1 space-y-1 list-disc pl-5 text-gray-600 leading-relaxed">
                        {bullets.map((b, i) => (
                          <li key={i} className="mb-1">{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills */}
        {skillsList.length > 0 && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xs font-semibold uppercase text-gray-400 mb-2.5 leading-snug">
              Skills
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              {skillsList.join("  •  ")}
            </p>
          </section>
        )}

        {/* Certifications */}
        {certsList.length > 0 && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xs font-semibold uppercase text-gray-400 mb-2.5 leading-snug">
              Certifications
            </h2>
            <ul className="text-xs text-gray-700 space-y-1 list-disc pl-5 leading-relaxed">
              {certsList.map((c, i) => (
                <li key={i} className="mb-1">{c}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {languagesList.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-semibold uppercase text-gray-400 mb-1.5 leading-snug">
              Languages
            </h2>
            <p className="text-xs text-gray-600 leading-normal">
              {languagesList.join(", ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}