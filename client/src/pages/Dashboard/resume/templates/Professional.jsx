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

export default function Professional({
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
      {/* 
        Standard A4 sheet: 210mm x 297mm (794px x 1123px at 96 DPI)
      */}
      <div
        className="
          resume-sheet
          w-full max-w-[800px]
          min-h-[1122px]
          bg-white
          text-slate-800
          shadow-lg
          border border-slate-200
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
        {/* ================= HEADER ================= */}
        <header className="border-b-2 border-slate-900 pb-5 mb-6">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-slate-900 uppercase leading-tight mb-1">
                {formData.fullName || "YOUR NAME"}
              </h1>

              <p className="text-sm font-semibold text-blue-700 uppercase leading-normal mb-3">
                {formData.jobTitle || "Professional Title"}
              </p>

              {/* Contact Bar with explicit margins for PDF export */}
              <div className="flex flex-wrap items-center text-xs text-slate-600 leading-normal">
                {formData.email && (
                  <a
                    href={`mailto:${formData.email}`}
                    className="hover:text-blue-700 transition mr-4 mb-2 inline-flex items-center"
                  >
                    <span className="mr-1">✉️</span> {formData.email}
                  </a>
                )}

                {formData.phone && (
                  <a
                    href={`tel:${formData.phone}`}
                    className="hover:text-blue-700 transition mr-4 mb-2 inline-flex items-center"
                  >
                    <span className="mr-1">📞</span> {formData.phone}
                  </a>
                )}

                {(formData.address || formData.city) && (
                  <span className="mr-4 mb-2 inline-flex items-center">
                    <span className="mr-1">📍</span>
                    {[formData.address || formData.city, formData.state, formData.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                )}

                {formData.linkedin && (
                  <a
                    href={getValidUrl(formData.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline mr-4 mb-2 inline-flex items-center"
                  >
                    <span className="mr-1">🔗</span> LinkedIn
                  </a>
                )}

                {formData.github && (
                  <a
                    href={getValidUrl(formData.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline mr-4 mb-2 inline-flex items-center"
                  >
                    <span className="mr-1">💻</span> GitHub
                  </a>
                )}

                {formData.portfolio && (
                  <a
                    href={getValidUrl(formData.portfolio)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline mr-4 mb-2 inline-flex items-center"
                  >
                    <span className="mr-1">🌐</span> Portfolio
                  </a>
                )}
              </div>
            </div>

            {/* Profile Photo if provided */}
            {formData.photo && (
              <div className="flex-shrink-0">
                <img
                  src={
                    typeof formData.photo === "string"
                      ? formData.photo
                      : URL.createObjectURL(formData.photo)
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-lg object-cover border-2 border-slate-300 shadow-sm"
                />
              </div>
            )}
          </div>
        </header>

        {/* ================= EXECUTIVE SUMMARY ================= */}
        {formData.summary?.trim() && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2.5 leading-snug">
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-slate-700 text-justify mb-0">
              {formData.summary}
            </p>
          </section>
        )}

        {/* ================= EXPERIENCE & INTERNSHIPS ================= */}
        {validExperience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3.5 leading-snug">
              Work Experience & Internships
            </h2>

            <div className="space-y-4">
              {validExperience.map((exp, index) => {
                const dateRange = [
                  formatMonthYear(exp.startDate),
                  exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate),
                ]
                  .filter(Boolean)
                  .join(" – ");

                const bullets = exp.description
                  ? exp.description
                      .split("\n")
                      .map((l) => l.trim())
                      .filter(Boolean)
                  : [];

                return (
                  <div key={index} className="text-xs break-inside-avoid mb-3">
                    <div className="flex justify-between items-baseline gap-4 mb-1">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">
                          {exp.role || "Role"}
                        </span>
                        <span className="text-slate-400 mx-1.5">•</span>
                        <span className="font-semibold text-blue-800">
                          {exp.company || "Company"}
                        </span>
                        {exp.city && (
                          <span className="text-slate-500 font-normal ml-1">
                            ({exp.city})
                          </span>
                        )}
                      </div>

                      {dateRange && (
                        <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                          {dateRange}
                        </span>
                      )}
                    </div>

                    {bullets.length > 0 && (
                      <ul className="mt-1.5 space-y-1 list-disc pl-5 text-slate-700 leading-relaxed">
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

        {/* ================= EDUCATION ================= */}
        {validEducation.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3.5 leading-snug">
              Education
            </h2>

            <div className="space-y-3">
              {validEducation.map((edu, index) => {
                const dateRange = [
                  edu.startYear,
                  edu.currentlyStudying ? "Present" : edu.endYear,
                ]
                  .filter(Boolean)
                  .join(" – ");

                return (
                  <div key={index} className="text-xs break-inside-avoid mb-2.5">
                    <div className="flex justify-between items-baseline gap-4">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">
                          {edu.qualification || "Degree"}
                        </span>
                        {edu.branch && (
                          <span className="text-slate-700 font-medium">
                            {" "}in {edu.branch}
                          </span>
                        )}
                        <span className="text-slate-400 mx-1.5">•</span>
                        <span className="font-medium text-slate-700">
                          {edu.institution || "Institution"}
                        </span>
                        {(edu.board || edu.city) && (
                          <span className="text-slate-500 ml-1">
                            ({[edu.board, edu.city].filter(Boolean).join(", ")})
                          </span>
                        )}
                      </div>

                      {dateRange && (
                        <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                          {dateRange}
                        </span>
                      )}
                    </div>

                    {edu.score && (
                      <p className="mt-0.5 text-[11px] font-medium text-slate-600">
                        Score / GPA: <span className="text-slate-800">{edu.score}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================= KEY PROJECTS ================= */}
        {validProjects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3.5 leading-snug">
              Key Projects
            </h2>

            <div className="space-y-3.5">
              {validProjects.map((project, index) => {
                const bullets = project.description
                  ? project.description
                      .split("\n")
                      .map((l) => l.trim())
                      .filter(Boolean)
                  : [];

                return (
                  <div key={index} className="text-xs break-inside-avoid mb-3">
                    <div className="flex justify-between items-baseline gap-4 mb-1">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">
                          {project.title}
                        </span>
                        {project.technologies && (
                          <span className="text-blue-700 font-medium ml-2">
                            | {project.technologies}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-[11px]">
                        {project.github && (
                          <a
                            href={getValidUrl(project.github)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline"
                          >
                            GitHub
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={getValidUrl(project.live)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-700 hover:underline"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    {bullets.length > 0 && (
                      <ul className="mt-1 space-y-1 list-disc pl-5 text-slate-700 leading-relaxed">
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

        {/* ================= SKILLS ================= */}
        {skillsList.length > 0 && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-3 leading-snug">
              Technical & Professional Skills
            </h2>

            <div className="flex flex-wrap text-xs">
              {skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="
                    px-2.5
                    py-1
                    rounded
                    bg-slate-100
                    border
                    border-slate-300
                    text-[11px]
                    font-medium
                    text-slate-800
                    mr-2
                    mb-2
                    inline-block
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ================= CERTIFICATIONS ================= */}
        {certsList.length > 0 && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2.5 leading-snug">
              Certifications & Credentials
            </h2>

            <ul className="space-y-1 list-disc pl-5 text-xs text-slate-700 leading-relaxed">
              {certsList.map((cert, index) => (
                <li key={index} className="font-medium text-slate-800 mb-1">
                  {cert}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ================= LANGUAGES ================= */}
        {languagesList.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2.5 leading-snug">
              Languages
            </h2>

            <div className="flex flex-wrap text-xs">
              {languagesList.map((lang, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 mr-2 mb-2 inline-block"
                >
                  {lang}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}