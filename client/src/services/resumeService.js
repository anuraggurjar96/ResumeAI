import API from "../api/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Create a new resume
export const createResume = async (resumeData) => {
  const response = await API.post("/resume", resumeData, getAuthHeaders());
  return response.data;
};

// Get all resumes for the logged-in user
export const getMyResumes = async () => {
  const response = await API.get("/resume", getAuthHeaders());
  return response.data;
};

// Get a single resume by MongoDB ID
export const getResumeById = async (id) => {
  const response = await API.get(`/resume/${id}`, getAuthHeaders());
  return response.data;
};

// Update an existing resume
export const updateResume = async (id, resumeData) => {
  const response = await API.put(`/resume/${id}`, resumeData, getAuthHeaders());
  return response.data;
};

// Delete a resume
export const deleteResume = async (id) => {
  const response = await API.delete(`/resume/${id}`, getAuthHeaders());
  return response.data;
};

// Toggle public sharing on/off
export const togglePublic = async (id) => {
  const response = await API.post(`/resume/${id}/toggle-public`, {}, getAuthHeaders());
  return response.data;
};

// Get a public resume (no auth required)
export const getPublicResume = async (publicId) => {
  const response = await API.get(`/resume/public/${publicId}`);
  return response.data;
};