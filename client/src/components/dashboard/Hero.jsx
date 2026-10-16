import { Sparkles } from "lucide-react";

function Hero({ user }) {
  return (
    <section className="mt-8 bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={24} className="text-indigo-600" />

          <span className="text-sm font-medium tracking-wide uppercase text-indigo-600">
            
          </span>
        </div>

        <h2 className="text-4xl font-bold text-slate-900">
          Welcome , {user?.name || "User"} 
        </h2>

        <p className="mt-4 text-slate-600 text-lg leading-8">
          Create, manage and improve your resumes with AI assistance.
          Build resumes that stand out and increase your chances of getting shortlisted.
        </p>
      </div>
    </section>
  );
}

export default Hero;