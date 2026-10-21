import {
  FaRobot,
  FaFileAlt,
  FaChartLine,
  FaDownload,
  FaMagic,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot size={34} />,
    title: "AI Resume Builder",
    desc: "Generate a professional resume in minutes with intelligent AI assistance.",
  },
  {
    icon: <FaFileAlt size={34} />,
    title: "ATS Friendly",
    desc: "Create resumes optimized for Applicant Tracking Systems used by recruiters.",
  },
  {
    icon: <FaChartLine size={34} />,
    title: "ATS Score Analyzer",
    desc: "Instantly analyze your resume and receive actionable improvement tips.",
  },
  {
    icon: <FaMagic size={34} />,
    title: "AI Content Suggestions",
    desc: "Improve summaries, work experience, projects and skills with AI.",
  },
  {
    icon: <FaDownload size={34} />,
    title: "One Click PDF",
    desc: "Download clean, professional and recruiter-friendly PDF resumes.",
  },
  {
    icon: <FaShieldAlt size={34} />,
    title: "Secure Cloud Storage",
    desc: "Save and manage multiple resumes securely from your dashboard.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="bg-slate-50 py-24"
    >
      <div className="w-full px-6 lg:px-12 xl:px-16">

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-emerald-600 font-semibold uppercase tracking-widest">
            FEATURES
          </span>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            Everything You Need to Build a Winning Resume
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            ResumeAI combines Artificial Intelligence, ATS optimization and
            modern resume templates to help you land more interviews.
          </p>

        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-2xl"
            >

              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;