import {
  FaUserPlus,
  FaEdit,
  FaDownload,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: <FaUserPlus size={34} />,
    title: "Create Your Account",
    desc: "Sign up in seconds and access your personal ResumeAI dashboard.",
  },
  {
    number: "02",
    icon: <FaEdit size={34} />,
    title: "Build Your Resume",
    desc: "Fill in your details and let AI generate a professional ATS-friendly resume.",
  },
  {
    number: "03",
    icon: <FaDownload size={34} />,
    title: "Download & Apply",
    desc: "Download your resume as a high-quality PDF and start applying for jobs.",
  },
];

const HowWorks = () => {
  return (
    <section
      id="how"
      className="bg-white py-24"
    >
      <div className="w-full px-6 lg:px-12 xl:px-16">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">

          <span className="text-emerald-600 font-semibold uppercase tracking-widest">
            HOW IT WORKS
          </span>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            Build Your Resume in 3 Simple Steps
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            ResumeAI makes resume creation simple, fast and AI-powered.
          </p>

        </div>

        {/* Steps */}
        <div className="relative mt-20 grid gap-10 md:grid-cols-3">

          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-20 hidden md:block h-1 bg-slate-200"></div>

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-2xl"
            >
              {/* Step Number */}
              <div className="absolute right-6 top-6 text-5xl font-extrabold text-slate-100">
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-4 leading-7 text-slate-600">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowWorks;