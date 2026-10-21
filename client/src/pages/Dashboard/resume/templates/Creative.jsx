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

export default function Creative({
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
          text-slate-800
          shadow-lg
          border border-slate-200
          flex
          font-sans
          box-border
          print:border-0
          print:shadow-none
          print:w-full
        "
        style={{ letterSpacing: "normal" }}
      >
        {/* Left Sidebar */}
        <aside className="w-[34%] bg-slate-900 text-white p-7 flex flex-col justify-between box-border flex-shrink-0">
          <div>
            {/* Photo */}
            {formData.photo && (
              <div className="mb-6 flex justify-center">
                <img
                  src={
                    typeof formData.photo === "string"
                      ? formData.photo
                      : URL.createObjectURL(formData.photo)
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-2xl object-cover border-2 border-indigo-400 shadow-lg"
                />
              </div>
            )}

            {/* Contact */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase text-indigo-400 border-b border-slate-700 pb-1 mb-3">
                Contact
              </h3>

              <div className="space-y-2 text-xs text-slate-300 leading-normal">
                {formData.email && (
                  <p className="break-all mb-2">✉️ {formData.email}</p>
                )}
                {formData.phone && (
                  <p className="mb-2">📞 {formData.phone}</p>
                )}
                {(formData.address || formData.city) && (
                  <p className="mb-2">📍 {[formData.address || formData.city, formData.country].filter(Boolean).join(", ")}</p>
                )}
                {formData.linkedin && (
                  <p className="mb-2">
                    🔗 <a href={getValidUrl(formData.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 hover:underline">LinkedIn</a>
                  </p>
                )}
                {formData.github && (
                  <p className="mb-2">
                    💻 <a href={getValidUrl(formData.github)} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 hover:underline">GitHub</a>
                  </p>
                )}
                {formData.portfolio && (
                  <p className="mb-2">
                    🌐 <a href={getValidUrl(formData.portfolio)} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300 hover:underline">Portfolio</a>
                  </p>
                )}
              </div>
            </div>

            {/* Skills */}
            {skillsList.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase text-indigo-400 border-b border-slate-700 pb-1 mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap">
                  {skillsList.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-800 text-indigo-200 border border-slate-700 text-[11px] mr-1.5 mb-1.5 inline-block"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education in Sidebar */}
            {validEducation.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase text-indigo-400 border-b border-slate-700 pb-1 mb-3">
                  Education
                </h3>
                <div className="space-y-3">
                  {validEducation.map((edu, i) => (
                    <div key={i} className="text-xs mb-2">
                      <p className="font-semibold text-white leading-tight">
                        {edu.qualification}{edu.branch ? ` - ${edu.branch}` : ""}
                      </p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{edu.institution}</p>
                      <p className="text-slate-500 text-[10px]">
                        {edu.startYear} - {edu.currentlyStudying ? "Present" : edu.endYear}
                        {edu.score ? ` • ${edu.score}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications in Sidebar */}
            {certsList.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase text-indigo-400 border-b border-slate-700 pb-1 mb-2">
                  Certifications
                </h3>
                <ul className="text-xs text-slate-300 space-y-1 pl-3 list-disc">
                  {certsList.map((c, i) => (
                    <li key={i} className="text-[11px] mb-1">{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {languagesList.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase text-indigo-400 border-b border-slate-700 pb-1 mb-2">
                  Languages
                </h3>
                <p className="text-xs text-slate-300 leading-normal">
                  {languagesList.join(", ")}
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="w-[66%] p-8 bg-white flex flex-col justify-between box-border">
          <div>
            {/* Header */}
            <div className="border-b-2 border-indigo-600 pb-4 mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-1">
                {formData.fullName || "YOUR NAME"}
              </h1>
              <p className="text-sm font-semibold text-indigo-600 uppercase leading-normal">
                {formData.jobTitle || "Professional Title"}
              </p>
            </div>

            {/* Summary */}
            {formData.summary?.trim() && (
              <div className="mb-6 break-inside-avoid">
                <h2 className="text-xs font-bold uppercase text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block mr-1"></span>
                  Professional Profile
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed text-justify mb-0">
                  {formData.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {validExperience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block mr-1"></span>
                  Work Experience & Internships
                </h2>

                <div className="space-y-4">
                  {validExperience.map((exp, i) => {
                    const bullets = exp.description
                      ? exp.description.split("\n").map((l) => l.trim()).filter(Boolean)
                      : [];

                    return (
                      <div key={i} className="text-xs break-inside-avoid mb-3">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-bold text-slate-900 text-sm">
                            {exp.role}
                          </span>
                          <span className="text-[11px] text-slate-400 whitespace-nowrap">
                            {formatMonthYear(exp.startDate)} – {exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate)}
                          </span>
                        </div>
                        <p className="text-indigo-600 font-semibold text-xs mb-1">
                          {exp.company}{exp.city ? ` | ${exp.city}` : ""}
                        </p>
                        {bullets.length > 0 && (
                          <ul className="mt-1 space-y-1 list-disc pl-5 text-slate-600 leading-relaxed">
                            {bullets.map((b, idx) => (
                              <li key={idx} className="mb-1">{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Projects */}
            {validProjects.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block mr-1"></span>
                  Featured Projects
                </h2>

                <div className="space-y-3.5">
                  {validProjects.map((p, i) => {
                    const bullets = p.description
                      ? p.description.split("\n").map((l) => l.trim()).filter(Boolean)
                      : [];

                    return (
                      <div key={i} className="text-xs break-inside-avoid mb-3">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-bold text-slate-900 text-sm">
                            {p.title}
                          </span>
                          <div className="flex gap-2 text-[11px]">
                            {p.github && (
                              <a href={getValidUrl(p.github)} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline mr-2">GitHub</a>
                            )}
                            {p.live && (
                              <a href={getValidUrl(p.live)} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Live</a>
                            )}
                          </div>
                        </div>
                        {p.technologies && (
                          <p className="text-indigo-600 font-medium text-[11px] mb-1">
                            {p.technologies}
                          </p>
                        )}
                        {bullets.length > 0 && (
                          <ul className="mt-1 space-y-1 list-disc pl-5 text-slate-600 leading-relaxed">
                            {bullets.map((b, idx) => (
                              <li key={idx} className="mb-1">{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}