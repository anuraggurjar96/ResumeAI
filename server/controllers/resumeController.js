import Resume from "../models/Resume.js";

// Create Resume 
export const createResume = async (req, res) => {
  try {
    const { resumeName, template, personalInfo, education, experience, projects } = req.body;

    const resume = await Resume.create({
      user: req.user._id,
      resumeName: resumeName || `${personalInfo?.fullName || "My"} Resume`,
      template: template || "Modern",
      personalInfo,
      education,
      experience,
      projects,
    });

    res.status(201).json({
      success: true,
      message: "Resume saved successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Get All Resumes for logged-in user 
export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .select("resumeName template publicId isPublic updatedAt createdAt")
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Resume by ID (owner only) 
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    res.status(200).json({ success: true, resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Resume 
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    const { resumeName, template, personalInfo, education, experience, projects } = req.body;

    if (resumeName !== undefined) resume.resumeName = resumeName;
    if (template !== undefined) resume.template = template;
    if (personalInfo !== undefined) resume.personalInfo = personalInfo;
    if (education !== undefined) resume.education = education;
    if (experience !== undefined) resume.experience = experience;
    if (projects !== undefined) resume.projects = projects;

    await resume.save();

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Resume 
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    res.status(200).json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Public Sharing 
export const togglePublic = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    resume.isPublic = !resume.isPublic;
    await resume.save();

    res.status(200).json({
      success: true,
      isPublic: resume.isPublic,
      publicId: resume.publicId,
      message: resume.isPublic ? "Resume is now public" : "Resume is now private",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Public Resume (no auth required)
export const getPublicResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      publicId: req.params.publicId,
      isPublic: true,
    }).select("-user"); // Don't expose user ID

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or not publicly shared",
      });
    }

    res.status(200).json({ success: true, resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};