import React from "react";

function formatMonthYear(date) {
  if (!date) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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

export default function Modern({
  formData = {},
  education = [],
  experiences = [],
  projects = [],
}) {
  return (
    <div className="w-full h-full flex justify-center items-start bg-[#f5f6fa] p-4 print:p-0 print:bg-white">
      <div
        className="
          resume-sheet
          w-full max-w-[800px]
          min-h-[1122px]
          bg-white
          p-8
          text-gray-800
          leading-relaxed
          box-border
          print:border-0
          print:shadow-none
          print:p-8
          print:w-full
        "
        style={{ letterSpacing: "normal" }}
      >
        {/* ================= HEADER ================= */}
        <header className="border-b-2 border-gray-300 pb-6 mb-6">
          <div className="flex justify-between items-start gap-8">
            {/* Left */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold uppercase text-gray-900 leading-tight mb-1">
                {formData.fullName || "YOUR NAME"}
              </h1>

              <p className="mt-1 text-lg font-medium text-blue-600 leading-normal mb-3">
                {formData.jobTitle || "Professional Title"}
              </p>

              <div className="flex flex-wrap text-sm text-gray-700 leading-normal">
                {formData.email && (
                  <a
                    href={`mailto:${formData.email}`}
                    className="hover:text-blue-600 transition mr-5 mb-2 inline-flex items-center"
                  >
                    <span className="mr-1">📧</span> {formData.email}
                  </a>
                )}

                {formData.phone && (
                  <a
                    href={`tel:${formData.phone}`}
                    className="hover:text-blue-600 transition mr-5 mb-2 inline-flex items-center"
                  >
                    <span className="mr-1">📞</span> {formData.phone}
                  </a>
                )}

                {(formData.address || formData.city) && (
                  <span className="mr-5 mb-2 inline-flex items-center">
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
                    className="text-blue-600 hover:text-blue-800 hover:underline transition mr-5 mb-2 inline-flex items-center"
                  >
                    <span className="mr-1">🔗</span> LinkedIn
                  </a>
                )}

                {formData.github && (
                  <a
                    href={getValidUrl(formData.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition mr-5 mb-2 inline-flex items-center"
                  >
                    <span className="mr-1">💻</span> GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Profile Photo */}
            {formData.photo && (
              <img
                src={
                  typeof formData.photo === "string"
                    ? formData.photo
                    : URL.createObjectURL(formData.photo)
                }
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-lg flex-shrink-0"
              />
            )}
          </div>
        </header>

        {/* ================= SUMMARY ================= */}
        {formData.summary?.trim() && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xl font-bold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-3 leading-snug">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify mb-0">
              {formData.summary}
            </p>
          </section>
        )}

        {/* ================= EDUCATION ================= */}
        {education?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 leading-snug">
              Education
            </h2>

            <div className="space-y-5">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-8 break-inside-avoid mb-3"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {edu.qualification || "Qualification"}
                      {edu.branch && (
                        <span className="font-normal"> • {edu.branch}</span>
                      )}
                    </h3>

                    <p className="text-gray-700 mt-1 leading-normal">
                      {edu.institution || "Institution"}
                    </p>

                    {(edu.board || edu.city) && (
                      <p className="text-sm text-gray-500 mt-1 leading-normal">
                        {edu.board}
                        {edu.board && edu.city && " • "}
                        {edu.city}
                      </p>
                    )}

                    {edu.score && (
                      <p className="mt-1 text-sm font-medium text-gray-700 leading-normal">
                        Score : {edu.score}
                      </p>
                    )}
                  </div>

                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {edu.startYear}
                    {edu.startYear && " – "}
                    {edu.currentlyStudying ? "Present" : edu.endYear}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= EXPERIENCE ================= */}
        {experiences?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 leading-snug">
              Experience
            </h2>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-8 break-inside-avoid mb-4"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {exp.role || "Job Title"}
                    </h3>

                    <p className="mt-1 text-gray-700 leading-normal">
                      {exp.company || "Company Name"}
                    </p>

                    {exp.city && (
                      <p className="mt-1 text-sm text-gray-500 leading-normal">
                        📍 {exp.city}
                      </p>
                    )}

                    {exp.description && (
                      <ul className="mt-2 space-y-1.5 list-disc pl-5 text-sm text-gray-700 leading-relaxed">
                        {exp.description
                          .split("\n")
                          .map((item) => item.trim())
                          .filter((item) => item !== "")
                          .map((item, i) => (
                            <li key={i} className="mb-1">{item}</li>
                          ))}
                      </ul>
                    )}
                  </div>

                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {formatMonthYear(exp.startDate)}
                    {" – "}
                    {exp.currentlyWorking
                      ? "Present"
                      : formatMonthYear(exp.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= PROJECTS ================= */}
        {projects?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 leading-snug">
              Projects
            </h2>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-8 break-inside-avoid mb-4"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {project.title || "Project Name"}
                    </h3>

                    {project.technologies && (
                      <p className="mt-1 text-sm text-blue-700 font-medium leading-normal">
                        {project.technologies}
                      </p>
                    )}

                    {project.description && (
                      <ul className="mt-2 space-y-1.5 list-disc pl-5 text-sm text-gray-700 leading-relaxed">
                        {project.description
                          .split("\n")
                          .map((item) => item.trim())
                          .filter((item) => item !== "")
                          .map((item, i) => (
                            <li key={i} className="mb-1">{item}</li>
                          ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm">
                    {project.github && (
                      <a
                        href={getValidUrl(project.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline mr-2"
                      >
                        💻 GitHub
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={getValidUrl(project.live)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        🌐 Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= SKILLS ================= */}
        {formData.skills?.trim() && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xl font-bold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-3 leading-snug">
              Skills
            </h2>

            <div className="flex flex-wrap">
              {[
                ...new Set(
                  formData.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter((skill) => skill !== "")
                ),
              ]
                .sort((a, b) => a.localeCompare(b))
                .map((skill, index) => (
                  <span
                    key={index}
                    className="
                      px-4
                      py-1.5
                      rounded-full
                      bg-gray-100
                      border
                      border-gray-300
                      text-sm
                      font-medium
                      text-gray-700
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
        {formData.certifications?.trim() && (
          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xl font-bold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-3 leading-snug">
              Certifications
            </h2>
            <ul className="space-y-2 list-disc pl-5 text-sm text-gray-700 leading-relaxed">
              {formData.certifications
                .split(/[,\n]/)
                .map((c) => c.trim())
                .filter(Boolean)
                .map((cert, index) => (
                  <li key={index} className="font-medium mb-1">
                    {cert}
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* ================= LANGUAGES ================= */}
        {formData.languages?.trim() && (
          <section className="break-inside-avoid">
            <h2 className="text-xl font-bold uppercase text-gray-800 border-b-2 border-gray-300 pb-2 mb-3 leading-snug">
              Languages
            </h2>
            <div className="flex flex-wrap">
              {formData.languages
                .split(/[,\n]/)
                .map((l) => l.trim())
                .filter(Boolean)
                .map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-xs font-medium mr-2 mb-2 inline-block"
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