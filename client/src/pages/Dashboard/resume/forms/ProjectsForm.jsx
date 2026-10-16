import { useState } from "react";
import { toast } from "sonner";
import { improveProject } from "../../../../services/aiService";

export default function ProjectsForm({
  projects,
  handleProjectChange,
  addProject,
  removeProject,
}) {
  const [improvingIndex, setImprovingIndex] = useState(null);

  const handleImproveDescription = async (index) => {
    const project = projects[index];
    if (!project.description?.trim()) {
      toast.error("Write a description first, then let AI improve it.");
      return;
    }
    setImprovingIndex(index);
    try {
      const res = await improveProject(
        project.description,
        project.title,
        project.technologies
      );
      handleProjectChange(index, {
        target: { name: "description", value: res.improved },
      });
      toast.success("Project description improved by AI ✨");
    } catch (err) {
      toast.error(err?.response?.data?.message || "AI improvement failed.");
    } finally {
      setImprovingIndex(null);
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
        <p className="mt-2 text-gray-500">Showcase your best academic and personal projects.</p>
      </div>

      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Project {index + 1}</h3>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Project Name *</label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="AI Resume Builder"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Technologies</label>
              <input
                type="text"
                name="technologies"
                value={project.technologies}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="React, Node.js, MongoDB"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">GitHub Link</label>
              <input
                type="url"
                name="github"
                value={project.github}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="https://github.com/username/project"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Live Demo</label>
              <input
                type="url"
                name="live"
                value={project.live}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="https://project-demo.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Project Description + AI Improve */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Project Description</label>
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
                value={project.description}
                onChange={(e) => handleProjectChange(index, e)}
                placeholder="Describe your project, key features, technologies used and your contribution..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
              />
              <p className="mt-1 text-xs text-gray-400">
                AI will rewrite this as 3 impactful bullet points.
              </p>
            </div>

          </div>
        </div>
      ))}

      {/* Add Project */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={addProject}
          className="px-6 py-3 rounded-xl border border-black font-medium transition hover:bg-black hover:text-white"
        >
          + Add Project
        </button>
      </div>

    </div>
  );
}