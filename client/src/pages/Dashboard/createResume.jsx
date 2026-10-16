import { useState } from "react";

import Stepper from "./resume/Stepper";
import ResumeForm from "./resume/ResumeForm";
import ResumePreview from "./resume/ResumePreview";

export default function CreateResume() {
  const [step, setStep] = useState(1);

  // Personal Details
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    skills: "",
  });

  // Education
  const [education, setEducation] = useState([
    {
      qualification: "",
      institution: "",
      board: "",
      score: "",
      startYear: "",
      endYear: "",
    },
  ]);

  // Experience
  const [experiences, setExperiences] = useState([
    {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  // Projects
  const [projects, setProjects] = useState([
    {
      title: "",
      technologies: "",
      github: "",
      live: "",
      description: "",
    },
  ]);

  // Personal Form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Education
  const handleEducationChange = (index, e) => {
    const updated = [...education];
    updated[index][e.target.name] = e.target.value;
    setEducation(updated);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        qualification: "",
        institution: "",
        board: "",
        score: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };
    // Experience
  const handleExperienceChange = (index, e) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][e.target.name] = e.target.value;
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // Projects
  const handleProjectChange = (index, e) => {
    const updatedProjects = [...projects];
    updatedProjects[index][e.target.name] = e.target.value;
    setProjects(updatedProjects);
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
    setProjects(projects.filter((_, i) => i !== index));
  };

  // Navigation
  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const resumeData = {
      ...formData,
      education,
      experiences,
      projects,
    };

    console.log(resumeData);

    alert("Resume Generated Successfully!");
  };
    return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Create Resume
        </h1>

        <p className="text-slate-500 mb-8">
          Fill your details to generate an ATS-Friendly Resume
        </p>

        <Stepper step={step} />

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Resume Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>

              <ResumeForm
                step={step}

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

              <div className="mt-8 flex justify-between">

                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="px-6 py-3 rounded-lg bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 rounded-lg bg-indigo-600 text-white"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-green-600 text-white"
                  >
                    Generate Resume
                  </button>
                )}

              </div>

            </form>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <ResumePreview
              formData={formData}
              education={education}
              experiences={experiences}
              projects={projects}
            />
          </div>

        </div>

      </div>
    </div>
  );
}