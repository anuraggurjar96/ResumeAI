import { GoogleGenAI } from "@google/genai";

// ─── SDK: @google/genai v2.x  ·  Model: gemini-3.5-flash 


const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    const error = new Error(
      "GEMINI_API_KEY is not configured in server/.env. Please configure a valid API key from Google AI Studio."
    );
    error.status = 401;
    throw error;
  }
  return new GoogleGenAI({ apiKey });
};

// Centralized Error 
const formatGeminiError = (err, endpoint = "") => {
  const status = err.status || err.statusCode;
  const message = err.message || "";
  const code = err.code || "";

  console.error(
    `[Gemini ERROR] endpoint="${endpoint}" status=${status} code=${code}:`,
    message.substring(0, 300)
  );

  // Unauthorized API key
  if (
    status === 401 ||
    status === 403 ||
    (status === 400 &&
      (message.includes("API_KEY_INVALID") ||
        message.includes("API key not valid") ||
        message.includes("API_KEY_SERVICE_BLOCKED")))
  ) {
    return new Error(
      "Invalid or unauthorized Gemini API key. Please verify your GEMINI_API_KEY in server/.env."
    );
  }

  // Quota / Rate limit
  if (
    status === 429 ||
    message.includes("RESOURCE_EXHAUSTED") ||
    message.toLowerCase().includes("quota")
  ) {
    return new Error(
      "Gemini AI rate limit or quota exceeded. Please wait a moment and try again."
    );
  }

  // Model not found or retired
  if (status === 404 || message.includes("NOT_FOUND")) {
    return new Error(
      "Gemini model not found or has been retired. Please update GEMINI_MODEL in server/.env."
    );
  }

  // Service unavailable / High demand / Spikes
  if (
    status === 503 ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand")
  ) {
    return new Error(
      "Gemini AI service is currently experiencing high demand. Please try again in a few moments."
    );
  }

  // Internal Gemini server error
  if (status === 500) {
    return new Error(
      "Gemini AI service encountered an internal error. Please try again shortly."
    );
  }

  // Network / Connection issues
  if (
    code === "ENOTFOUND" ||
    code === "ECONNREFUSED" ||
    code === "ETIMEDOUT" ||
    code === "EHOSTUNREACH" ||
    message.includes("fetch failed") ||
    err.name === "TypeError"
  ) {
    return new Error(
      "Network connection to Gemini API failed. Please check your internet connectivity."
    );
  }

  return err instanceof Error
    ? err
    : new Error(message || "An unexpected error occurred while communicating with Gemini AI.");
};

// In-flight deduplication 

const inFlight = new Map();

const callGemini = async (key, prompt) => {
  // If there's already an active call for this key, reject immediately
  if (inFlight.has(key)) {
    throw new Error(
      "A request is already in progress. Please wait for it to finish."
    );
  }

  const ai = getAI();
  const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  const fallbackModel = "gemini-3.5-flash-lite";

  const executeCall = async () => {
    try {
      const response = await ai.models.generateContent({
        model: primaryModel,
        contents: prompt,
      });
      const text =
        typeof response.text === "function" ? response.text() : response.text;
      return (text || "").trim();
    } catch (primaryErr) {
      if (
        (primaryErr.status === 503 || primaryErr.status === 404) &&
        primaryModel !== fallbackModel
      ) {
        console.warn(
          `[Gemini WARN] Primary model "${primaryModel}" returned status ${primaryErr.status}. Attempting fallback "${fallbackModel}"...`
        );
        try {
          const fallbackResponse = await ai.models.generateContent({
            model: fallbackModel,
            contents: prompt,
          });
          const fallbackText =
            typeof fallbackResponse.text === "function"
              ? fallbackResponse.text()
              : fallbackResponse.text;
          return (fallbackText || "").trim();
        } catch (fallbackErr) {
          throw formatGeminiError(fallbackErr, key);
        }
      }
      throw formatGeminiError(primaryErr, key);
    }
  };

  const request = executeCall().finally(() => {
    inFlight.delete(key);
  });

  inFlight.set(key, request);
  return request;
};

