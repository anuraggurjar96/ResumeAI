import PersonalForm from "./forms/PersonalForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ExperienceForm from "./forms/ExperienceForm";
import ProjectsForm from "./forms/ProjectsForm";

export default function ResumeForm({
  step,

  // Personal
  formData,
  handleChange,

  // Education
  education,
  handleEducationChange,
  addEducation,
  removeEducation,

  // Experience
  experiences,
  handleExperienceChange,
  addExperience,
  removeExperience,

  // Projects
  projects,
  handleProjectChange,
  addProject,
  removeProject,
}) {
  return (
    <>
      {step === 1 && (
        <PersonalForm
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {step === 2 && (
        <EducationForm
          education={education}
          handleEducationChange={handleEducationChange}
          addEducation={addEducation}
          removeEducation={removeEducation}
        />
      )}

      {step === 3 && (
        <SkillsForm
          formData={formData}
          handleChange={handleChange}
        />
      )}

      {step === 4 && (
        <ExperienceForm
          experiences={experiences}
          handleExperienceChange={handleExperienceChange}
          addExperience={addExperience}
          removeExperience={removeExperience}
        />
      )}

      {step === 5 && (
        <ProjectsForm
          projects={projects}
          handleProjectChange={handleProjectChange}
          addProject={addProject}
          removeProject={removeProject}
        />
      )}
    </>
  );
}