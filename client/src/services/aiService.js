import API from "../api/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Improve Professional Summary
export const improveSummary = async (text, jobTitle = "") => {
  const res = await API.post(
    "/ai/improve-summary",
    { text, jobTitle },
    getAuthHeaders()
  );
  return res.data;
};

// Improve Experience Description (returns 4 bullet points)
export const improveExperience = async (text, role = "", company = "") => {
  const res = await API.post(
    "/ai/improve-experience",
    { text, role, company },
    getAuthHeaders()
  );
  return res.data;
};

// Improve Project Description (returns 3 bullet points)
export const improveProject = async (text, title = "", technologies = "") => {
  const res = await API.post(
    "/ai/improve-project",
    { text, title, technologies },
    getAuthHeaders()
  );
  return res.data;
};

// Suggest Skills based on job title
export const suggestSkills = async (jobTitle, currentSkills = "", experience = "") => {
  const res = await API.post(
    "/ai/suggest-skills",
    { jobTitle, currentSkills, experience },
    getAuthHeaders()
  );
  return res.data;
};

// ATS Check — pass full resume data object
export const atsCheck = async (resumeData) => {
  const res = await API.post(
    "/ai/ats-check",
    { resumeData },
    getAuthHeaders()
  );
  return res.data;
};

// General text improvement
export const improveText = async (text, context = "") => {
  const res = await API.post(
    "/ai/improve",
    { text, context },
    getAuthHeaders()
  );
  return res.data;
};
