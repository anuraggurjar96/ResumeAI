import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { toast } from "sonner";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      toast.warning("Email Required", {
        description: "Please enter your email address.",
      });
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    if (!formData.password.trim()) {
      toast.warning("Password Required", {
        description: "Please enter your password.",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Weak Password", {
        description: "Password must be at least 8 characters.",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Welcome Back 🎉", {
        description: "Login Successful",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      toast.error("Login Failed", {
        description:
          error.response?.data?.message ||
          "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center text-slate-900">
          Welcome Back
        </h2>

        <p className="text-center text-slate-500 mt-2">
          Login to your ResumeAI account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-slate-400" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12 focus:border-emerald-600 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-slate-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-emerald-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && <FaArrowRight />}
          </button>

        </form>

        <p className="mt-6 text-center text-slate-600">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-emerald-600 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </section>
  );
}

export default Login;