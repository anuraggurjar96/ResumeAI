import { useState } from "react";
import { toast } from "sonner";
import { improveExperience } from "../../../../services/aiService";

export default function ExperienceForm({
  experiences,
  handleExperienceChange,
  addExperience,
  removeExperience,
}) {
  const [improvingIndex, setImprovingIndex] = useState(null);

  const handleImproveDescription = async (index) => {
    const exp = experiences[index];
    if (!exp.description?.trim()) {
      toast.error("Write a description first, then let AI improve it.");
      return;
    }
    setImprovingIndex(index);
    try {
      const res = await improveExperience(exp.description, exp.role, exp.company);
      handleExperienceChange(index, {
        target: { name: "description", value: res.improved },
      });
      toast.success("Experience improved by AI ✨");
    } catch (err) {
      toast.error(err?.response?.data?.message || "AI improvement failed.");
    } finally {
      setImprovingIndex(null);
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-gray-900">Work Experience</h2>
        <p className="mt-2 text-gray-500">Add your internships or work experience.</p>
      </div>

      {experiences.map((exp, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Experience {index + 1}</h3>
            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Company */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Company Name *</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Google"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Job Title *</label>
              <input
                type="text"
                name="role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Software Engineer Intern"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="month"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>
              <input
                type="month"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, e)}
                disabled={exp.currentlyWorking}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
              />
            </div>

            {/* City */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={exp.city}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Jaipur"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Currently Working */}
            <div className="flex items-center gap-3 mt-8">
              <input
                type="checkbox"
                name="currentlyWorking"
                checked={exp.currentlyWorking || false}
                onChange={(e) => handleExperienceChange(index, e)}
                className="h-5 w-5 accent-black"
              />
              <label className="text-gray-700">I currently work here</label>
            </div>

          </div>

          {/* Description + AI Improve */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Job Description</label>
              <button
                type="button"
                onClick={() => handleImproveDescription(index)}
                disabled={improvingIndex === index}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-medium transition disabled:opacity-60"
              >
                {improvingIndex === index ? (
                  <><span className="animate-spin">⏳</span> Improving...</>
                ) : (
                  <>✨ Improve with AI</>
                )}
              </button>
            </div>
            <textarea
              rows={5}
              name="description"
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Describe your responsibilities, achievements and technologies used..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
            />
            <p className="mt-1 text-xs text-gray-400">
              AI will rewrite this as 4 strong bullet points with action verbs.
            </p>
          </div>

        </div>
      ))}

      {/* Add Experience */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={addExperience}
          className="px-6 py-3 rounded-xl border border-black font-medium transition hover:bg-black hover:text-white"
        >
          + Add Experience
        </button>
      </div>

    </div>
  );
}