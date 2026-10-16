import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              🚀 AI Powered Resume Builder
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-slate-900">
              Build an
              <span className="text-emerald-600"> ATS-Friendly </span>
              Resume with AI
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Create professional resumes, analyze ATS score, optimize keywords,
              and land more interviews with the power of AI.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/register"
                className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Build Resume Free
              </Link>

              <a
                href="#features"
                className="rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-600"
              >
                Explore Features
              </a>

            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-slate-700">

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600" />
                ATS Optimized
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600" />
                AI Suggestions
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600" />
                PDF Download
              </div>

            </div>

          </div>

          {/* Right Content */}
          <div className="relative">

            <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop"
                alt="Resume Builder"
                className="rounded-2xl"
              />

            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-white p-5 shadow-xl">

              <h3 className="text-sm text-slate-500">
                ATS Score
              </h3>

              <p className="text-3xl font-bold text-emerald-600">
                92%
              </p>

              <p className="text-sm text-slate-500">
                Excellent Resume
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;