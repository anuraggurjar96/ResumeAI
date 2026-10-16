# Resume AI — Feature Implementation Plan

## Current Codebase Analysis

### ✅ Already Implemented
| Feature | Status | Location |
|---|---|---|
| Resume Builder (5-step form) | ✅ Working | `ResumeBuilder.jsx` |
| Personal Details form | ✅ Working | `forms/PersonalForm.jsx` |
| Education form | ✅ Working | `forms/EducationForm.jsx` |
| Skills form | ✅ Working | `forms/SkillsForm.jsx` |
| Experience form | ✅ Working | `forms/ExperienceForm.jsx` |
| Projects form | ✅ Working | `forms/ProjectsForm.jsx` |
| Live resume preview | ✅ Working | `ResumePreview.jsx` |
| Modern template | ✅ Working | `templates/Modern.jsx` |
| Template switching (Customize modal) | ✅ Working | `ResumeBuilder.jsx` |
| PDF download | ✅ Working | `utils/pdfExport.js` |
| Auth (Register/Login/JWT) | ✅ Working | `authController.js` / `authRoutes.js` |
| ProtectedRoute | ✅ Working | `ProtectedRoute.jsx` |
| Dashboard | ✅ Working | `Dashboard.jsx` |
| Template Gallery | ✅ Working | `TemplateGallery.jsx` |

### ⚠️ Skeleton Files (Empty / Stub)
| File | Status |
|---|---|
| `utils/docxExport.js` | Empty (0 bytes) |
| `utils/shareResume.js` | Empty (0 bytes) |
| `server/controllers/resumeController.js` | Only `createResume`, no get/update/delete/public |
| `server/routes/resumeRoutes.js` | Only `POST /` — no other routes |
| `server/models/Resume.js` | Missing: `template`, `resumeName`, `publicId`, `isPublic` fields |
| `context/AuthContext.jsx` | Empty context provider (value `{}`) |

### ⚠️ Other Templates (Empty/Stub)
- `Classic.jsx`, `Traditional.jsx`, `Executive.jsx`, `PrimeATS.jsx` — exist but appear to be empty/stub files (0 bytes or stub). Only `Modern.jsx` is fully implemented.

---

## Open Questions

> [!IMPORTANT]
> **Template availability**: `Classic`, `Traditional`, `Executive`, `PrimeATS` template files exist but appear to be stubs/empty. The `ResumePreview.jsx` only handles `Modern`, `Professional`, `Minimal`, `Creative`. Should I implement the missing templates, or keep only the 4 that are in the preview switcher?

> [!IMPORTANT]
> **Resume Name**: When saving a resume, users should be able to give it a name (e.g., "Software Engineer Resume"). Should I add a resume name input field in the builder header, or auto-generate a name from `fullName + template`?

> [!IMPORTANT]
> **Gemini API Key**: For Phase 8 (Gemini AI), do you already have a Gemini API Key? I will use environment variables and never hardcode it, but I need to know if you want me to set up the API key prompt or if you'll provide it after.

---

## Proposed Changes

### Phase 1 — DOCX Download

#### [MODIFY] [docxExport.js](file:///c:/Users/Asus/Desktop/Resume%20AI/client/src/utils/docxExport.js)
- Implement using the already-installed `docx` and `file-saver` packages
- Generate a professional Word document with all resume sections (personal, education, experience, projects, skills)
- Match the same data structure used in `ResumeBuilder.jsx`

#### [MODIFY] [ResumeBuilder.jsx](file:///c:/Users/Asus/Desktop/Resume%20AI/client/src/pages/Dashboard/ResumeBuilder.jsx)
- Import and wire the `downloadDOCX` function
- Add a "Download DOCX" button next to "Download PDF"

---

### Phase 2 — Save Resume (Backend + Frontend)

#### [MODIFY] [Resume.js](file:///c:/Users/Asus/Desktop/Resume%20AI/server/models/Resume.js)
Add missing fields to the schema:
- `resumeName` (String) — user-defined resume title
- `template` (String) — selected template name
- `publicId` (String, unique) — UUID for public sharing URL
- `isPublic` (Boolean, default: false)
- Align field names with the builder's `formData` structure (e.g., `jobTitle`, `skills` as a string, `photo` URL etc.)

#### [MODIFY] [resumeController.js](file:///c:/Users/Asus/Desktop/Resume%20AI/server/controllers/resumeController.js)
Add controllers:
- `createResume` — fix to handle new schema fields
- `updateResume` — update existing resume by ID (owner-only)
- `getMyResumes` — list all resumes for logged-in user
- `getResumeById` — get single resume (owner only)
- `deleteResume` — delete by ID (owner-only)
- `getPublicResume` — get resume by `publicId` (no auth required)
- `togglePublic` — enable/disable public sharing

#### [MODIFY] [resumeRoutes.js](file:///c:/Users/Asus/Desktop/Resume%20AI/server/routes/resumeRoutes.js)
Add routes:
```
POST   /api/resume          → createResume (protected)
GET    /api/resume          → getMyResumes (protected)
GET    /api/resume/:id      → getResumeById (protected)
PUT    /api/resume/:id      → updateResume (protected)
DELETE /api/resume/:id      → deleteResume (protected)
POST   /api/resume/:id/toggle-public → togglePublic (protected)
GET    /api/resume/public/:publicId  → getPublicResume (public, no auth)
```

