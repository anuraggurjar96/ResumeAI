import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { downloadPDF } from "../../utils/pdfExport";
import { downloadDOCX } from "../../utils/docxExport";
import { createResume, updateResume, getResumeById } from "../../services/resumeService";
import { copyResumeLink, shareResumeLink } from "../../utils/shareResume";
import { atsCheck } from "../../services/aiService";

import ResumeForm from "./resume/ResumeForm";
import ResumePreview from "./resume/ResumePreview";

export default function ResumeBuilder() {
  const location = useLocation();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(
    location.state?.template || "Modern"
  );

  // Resume meta
  const [resumeId, setResumeId] = useState(location.state?.resumeId || null);
  const [resumeName, setResumeName] = useState(
    location.state?.resumeName || ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [publicId, setPublicId] = useState(location.state?.publicId || null);

  const [showCustomize, setShowCustomize] = useState(false);
  const [step, setStep] = useState(1);
  const [atsResult, setAtsResult] = useState(null);
  const [checkingATS, setCheckingATS] = useState(false);

  // Load existing resume from MongoDB if editing
  useEffect(() => {
    if (resumeId) {
      const loadResume = async () => {
        try {
          const res = await getResumeById(resumeId);
          if (res?.resume) {
            const r = res.resume;
            if (r.resumeName) setResumeName(r.resumeName);
            if (r.template) setTemplate(r.template);
            if (r.publicId) setPublicId(r.publicId);
            if (r.personalInfo) {
              setFormData((prev) => ({ ...prev, ...r.personalInfo }));
            }
            if (Array.isArray(r.education) && r.education.length > 0) {
              setEducation(r.education);
            }
            if (Array.isArray(r.experience) && r.experience.length > 0) {
              setExperiences(r.experience);
            }
            if (Array.isArray(r.projects) && r.projects.length > 0) {
              setProjects(r.projects);
            }
          }
        } catch (err) {
          console.error("Failed to load resume details:", err);
          toast.error("Failed to load resume details from server.");
        }
      };
      loadResume();
    }
  }, [resumeId]);

  // =========================
  // Personal Details
  // =========================

  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    linkedin: "",
    github: "",
    portfolio: "",
    website: "",
    summary: "",
    skills: "",
    languages: "",
    certifications: "",
    achievements: "",
    interests: "",
    photo: "",
  });

