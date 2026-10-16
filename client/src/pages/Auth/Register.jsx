import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { toast } from "sonner";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  //handl field....

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Empty Fields Validation
  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.mobile ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    toast.error("Please fill all fields");
    return;
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // Mobile Validation
  if (!/^[0-9]{10}$/.test(formData.mobile)) {
    toast.error("Please enter a valid 10-digit mobile number");
    return;
  }

  // Password Length Validation
  if (formData.password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return;
  }

  // Strong Password Validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordRegex.test(formData.password)) {
    toast.error(
      "Password must contain uppercase, lowercase, number and special character"
    );
    return;
  }

  // Confirm Password Validation
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    await registerUser({
      name: `${formData.firstName} ${formData.lastName}`,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
    });

    toast.success("Registration Successful");

    navigate("/login");

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration Failed"
    );
  } finally {
    setLoading(false);
  }
};

  // 👇 return yaha se start hoga
  return (
  <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-center text-slate-900">
        Create Account
      </h2>

      <p className="text-center text-slate-500 mt-2">
        Create your ResumeAI account
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

        </div>

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
                <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-4"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
         <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" required />
         <span>
         I agree to the{" "}
          <a href="#" className="text-emerald-600">
          Terms
          </a>{" "}
           &{" "}
          <a href="#" className="text-emerald-600">
           Privacy Policy
           </a>
          </span>   
           </label>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

      </form>

      <p className="mt-5 text-center">
        Already have an account?

        <Link
          to="/login"
          className="ml-2 text-emerald-600 font-semibold"
        >
          Login
        </Link>
      </p>

    </div>
  </section>
);
}




export default Register;