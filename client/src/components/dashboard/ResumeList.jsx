import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FileText, Edit2, Trash2, Eye, Share2, Loader } from "lucide-react";
import { getMyResumes, deleteResume, togglePublic } from "../../services/resumeService";
import { copyResumeLink } from "../../utils/shareResume";

export default function ResumeList({ onResumeCountChange }) {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const fetchResumes = async () => {
    try {
      const res = await getMyResumes();
      setResumes(res.resumes || []);
      onResumeCountChange?.(res.resumes?.length || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleEdit = (resume) => {
    navigate("/resume-builder", {
      state: {
        resumeId: resume._id,
        template: resume.template,
        resumeName: resume.resumeName,
        publicId: resume.publicId,
      },
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    setDeletingId(id);
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      onResumeCountChange?.((prev) => Math.max(0, prev - 1));
      toast.success("Resume deleted.");
    } catch {
      toast.error("Failed to delete resume.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublic = async (resume) => {
    setTogglingId(resume._id);
    try {
      const res = await togglePublic(resume._id);
      setResumes((prev) =>
        prev.map((r) =>
          r._id === resume._id
            ? { ...r, isPublic: res.isPublic }
            : r
        )
      );
      toast.success(res.message);
    } catch {
      toast.error("Failed to update sharing settings.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleCopyLink = (resume) => {
    if (!resume.isPublic) {
      toast.info("Enable public sharing first to get a shareable link.");
      return;
    }
    copyResumeLink(resume.publicId);
  };

  const handleView = (resume) => {
    if (!resume.isPublic) {
      toast.info("Enable public sharing first to view the public page.");
      return;
    }
    window.open(`/resume/${resume.publicId}`, "_blank");
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const templateColors = {
    Modern: "bg-blue-100 text-blue-700",
    Professional: "bg-violet-100 text-violet-700",
    Minimal: "bg-gray-100 text-gray-700",
    Creative: "bg-pink-100 text-pink-700",
    Classic: "bg-amber-100 text-amber-700",
    Executive: "bg-emerald-100 text-emerald-700",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader className="w-6 h-6 animate-spin text-indigo-500" />
        <span className="ml-3 text-slate-500">Loading resumes...</span>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <FileText className="w-14 h-14 mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium">No saved resumes yet.</p>
        <p className="text-sm mt-1">Create one from the builder to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <div
          key={resume._id}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow p-5"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            {/* Left: Resume Info */}
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-800 text-base truncate">
                  {resume.resumeName}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      templateColors[resume.template] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {resume.template}
                  </span>
                  <span className="text-xs text-slate-400">
                    Updated {formatDate(resume.updatedAt)}
                  </span>
                  {resume.isPublic && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      🌐 Public
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Share Toggle */}
              <button
                onClick={() => handleTogglePublic(resume)}
                disabled={togglingId === resume._id}
                title={resume.isPublic ? "Make Private" : "Make Public"}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  resume.isPublic
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                } disabled:opacity-60`}
              >
                <Share2 className="w-4 h-4" />
                {togglingId === resume._id ? "..." : resume.isPublic ? "Public" : "Private"}
              </button>

              {/* Copy Link */}
              <button
                onClick={() => handleCopyLink(resume)}
                title="Copy public link"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-500 hover:bg-slate-100 transition"
              >
                🔗 Copy Link
              </button>

              {/* View */}
              <button
                onClick={() => handleView(resume)}
                title="View public page"
                className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <Eye className="w-4 h-4" />
              </button>

              {/* Edit */}
              <button
                onClick={() => handleEdit(resume)}
                title="Edit resume"
                className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(resume._id)}
                disabled={deletingId === resume._id}
                title="Delete resume"
                className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 transition disabled:opacity-60"
              >
                {deletingId === resume._id ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