const resumeRef = useRef(null);

  // =========================
  // Education
  // =========================

  const [education, setEducation] = useState([
    {
      qualification: "",
      branch: "",
      institution: "",
      board: "",
      city: "",
      score: "",
      startYear: "",
      endYear: "",
      currentlyStudying: false,
    },
  ]);

  // =========================
  // Experience
  // =========================

  const [experiences, setExperiences] = useState([
    {
      company: "",
      role: "",
      city: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    },
  ]);

  // =========================
  // Projects
  // =========================

  const [projects, setProjects] = useState([
    {
      title: "",
      technologies: "",
      github: "",
      live: "",
      description: "",
    },
  ]);
    // =========================
  // Personal Form
  // =========================

  const handleChange = (e) => {
  const { name, value, type, files } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "file" ? files[0] : value,
  }));
};

  // =========================
  // Education
  // =========================

  const handleEducationChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    const updated = [...education];

    updated[index][name] =
      type === "checkbox" ? checked : value;

    setEducation(updated);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        qualification: "",
        branch: "",
        institution: "",
        board: "",
        city: "",
        score: "",
        startYear: "",
        endYear: "",
        currentlyStudying: false,
      },
    ]);
  };

  const removeEducation = (index) => {
    const updated = [...education];
    updated.splice(index, 1);
    setEducation(updated);
  };

  // =========================
  // Experience
  // =========================

  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    const updated = [...experiences];

    updated[index][name] =
      type === "checkbox" ? checked : value;

    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        city: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    const updated = [...experiences];
    updated.splice(index, 1);
    setExperiences(updated);
  };

  // =========================
  // Projects
  // =========================

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;

    const updated = [...projects];

    updated[index][name] = value;

    setProjects(updated);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        technologies: "",
        github: "",
        live: "",
        description: "",
      },
    ]);
  };

  const removeProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  // =========================
  // Save Resume
  // =========================

  const handleSave = async () => {
    if (!formData.fullName?.trim()) {
      toast.error("Please enter your full name before saving.");
      return;
    }

    setIsSaving(true);

    const payload = {
      resumeName: resumeName || `${formData.fullName} Resume`,
      template,
      personalInfo: { ...formData },
      education,
      experience: experiences,
      projects,
    };

    try {
      if (resumeId) {
        // Update existing
        const res = await updateResume(resumeId, payload);
        if (res.resume?.publicId) setPublicId(res.resume.publicId);
        toast.success("Resume updated successfully!");
      } else {
        // Create new
        const res = await createResume(payload);
        setResumeId(res.resume._id);
        if (res.resume?.publicId) setPublicId(res.resume.publicId);
        toast.success("Resume saved successfully!");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  // =========================
  // ATS Check
  // =========================

  const handleATSCheck = async () => {
    if (!formData.fullName?.trim()) {
      toast.error("Fill in your resume details first.");
      return;
    }
    setCheckingATS(true);
    try {
      const res = await atsCheck({
        personalInfo: formData,
        education,
        experience: experiences,
        projects,
      });
      setAtsResult(res.report);
    } catch (err) {
      toast.error(err?.response?.data?.message || "ATS check failed.");
    } finally {
      setCheckingATS(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white border-b shadow-sm">

<div className="w-full px-10 py-5 flex justify-between items-center">
          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              Resume Builder
            </h1>

            <div className="flex items-center gap-3 mt-2">
              <p className="text-gray-500">
                Template: <span className="font-semibold">{template}</span>
              </p>
              {resumeId && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  ✓ Saved
                </span>
              )}
            </div>

            {/* Resume Name Input */}
            <input
              type="text"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              placeholder={formData.fullName ? `${formData.fullName} Resume` : "Resume Name..."}
              className="mt-2 text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 w-64"
            />

          </div>

          <div className="flex items-center gap-3">

  <button
    onClick={() => setShowCustomize(true)}
    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
  >
    🎨 Customize
  </button>

  <button
    onClick={handleSave}
    disabled={isSaving}
    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-60"
  >
    {isSaving ? "Saving..." : resumeId ? "Update" : "Save"}
  </button>

  {/* Copy Link — only shown when publicId exists */}
  {publicId && (
    <button
      onClick={() => copyResumeLink(publicId)}
      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition text-sm"
    >
      🔗 Copy Link
    </button>
  )}

  {/* Share — only shown when publicId exists */}
  {publicId && (
    <button
      onClick={() => shareResumeLink(resumeName || formData.fullName, publicId)}
      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition text-sm"
    >
      📤 Share
    </button>
  )}

  <button
    onClick={() => downloadDOCX(formData, education, experiences, projects, formData.fullName || "Resume")}
    className="px-5 py-2 rounded-lg border border-gray-300 bg-green-50 hover:bg-green-100 text-green-700 transition"
  >
    Download DOCX
  </button>

  {/* ATS Check */}
  <button
    onClick={handleATSCheck}
    disabled={checkingATS}
    className="px-5 py-2 rounded-lg border border-gray-300 bg-amber-50 hover:bg-amber-100 text-amber-700 transition disabled:opacity-60"
  >
    {checkingATS ? "Checking..." : "🎯 ATS Check"}
  </button>

 <button
onClick={() => downloadPDF(resumeRef, resumeName || formData.fullName || "Resume")}
className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
>
Download PDF
</button>

</div>

        </div>

      </div>
{/* Builder */}

<div className="h-[calc(100vh-88px)] flex">

  {/* LEFT PANEL */}

  <div className="w-1/2 border-r bg-white overflow-y-auto px-8 py-6">

    <ResumeForm
      step={step}
      setStep={setStep}

      formData={formData}
      handleChange={handleChange}

      education={education}
      handleEducationChange={handleEducationChange}
      addEducation={addEducation}
      removeEducation={removeEducation}

      experiences={experiences}
      handleExperienceChange={handleExperienceChange}
      addExperience={addExperience}
      removeExperience={removeExperience}

      projects={projects}
      handleProjectChange={handleProjectChange}
      addProject={addProject}
      removeProject={removeProject}
    />

    <div className="flex justify-between mt-8">

      <button
        disabled={step === 1}
        onClick={() => setStep(step - 1)}
        className="px-5 py-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
      >
        Previous
      </button>

      <button
        disabled={step === 5}
        onClick={() => setStep(step + 1)}
        className="px-5 py-2 rounded-lg bg-black text-white disabled:opacity-50"
      >
        Next
      </button>

    </div>

  </div>

  {/* RIGHT PANEL */}

<div className="w-1/2 bg-[#f5f6fa] overflow-auto flex justify-center items-start p-6">
  <div
    ref={resumeRef}
    className="w-full max-w-[850px] scale-[0.75] origin-top"
  >
    <ResumePreview
      template={template}
      formData={formData}
      education={education}
      experiences={experiences}
      projects={projects}
    />
  </div>
</div>
    {/* ===== ATS Result Modal ===== */}

    {atsResult && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">🎯 ATS Score Report</h2>
              <p className="text-gray-500 text-sm mt-1">AI-powered resume analysis</p>
            </div>
            <button onClick={() => setAtsResult(null)} className="text-3xl text-gray-400 hover:text-gray-700">×</button>
          </div>

          {/* Score */}
          <div className="flex items-center gap-6 p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50 border border-indigo-100 mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-indigo-500 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-700">{atsResult.score ?? "—"}</span>
              <span className="text-xs text-indigo-500">/ 100</span>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">Grade: <span className="text-indigo-600">{atsResult.grade ?? "—"}</span></p>
              <p className="text-sm text-slate-500 mt-1">Your resume has been analyzed for ATS compatibility.</p>
            </div>
          </div>

          {/* Strengths */}
          {atsResult.strengths?.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold text-green-700 mb-2">✅ Strengths</h3>
              <ul className="space-y-1">
                {atsResult.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-green-500">•</span>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Weaknesses */}
          {atsResult.weaknesses?.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold text-red-600 mb-2">⚠️ Weaknesses</h3>
              <ul className="space-y-1">
                {atsResult.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-red-400">•</span>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {atsResult.suggestions?.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold text-blue-700 mb-2">💡 Suggestions</h3>
              <ul className="space-y-1">
                {atsResult.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-blue-400">→</span>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Keywords */}
          {atsResult.missingKeywords?.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold text-amber-700 mb-2">🔍 Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {atsResult.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">{kw}</span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setAtsResult(null)}
            className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
          >
            Close Report
          </button>
        </div>
      </div>
    )}

    {/* ===== Customize Modal ===== */}

    {showCustomize && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white w-[900px] rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Choose Template</h2>
            <button onClick={() => setShowCustomize(false)} className="text-3xl">×</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {["Modern", "Professional", "Minimal", "Creative"].map((item) => (
              <div
                key={item}
                onClick={() => { setTemplate(item); setShowCustomize(false); }}
                className={`cursor-pointer rounded-xl border p-5 text-center transition ${
                  template === item ? "border-blue-600 bg-blue-50" : "hover:border-blue-400"
                }`}
              >
                <div className="h-48 rounded-lg bg-gray-200 flex items-center justify-center">{item}</div>
                <p className="mt-3 font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

</div>
</div>
);
}
