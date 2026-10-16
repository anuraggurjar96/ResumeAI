import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicResume } from "../../services/resumeService";
import { downloadPDF } from "../../utils/pdfExport";
import { copyResumeLink, shareResumeLink } from "../../utils/shareResume";
import ResumePreview from "../Dashboard/resume/ResumePreview";
import { Download, Link2, Share2, FileText, AlertCircle, Loader } from "lucide-react";

export default function PublicResumePage() {
  const { publicId } = useParams();
  const resumeRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await getPublicResume(publicId);
        setResume(res.resume);

        // Update page title & meta
        const name = res.resume?.personalInfo?.fullName || "Resume";
        document.title = `${name} — Resume`;

        // Set meta description
        const meta = document.querySelector('meta[name="description"]');
        const desc = res.resume?.personalInfo?.summary
          ? `${res.resume.personalInfo.summary.slice(0, 150)}...`
          : `Professional resume of ${name}`;
        if (meta) {
          meta.setAttribute("content", desc);
        } else {
          const newMeta = document.createElement("meta");
          newMeta.name = "description";
          newMeta.content = desc;
          document.head.appendChild(newMeta);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [publicId]);

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    await downloadPDF(resumeRef, resume?.personalInfo?.fullName || "Resume");
    setDownloadingPDF(false);
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-lg">Loading resume...</p>
        </div>
      </div>
    );
  }

  // ── Not Found ──
  if (notFound || !resume) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">
            Resume Not Found
          </h1>
          <p className="text-slate-500">
            This resume is either private or the link is incorrect. Ask the owner to enable public sharing.
          </p>
        </div>
      </div>
    );
  }

  const { personalInfo, template, resumeName } = resume;

  // Build formData & arrays from saved resume shape
  const formData = personalInfo || {};
  const education = resume.education || [];
  const experiences = resume.experience || [];
  const projects = resume.projects || [];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Bar */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">

          {/* Left: Name + branding */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-slate-800 text-lg leading-tight truncate">
                {formData.fullName || "Resume"}
              </h1>
              <p className="text-xs text-slate-400 truncate">
                {resumeName || "Professional Resume"} · {template}
              </p>
            </div>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyResumeLink(publicId)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition"
            >
              <Link2 className="w-4 h-4" />
              Copy Link
            </button>

            <button
              onClick={() => shareResumeLink(resumeName, publicId)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={downloadingPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition disabled:opacity-70"
            >
              <Download className="w-4 h-4" />
              {downloadingPDF ? "Preparing..." : "Download PDF"}
            </button>
          </div>

        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div ref={resumeRef}>
            <ResumePreview
              template={template || "Modern"}
              formData={formData}
              education={education}
              experiences={experiences}
              projects={projects}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-400">
          Built with{" "}
          <span className="text-indigo-500 font-medium">Resume AI</span>
          {" "}— Create your own professional resume.
        </div>
      </div>

    </div>
  );
}
