import { useState } from "react";
import { toast } from "sonner";
import { suggestSkills } from "../../../../services/aiService";

export default function SkillsForm({ formData, handleChange }) {
  const [suggesting, setSuggesting] = useState(false);

  const handleSuggestSkills = async () => {
    if (!formData.jobTitle && !formData.skills) {
      toast.error("Please select a Job Title or enter some skills first.");
      return;
    }
    setSuggesting(true);
    try {
      const res = await suggestSkills(
        formData.jobTitle || "Software Engineer",
        formData.skills,
        ""
      );
      // Merge suggested skills with current skills (avoid duplicates)
      const current = formData.skills
        ? formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      const suggested = res.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const merged = [...new Set([...current, ...suggested])].join(", ");

      handleChange({ target: { name: "skills", value: merged } });
      toast.success("Skills suggested by AI ✨", {
        description: "Relevant skills have been added to your list.",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "AI suggestion failed.");
    } finally {
      setSuggesting(false);
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-gray-900">Skills</h2>
        <p className="mt-2 text-gray-500">Enter your technical skills separated by commas.</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Technical Skills</label>
          <button
            type="button"
            onClick={handleSuggestSkills}
            disabled={suggesting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-medium transition disabled:opacity-60"
          >
            {suggesting ? (
              <><span className="animate-spin">⏳</span> Suggesting...</>
            ) : (
              <>✨ Suggest Skills with AI</>
            )}
          </button>
        </div>

        <textarea
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          rows={6}
          placeholder="C++, JavaScript, React, Node.js, Express.js, MongoDB, Tailwind CSS"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black"
        />

        <p className="mt-1 text-xs text-gray-400">
          Click "✨ Suggest Skills with AI" to get relevant skills for your job role automatically added.
        </p>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-700">
          💡 Tip: Add 6–10 relevant skills to improve ATS compatibility.
        </p>
      </div>

    </div>
  );
}