// Improve Professional Summary 
export const improveSummary = async (req, res) => {
  try {
    const { text, jobTitle } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const prompt = `You are a professional resume writer.
Improve the following professional summary for a ${jobTitle || "professional"}.
Make it concise (3-4 sentences), impactful, ATS-friendly, and results-oriented.
Use strong action verbs. Do NOT add any preamble or explanation — return ONLY the improved summary.

Original summary:
"${text}"`;

    const improved = await callGemini("improve-summary", prompt);
    res.json({ success: true, improved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Improve Experience Description 
export const improveExperience = async (req, res) => {
  try {
    const { text, role, company } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const prompt = `You are a professional resume writer specializing in ATS optimization.
Improve the following work experience description for a "${role || "professional"}" at "${company || "a company"}".
Rules:
- Return exactly 4 bullet points
- Each bullet must start with a strong past-tense action verb
- Include quantifiable results where possible (e.g., "Reduced load time by 40%")
- Be ATS-friendly with relevant keywords
- Return ONLY the 4 bullet points, each on a new line, no numbering, no extra text

Original description:
"${text}"`;

    const improved = await callGemini("improve-experience", prompt);
    res.json({ success: true, improved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Improve Project Description 
export const improveProject = async (req, res) => {
  try {
    const { text, title, technologies } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const prompt = `You are a professional resume writer.
Improve the following project description for a project called "${title || "the project"}" built with "${technologies || "modern technologies"}".
Rules:
- Return exactly 3 bullet points
- First bullet: what the project does and its purpose
- Second bullet: key technical challenges solved or features implemented
- Third bullet: impact, results, or what you learned
- Use strong action verbs, be specific and technical
- Return ONLY the 3 bullet points, each on a new line, no numbering, no extra text

Original description:
"${text}"`;

    const improved = await callGemini("improve-project", prompt);
    res.json({ success: true, improved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  Suggest Skills
export const suggestSkills = async (req, res) => {
  try {
    const { jobTitle, currentSkills, experience } = req.body;
    if (!jobTitle) return res.status(400).json({ message: "Job title is required" });

    const prompt = `You are a professional career advisor and ATS expert.
Suggest the most relevant technical and soft skills for a "${jobTitle}" role.
${currentSkills ? `The person already has: ${currentSkills}` : ""}
${experience ? `Their experience includes: ${experience}` : ""}

Rules:
- Return 15-20 skills as a simple comma-separated list
- Include both technical (hard) skills and relevant soft skills
- Prioritize ATS-friendly keywords that recruiters search for
- Return ONLY the comma-separated list, nothing else

Example format: JavaScript, React, Node.js, REST APIs, Problem Solving`;

    const skills = await callGemini("suggest-skills", prompt);
    res.json({ success: true, skills });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ATS Check 
export const atsCheck = async (req, res) => {
  try {
    const { resumeData } = req.body;
    if (!resumeData) return res.status(400).json({ message: "Resume data is required" });

    const { personalInfo, education, experience, projects } = resumeData;

    const resumeText = `
Name: ${personalInfo?.fullName || ""}
Job Title: ${personalInfo?.jobTitle || ""}
Summary: ${personalInfo?.summary || ""}
Skills: ${personalInfo?.skills || ""}
Experience: ${(experience || []).map((e) => `${e.role || "Role"} at ${e.company || "Company"}: ${e.description || ""}`).join("\n")}
Projects: ${(projects || []).map((p) => `${p.title || "Project"}: ${p.description || ""}`).join("\n")}
Education: ${(education || []).map((e) => `${e.qualification || "Degree"} from ${e.institution || "Institution"}`).join("\n")}
    `.trim();

    const prompt = `You are an ATS (Applicant Tracking System) expert and professional resume reviewer.
Analyze the following resume and provide a structured ATS optimization report.

Resume:
${resumeText}

Return a JSON object with this exact structure (no markdown, no code blocks, raw JSON only):
{
  "score": <number 0-100>,
  "grade": "<A/B/C/D/F>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>", "<suggestion 4>", "<suggestion 5>"],
  "missingKeywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>"]
}`;

    const raw = await callGemini("ats-check", prompt);

    let report;
    try {
      let cleaned = raw.trim();
      if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
      }
      report = JSON.parse(cleaned);
    } catch {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          report = JSON.parse(jsonMatch[0]);
        } catch {
          report = { raw };
        }
      } else {
        report = { raw };
      }
    }

    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// General Improve
export const improveText = async (req, res) => {
  try {
    const { text, context } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const prompt = `You are a professional resume writer.
${context ? `Context: ${context}` : ""}
Improve the following text to be more professional, impactful, and ATS-friendly.
Return ONLY the improved text, no explanation.

Original:
"${text}"`;

    const improved = await callGemini("improve-text", prompt);
    res.json({ success: true, improved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