#### [MODIFY] [resumeService.js](file:///c:/Users/Asus/Desktop/Resume%20AI/client/src/services/resumeService.js)
Add service functions matching all new routes.

#### [MODIFY] [ResumeBuilder.jsx](file:///c:/Users/Asus/Desktop/Resume%20AI/client/src/pages/Dashboard/ResumeBuilder.jsx)
- Wire the "Save" button to call `createResume` or `updateResume` (upsert logic)
- Show toast on success/failure via `sonner` (already installed)
- Add optional `resumeName` field in the header

---

### Phase 3 — Resume List (Dashboard)

#### [NEW] `client/src/components/dashboard/ResumeList.jsx`
- Fetch and display all saved resumes for the logged-in user
- Show: resume name, template badge, last updated date
- Actions: **Edit** (navigate to `/resume-builder?id=...`), **Delete** (confirm + delete), **View** (navigate to public page)

#### [MODIFY] [Dashboard.jsx](file:///c:/Users/Asus/Desktop/Resume%20AI/client/src/pages/Dashboard/Dashboard.jsx)
- Import and render `ResumeList` below the Overview section
- Update the "Total Resumes" overview card to show real count
- Enable the "My Resumes" ActionCard (remove `disabled` prop)

---

### Phase 4 — Public Shareable Resume + Copy/Share Link

#### [NEW] `client/src/pages/PublicResume/PublicResumePage.jsx`
- Public route: `/resume/:publicId` (no auth required)
- Fetch resume data via `GET /api/resume/public/:publicId`
- Render the correct template using `ResumePreview`
- Add a "Download PDF" button using `pdfExport.js`
- Add proper page `<title>` and meta description
- Fully responsive design

#### [MODIFY] [App.jsx](file:///c:/Users/Asus/Desktop/Resume%20AI/client/src/App.jsx)
- Add public route: `<Route path="/resume/:publicId" element={<PublicResumePage />} />`

#### [MODIFY] [shareResume.js](file:///c:/Users/Asus/Desktop/Resume%20AI/client/src/utils/shareResume.js)
- `copyResumeLink(publicId)` — uses `navigator.clipboard`, shows sonner toast "Resume link copied!"
- `shareResumeLink(title, publicId)` — uses Web Share API with fallback to copy

#### [MODIFY] [ResumeBuilder.jsx](file:///c:/Users/Asus/Desktop/Resume%20AI/client/src/pages/Dashboard/ResumeBuilder.jsx)
- After saving, if resume has a `publicId`, show "Copy Link" and "Share" buttons in the header

---

### Phase 5 — Gemini AI Integration

> [!NOTE]
> This phase will only be implemented after all above features are verified working.

#### [NEW] `server/controllers/aiController.js`
- `improveText(req, res)` — general text improvement
- `improveSummary(req, res)` — improve professional summary
- `improveExperience(req, res)` — improve experience bullet points
- `improveProject(req, res)` — improve project description
- `suggestSkills(req, res)` — suggest relevant skills based on job title/experience
- `atsCheck(req, res)` — ATS-friendliness analysis

#### [NEW] `server/routes/aiRoutes.js`
- Protected routes for all AI endpoints
- `POST /api/ai/improve` (general)
- `POST /api/ai/suggest-skills`
- `POST /api/ai/ats-check`

#### [MODIFY] `server/.env`
- Add `GEMINI_API_KEY=your_key_here`

#### [NEW] `client/src/services/aiService.js`
- Frontend API calls to all AI endpoints

#### [MODIFY] Form components
- Add "✨ Improve with AI" buttons next to `summary`, `experience.description`, `project.description` fields
- Add AI loading states and result injection into form fields

---

## Implementation Order

```
Phase 1 → DOCX Download           (2 files changed)
Phase 2 → Save Resume              (5 files changed + 1 new)
Phase 3 → Resume List              (2 files changed + 1 new)
Phase 4 → Public Share + Copy Link (4 files changed + 2 new)
Phase 5 → Gemini AI                (4 new files + 3 modified)
```

---

## Verification Plan

### After Each Phase
- Manually test in browser: `npm run dev` (client) + `npm run dev` (server)
- Verify existing PDF download still works
- Verify template switching still works
- Verify live preview still updates

### Automated Checks
- Server starts without errors: `node server.js`
- No broken imports in client: `npm run build`

### Manual Test Cases Per Phase
| Phase | Test |
|---|---|
| DOCX | Download DOCX → open in Word/LibreOffice → verify content |
| Save | Fill resume → Save → check MongoDB for record |
| List | Dashboard shows saved resumes with correct name/template/date |
| Public | `/resume/:publicId` loads without login, shows correct template |
| Copy | Click "Copy Link" → paste in new tab → see resume |
| Share | Web Share API triggers on mobile / fallback on desktop |
| AI | "Improve" button sends text → receives improved version |
