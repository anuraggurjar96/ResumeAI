import { GoogleGenAI } from "@google/genai";

// ─── SDK: @google/genai v2.x  ·  Model: gemini-1.5-flash ───────────────────
// API key is read from process.env — never sent to the frontend.

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error("GEMINI_API_KEY is not configured in server/.env");
  }
  return new GoogleGenAI({ apiKey });
};

// ─── In-flight deduplication ─────────────────────────────────────────────────
// Prevents the same endpoint being called concurrently (e.g. double-click).
// Key = endpoint name.  Value = Promise currently in-flight.
const inFlight = new Map();

const callGemini = async (key, prompt) => {
  // If there's already an active call for this key, reject immediately
  if (inFlight.has(key)) {
    throw new Error(
      "A request is already in progress. Please wait for it to finish."
    );
  }

  const ai = getAI();

  const request = ai.models
    .generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    })
    .then((response) => {
      // response.text is a getter in @google/genai v2.x
      const text = typeof response.text === "function" ? response.text() : response.text;
      return (text || "").trim();
    })
    .catch((err) => {
      // Log raw error to server terminal for debugging
      console.error(`[Gemini ERROR] endpoint="${key}" status=${err.status}:`, err.message?.substring(0, 300));
      // Translate HTTP 429 into a clear, user-friendly message
      if (err.status === 429) {
        throw new Error(
          "AI service is temporarily unavailable due to API limits. Please try again in a minute."
        );
      }
      // Translate 401 into a clear message (wrong/missing API key)
      if (err.status === 401) {
        throw new Error(
          "Gemini API authentication failed. Please check your GEMINI_API_KEY in server/.env."
        );
      }
      // Translate 404 into a clear message (model retired/wrong)
      if (err.status === 404) {
        throw new Error(
          "Gemini model not found. The model may have been retired — check aiController.js."
        );
      }
      throw err;
    })
    .finally(() => {
      inFlight.delete(key);
    });

  inFlight.set(key, request);
  return request;
};



// ─── Improve Professional Summary ────────────────────────────────────────────
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

// ─── Improve Experience Description ──────────────────────────────────────────
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

// ─── Improve Project Description ─────────────────────────────────────────────
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

// ─── Suggest Skills ───────────────────────────────────────────────────────────
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

// ─── ATS Check ───────────────────────────────────────────────────────────────
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
Experience: ${(experience || []).map(e => `${e.role} at ${e.company}: ${e.description}`).join("\n")}
Projects: ${(projects || []).map(p => `${p.title}: ${p.description}`).join("\n")}
Education: ${(education || []).map(e => `${e.qualification} from ${e.institution}`).join("\n")}
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
      const cleaned = raw.replace(/```json|```/g, "").trim();
      report = JSON.parse(cleaned);
    } catch {
      report = { raw };
    }

    res.json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── General Improve ─────────────────────────────────────────────────────────
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
