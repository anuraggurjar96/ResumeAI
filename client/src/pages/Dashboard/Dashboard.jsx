import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  Upload,
  FolderOpen,
  FileCheck,
  Sparkles,
  Download,
} from "lucide-react";

import { getProfile } from "../../services/authService";

import Header from "../../components/dashboard/Header";
import Hero from "../../components/dashboard/Hero";
import ActionCard from "../../components/dashboard/ActionCard";
import OverviewCard from "../../components/dashboard/OverviewCard";
import ResumeList from "../../components/dashboard/ResumeList";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [resumeCount, setResumeCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        console.log("Profile Data:", res.data);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <Header user={user} onLogout={handleLogout} />

        <Hero user={user} />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          <ActionCard
            title="Create Resume"
            description="Build a professional ATS-friendly resume from scratch."
            icon={FileText}
            color="bg-indigo-600"
            link="/create-resume"
          />

          <ActionCard
            title="Upload Resume"
            description="Upload your existing resume and analyze it using AI."
            icon={Upload}
            color="bg-emerald-600"
            disabled
          />

          <ActionCard
            title="My Resumes"
            description="View and manage all your saved resumes below."
            icon={FolderOpen}
            color="bg-violet-600"
            onClick={() => {
              document.getElementById("my-resumes-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          />

        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Overview
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <OverviewCard
              title="Total Resumes"
              value={resumeCount.toString()}
              icon={FileCheck}
              color="bg-indigo-600"
            />

            <OverviewCard
              title="AI Analyses"
              value="0"
              icon={Sparkles}
              color="bg-amber-500"
            />

            <OverviewCard
              title="Downloads"
              value="0"
              icon={Download}
              color="bg-sky-600"
            />

          </div>
        </div>

        {/* My Resumes Section */}
        <div className="mt-12" id="my-resumes-section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              My Resumes
            </h2>
            <button
              onClick={() => navigate("/create-resume")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition"
            >
              + Create New
            </button>
          </div>

          <ResumeList onResumeCountChange={setResumeCount} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;