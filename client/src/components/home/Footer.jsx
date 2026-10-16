import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>

            <h2 className="text-3xl font-extrabold text-white">
              Resume<span className="text-emerald-500">AI</span>
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Build ATS-friendly resumes with AI, analyze resume score,
              optimize keywords and land your dream job faster.
            </p>

            <div className="mt-6 flex gap-4">

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-600 hover:text-white"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-600 hover:text-white"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-600 hover:text-white"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-600 hover:text-white"
              >
                <FaEnvelope size={18} />
              </a>

            </div>

          </div>

          {/* Product */}
          <div>

            <h3 className="text-xl font-semibold text-white">
              Product
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link to="/" className="hover:text-emerald-400">
                  Home
                </Link>
              </li>

              <li>
                <a href="#features" className="hover:text-emerald-400">
                  Features
                </a>
              </li>

              <li>
                <a href="#how" className="hover:text-emerald-400">
                  How It Works
                </a>
              </li>

              <li>
                <Link
                  to="/resume-builder"
                  className="hover:text-emerald-400"
                >
                  Resume Builder
                </Link>
              </li>

            </ul>

          </div>

          {/* Company */}
          <div>

            <h3 className="text-xl font-semibold text-white">
              Company
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <a href="#" className="hover:text-emerald-400">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-emerald-400">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-emerald-400">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-emerald-400">
                  Terms & Conditions
                </a>
              </li>

            </ul>

          </div>

          {/* CTA */}
          <div>

            <h3 className="text-xl font-semibold text-white">
              Start Building
            </h3>

            <p className="mt-5 text-slate-400">
              Join thousands of students creating professional resumes with AI.
            </p>

            <Link
              to="/register"
              className="mt-6 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Get Started
            </Link>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">

          <p className="text-sm text-slate-500">
            © 2026 ResumeAI. All Rights Reserved.
          </p>

          <p className="text-sm text-slate-500">
            Made with ❤️ using React, Node.js & AI
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;