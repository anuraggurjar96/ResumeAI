import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Resume meta
    resumeName: {
      type: String,
      default: "My Resume",
    },

    template: {
      type: String,
      default: "Modern",
    },

    // Public sharing
    publicId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    // Personal Info
    personalInfo: {
      fullName: { type: String, default: "" },
      jobTitle: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      portfolio: { type: String, default: "" },
      website: { type: String, default: "" },
      summary: { type: String, default: "" },
      skills: { type: String, default: "" },
      languages: { type: String, default: "" },
      certifications: { type: String, default: "" },
      achievements: { type: String, default: "" },
      interests: { type: String, default: "" },
    },

    education: [
      {
        qualification: { type: String, default: "" },
        branch: { type: String, default: "" },
        institution: { type: String, default: "" },
        board: { type: String, default: "" },
        city: { type: String, default: "" },
        score: { type: String, default: "" },
        startYear: { type: String, default: "" },
        endYear: { type: String, default: "" },
        currentlyStudying: { type: Boolean, default: false },
      },
    ],

    experience: [
      {
        company: { type: String, default: "" },
        role: { type: String, default: "" },
        city: { type: String, default: "" },
        startDate: { type: String, default: "" },
        endDate: { type: String, default: "" },
        currentlyWorking: { type: Boolean, default: false },
        description: { type: String, default: "" },
      },
    ],

    projects: [
      {
        title: { type: String, default: "" },
        technologies: { type: String, default: "" },
        github: { type: String, default: "" },
        live: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);