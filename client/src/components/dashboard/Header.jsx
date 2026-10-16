import { LogOut, FileText } from "lucide-react";

function Header({ user, onLogout }) {
  return (
    <header className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:px-8 md:py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
            <FileText className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800">
              ResumeAI
            </h1>

            <p className="hidden md:block text-sm text-slate-500">
              Professional Resume Builder
            </p>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="text-right">
            <h3 className="font-semibold text-slate-800 text-sm md:text-base">
              {user?.name || "User"}
            </h3>

            <p className="hidden md:block text-sm text-slate-500">
              {user?.email}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 md:px-5 py-2 rounded-xl transition-all duration-300 shadow-sm"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;