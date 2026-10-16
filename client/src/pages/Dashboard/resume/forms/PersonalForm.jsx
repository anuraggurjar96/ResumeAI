import { useState } from "react";
import { toast } from "sonner";
import { improveSummary } from "../../../../services/aiService";

export default function PersonalForm({ formData, handleChange }) {
  const [improvingSummary, setImprovingSummary] = useState(false);

  const handleImproveSummary = async () => {
    if (!formData.summary?.trim()) {
      toast.error("Write a summary first, then let AI improve it.");
      return;
    }
    setImprovingSummary(true);
    try {
      const res = await improveSummary(formData.summary, formData.jobTitle);
      // Inject improved text back into formData via synthetic event
      handleChange({ target: { name: "summary", value: res.improved } });
      toast.success("Summary improved by AI ✨");
    } catch (err) {
      toast.error(err?.response?.data?.message || "AI improvement failed.");
    } finally {
      setImprovingSummary(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Personal Details</h2>
        <p className="mt-2 text-gray-500">Fill in your personal and contact information.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Mark Richard"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Job Title</label>
          <select
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Job Role</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="React Developer">React Developer</option>
            <option value="Java Developer">Java Developer</option>
            <option value="Python Developer">Python Developer</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="Cyber Security Analyst">Cyber Security Analyst</option>
            <option value="Mobile App Developer">Mobile App Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Other">Other</option>
          </select>
          {formData.jobTitle === "Other" && (
            <input
              type="text"
              name="customJobTitle"
              value={formData.customJobTitle}
              onChange={handleChange}
              placeholder="Enter your Job Title"
              className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXXXXXXX"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Jaipur, Rajasthan"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">GitHub</label>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Profile Photo */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">Profile Photo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            name="photo"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2 file:text-white hover:file:bg-gray-800"
          />
          <p className="mt-2 text-sm text-gray-500">Upload a professional passport-size photo.</p>
          {formData.photo && (
            <div className="mt-4 flex items-center gap-4">
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow-md"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">Photo Selected</p>
                <p className="text-xs text-gray-500">{formData.photo.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* ─── Professional Summary + AI ─────────────────────────────────────── */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Professional Summary</label>
            <button
              type="button"
              onClick={handleImproveSummary}
              disabled={improvingSummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-medium transition disabled:opacity-60"
            >
              {improvingSummary ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Improving...
                </>
              ) : (
                <>✨ Improve with AI</>
              )}
            </button>
          </div>
          <textarea
            name="summary"
            rows={5}
            value={formData.summary}
            onChange={handleChange}
            placeholder="A passionate software engineer with 2+ years of experience building scalable web applications..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black"
          />
          <p className="mt-1 text-xs text-gray-400">
            Tip: Write a draft first, then click "✨ Improve with AI" to enhance it.
          </p>
        </div>

      </div>
    </div>
  );
}