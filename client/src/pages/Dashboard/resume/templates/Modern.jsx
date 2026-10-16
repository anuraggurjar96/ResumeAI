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

  return url.startsWith("http")
    ? url
    : `https://${url}`;
}

export default function Modern({
  formData,
  education,
  experiences,
  projects,
}) {
  return (
    <div className="w-full h-full flex justify-center items-start bg-[#f5f6fa] p-4">

  <div
    className="
      w-full max-w-[850px]
      min-h-[1100px]
      bg-white
      p-10
      text-gray-800
      leading-relaxed
      overflow-hidden
    "
  >

      {/* ================= HEADER ================= */}

<header className="border-b-2 border-gray-300 pb-6">

  <div className="flex justify-between items-start gap-8">

    {/* Left */}

    <div className="flex-1">

      <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">

        {formData.fullName || "YOUR NAME"}

      </h1>

      <p className="mt-1 text-lg font-medium text-blue-600">

        {formData.jobTitle || "Professional Title"}

      </p>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">

        {formData.email && (

          <a
            href={`mailto:${formData.email}`}
            className="hover:text-blue-600 transition"
          >
            📧 {formData.email}
          </a>

        )}

        {formData.phone && (

          <a
            href={`tel:${formData.phone}`}
            className="hover:text-blue-600 transition"
          >
            📞 {formData.phone}
          </a>

        )}

        {formData.address && (

          <span>
            📍 {formData.address}
          </span>

        )}

        {formData.linkedin && (

          <a
            href={getValidUrl(formData.linkedin)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline transition"
          >
            🔗 LinkedIn
          </a>

        )}

        {formData.github && (

          <a
            href={getValidUrl(formData.github)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline transition"
          >
            💻 GitHub
          </a>

        )}

      </div>

    </div>

    {/* Profile Photo */}

    {formData.photo && (

      <img
        src={URL.createObjectURL(formData.photo)}
        alt="Profile"
        className="
          w-32
          h-32
          rounded-full
          object-cover
          border-4
          border-gray-300
          shadow-lg
          flex-shrink-0
        "
      />

    )}

  </div>

</header>

        {/* ========= EDUCATION START ========= */}
                {/* ================= EDUCATION ================= */}

        {education?.length > 0 && (
          <section className="mt-8">

            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-800 border-b-2 border-gray-300 pb-2">
              Education
            </h2>

            <div className="mt-5 space-y-6">

              {education.map((edu, index) => (

                <div
                  key={index}
                  className="flex justify-between items-start gap-8"
                >

                  {/* Left */}

                  <div className="flex-1">

                    <h3 className="text-lg font-semibold text-gray-900">

                      {edu.qualification || "Qualification"}

                      {edu.branch && (
                        <span className="font-normal">
                          {" "}
                          • {edu.branch}
                        </span>
                      )}

                    </h3>

                    <p className="text-gray-700 mt-1">

                      {edu.institution || "Institution"}

                    </p>

                    {(edu.board || edu.city) && (

                      <p className="text-sm text-gray-500 mt-1">

                        {edu.board}

                        {edu.board && edu.city && " • "}

                        {edu.city}

                      </p>

                    )}

                    {edu.score && (

                      <p className="mt-2 text-sm font-medium text-gray-700">

                        Score : {edu.score}

                      </p>

                    )}

                  </div>

                  {/* Right */}

                  <div className="text-sm text-gray-500 whitespace-nowrap">

                    {edu.startYear}

                    {edu.startYear && " – "}

                    {edu.currentlyStudying
                      ? "Present"
                      : edu.endYear}

                  </div>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* ========= EXPERIENCE START ========= */}
                {/* ================= EXPERIENCE ================= */}

        {experiences?.length > 0 && (
          <section className="mt-8">

            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-800 border-b-2 border-gray-300 pb-2">
              Experience
            </h2>

            <div className="mt-5 space-y-7">

              {experiences.map((exp, index) => (

                <div
                  key={index}
                  className="flex justify-between items-start gap-8"
                >

                  {/* Left */}

                  <div className="flex-1">

                    <h3 className="text-lg font-semibold text-gray-900">

                      {exp.role || "Job Title"}

                    </h3>

                    <p className="mt-1 text-gray-700">

                      {exp.company || "Company Name"}

                    </p>

                    {exp.city && (

                      <p className="mt-1 text-sm text-gray-500">

                        📍 {exp.city}

                      </p>

                    )}

                    {exp.description && (

                      <ul className="mt-3 space-y-1 list-disc pl-5 text-sm text-gray-700">

                        {exp.description
                          .split("\n")
                          .map(item => item.trim())
                          .filter(item => item !== "")
                          .slice(0, 4)
                          .map((item, i) => (

                            <li key={i}>
                              {item}
                            </li>

                          ))}

                      </ul>

                    )}

                  </div>

                  {/* Right */}

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
          <section className="mt-8">

            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-800 border-b-2 border-gray-300 pb-2">
              Projects
            </h2>

            <div className="mt-5 space-y-7">

              {projects.map((project, index) => (

                <div
                  key={index}
                  className="flex justify-between items-start gap-8"
                >

                  {/* Left */}

                  <div className="flex-1">

                    <h3 className="text-lg font-semibold text-gray-900">

                      {project.title || "Project Name"}

                    </h3>

                    {project.technologies && (

                      <p className="mt-1 text-sm text-blue-700 font-medium">

                        {project.technologies}

                      </p>

                    )}

                    {project.description && (

                      <ul className="mt-3 space-y-1 list-disc pl-5 text-sm text-gray-700">

                        {project.description
                          .split("\n")
                          .map(item => item.trim())
                          .filter(item => item !== "")
                          .slice(0, 3)
                          .map((item, i) => (

                            <li key={i}>
                              {item}
                            </li>

                          ))}

                      </ul>

                    )}

                  </div>

                  {/* Right */}

<div className="mt-3 flex flex-wrap gap-4 text-sm">
  {project.github && (
    <a
      href={getValidUrl(project.github)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
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
          <section className="mt-8">

            <h2 className="text-xl font-bold uppercase tracking-wide text-gray-800 border-b-2 border-gray-300 pb-2">
              Skills
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">

              {[...new Set(
                formData.skills
                  .split(",")
                  .map(skill => skill.trim())
                  .filter(skill => skill !== "")
              )]
                .sort((a, b) => a.localeCompare(b))
                .map((skill, index) => (

                  <span
                    key={index}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-gray-100
                      border
                      border-gray-300
                      text-sm
                      font-medium
                      text-gray-700
                      hover:bg-blue-50
                      hover:border-blue-300
                      transition
                    "
                  >
                    {skill}
                  </span>

                ))}

            </div>

          </section>
        )}

      </div>

    </div>
  );
}