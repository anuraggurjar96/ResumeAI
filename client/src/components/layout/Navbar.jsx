import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 font-medium ${
      isActive
        ? "text-emerald-600"
        : "text-slate-700 hover:text-emerald-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <nav className="w-full flex items-center justify-between h-20 px-6 lg:px-12 xl:px-16">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-slate-900"
        >
          Resume
          <span className="text-emerald-600">AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <a
            href="#features"
            className="font-medium text-slate-700 hover:text-emerald-600 transition"
          >
            Features
          </a>

          <a
            href="#how"
            className="font-medium text-slate-700 hover:text-emerald-600 transition"
          >
            How It Works
          </a>

          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>

          <Link
            to="/register"
            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg"
          >
            Get Started
          </Link>

          <button className="text-slate-600 hover:text-emerald-600 transition">
            <FaUserCircle size={28} />
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl text-slate-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="flex flex-col gap-5 p-6">

            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-slate-700"
            >
              Features
            </a>

            <a
              href="#how"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-slate-700"
            >
              How It Works
            </a>

            <NavLink
              to="/login"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-emerald-600 py-3 text-center font-semibold text-white hover:bg-emerald-700 transition"
            >
              Get Started
            </Link>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;