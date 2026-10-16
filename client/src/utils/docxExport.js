import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign,
  ShadingType,
} from "docx";
import { saveAs } from "file-saver";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatMonthYear(date) {
  if (!date) return "";
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [year, month] = date.split("-");
  if (!year || !month) return date;
  return `${months[Number(month) - 1]} ${year}`;
}

function hr() {
  return new Paragraph({
    border: {
      bottom: { color: "AAAAAA", space: 1, style: BorderStyle.SINGLE, size: 6 },
    },
    spacing: { after: 120 },
  });
}

function sectionHeading(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 26,
        color: "1a1a1a",
        font: "Calibri",
      }),
    ],
    border: {
      bottom: { color: "2563EB", space: 1, style: BorderStyle.SINGLE, size: 8 },
    },
    spacing: { before: 280, after: 140 },
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 20,
        font: "Calibri",
        color: "374151",
        ...opts,
      }),
    ],
    spacing: { after: 60 },
  });
}

function bulletText(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 20,
        font: "Calibri",
        color: "374151",
      }),
    ],
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

function labelValue(label, value) {
  if (!value) return null;
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 20, font: "Calibri", color: "111827" }),
      new TextRun({ text: value, size: 20, font: "Calibri", color: "374151" }),
    ],
    spacing: { after: 60 },
  });
}

// ─── Main Export Function ────────────────────────────────────────────────────

export const downloadDOCX = async (
  formData,
  education,
  experiences,
  projects,
  fileName = "Resume"
) => {
  const sections = [];

  // ── HEADER ──
  if (formData.fullName) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: formData.fullName.toUpperCase(),
            bold: true,
            size: 48,
            font: "Calibri",
            color: "111827",
          }),
        ],
        alignment: AlignmentType.LEFT,
        spacing: { after: 80 },
      })
    );
  }

  if (formData.jobTitle) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: formData.jobTitle,
            size: 28,
            font: "Calibri",
            color: "2563EB",
          }),
        ],
        spacing: { after: 100 },
      })
    );
  }

  // ── CONTACT INFO ──
  const contactParts = [
    formData.email,
    formData.phone,
    formData.address,
    formData.linkedin ? `LinkedIn: ${formData.linkedin}` : null,
    formData.github ? `GitHub: ${formData.github}` : null,
    formData.portfolio ? `Portfolio: ${formData.portfolio}` : null,
  ].filter(Boolean);

  if (contactParts.length > 0) {
    sections.push(
      new Paragraph({
        children: contactParts.map((part, i) => [
          new TextRun({ text: part, size: 18, font: "Calibri", color: "374151" }),
          i < contactParts.length - 1
            ? new TextRun({ text: "  |  ", size: 18, font: "Calibri", color: "9CA3AF" })
            : null,
        ]).flat().filter(Boolean),
        spacing: { after: 80 },
      })
    );
  }

  sections.push(hr());

  // ── PROFESSIONAL SUMMARY ──
  if (formData.summary?.trim()) {
    sections.push(sectionHeading("Professional Summary"));
    sections.push(bodyText(formData.summary));
    sections.push(new Paragraph({ spacing: { after: 80 } }));
  }

  // ── EDUCATION ──
  const validEdu = education?.filter(e => e.institution || e.qualification);
  if (validEdu?.length > 0) {
    sections.push(sectionHeading("Education"));

    validEdu.forEach(edu => {
      const degree = [edu.qualification, edu.branch].filter(Boolean).join(" — ");
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: degree || "Degree", bold: true, size: 22, font: "Calibri", color: "111827" }),
          ],
          spacing: { after: 40 },
        })
      );

      if (edu.institution) {
        const dateRange = [
          edu.startYear,
          edu.currentlyStudying ? "Present" : edu.endYear,
        ].filter(Boolean).join(" – ");

        sections.push(
          new Paragraph({
            children: [
              new TextRun({ text: edu.institution, size: 20, font: "Calibri", color: "374151" }),
              dateRange
                ? new TextRun({ text: `   |   ${dateRange}`, size: 20, font: "Calibri", color: "6B7280" })
                : null,
            ].filter(Boolean),
            spacing: { after: 40 },
          })
        );
      }

      if (edu.board || edu.city) {
        sections.push(bodyText([edu.board, edu.city].filter(Boolean).join(" • ")));
      }

      if (edu.score) {
        sections.push(bodyText(`Score: ${edu.score}`));
      }

      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // ── EXPERIENCE ──
  const validExp = experiences?.filter(e => e.company || e.role);
  if (validExp?.length > 0) {
    sections.push(sectionHeading("Experience"));

    validExp.forEach(exp => {
      const dateRange = [
        formatMonthYear(exp.startDate),
        exp.currentlyWorking ? "Present" : formatMonthYear(exp.endDate),
      ].filter(Boolean).join(" – ");

      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.role || "Job Title", bold: true, size: 22, font: "Calibri", color: "111827" }),
          ],
          spacing: { after: 40 },
        })
      );

      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.company || "Company", size: 20, font: "Calibri", color: "374151" }),
            dateRange
              ? new TextRun({ text: `   |   ${dateRange}`, size: 20, font: "Calibri", color: "6B7280" })
              : null,
            exp.city
              ? new TextRun({ text: `   |   ${exp.city}`, size: 20, font: "Calibri", color: "6B7280" })
              : null,
          ].filter(Boolean),
          spacing: { after: 60 },
        })
      );

      if (exp.description) {
        exp.description
          .split("\n")
          .map(l => l.trim())
          .filter(l => l)
          .forEach(line => sections.push(bulletText(line)));
      }

      sections.push(new Paragraph({ spacing: { after: 120 } }));
    });
  }

  // ── PROJECTS ──
  const validProjects = projects?.filter(p => p.title);
  if (validProjects?.length > 0) {
    sections.push(sectionHeading("Projects"));

    validProjects.forEach(project => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: project.title, bold: true, size: 22, font: "Calibri", color: "111827" }),
          ],
          spacing: { after: 40 },
        })
      );

      if (project.technologies) {
        sections.push(bodyText(project.technologies, { color: "2563EB" }));
      }

      const links = [
        project.github ? `GitHub: ${project.github}` : null,
        project.live ? `Live: ${project.live}` : null,
      ].filter(Boolean);
      if (links.length > 0) {
        sections.push(bodyText(links.join("   |   "), { color: "6B7280", size: 18 }));
      }

      if (project.description) {
        project.description
          .split("\n")
          .map(l => l.trim())
          .filter(l => l)
          .forEach(line => sections.push(bulletText(line)));
      }

      sections.push(new Paragraph({ spacing: { after: 120 } }));
    });
  }

  // ── SKILLS ──
  if (formData.skills?.trim()) {
    sections.push(sectionHeading("Skills"));

    const skills = formData.skills
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    sections.push(
      new Paragraph({
        children: skills.map((skill, i) => [
          new TextRun({ text: skill, size: 20, font: "Calibri", color: "374151" }),
          i < skills.length - 1
            ? new TextRun({ text: "  •  ", size: 20, font: "Calibri", color: "9CA3AF" })
            : null,
        ]).flat().filter(Boolean),
        spacing: { after: 100 },
      })
    );
  }

  // ── LANGUAGES ──
  if (formData.languages?.trim()) {
    sections.push(sectionHeading("Languages"));
    sections.push(bodyText(formData.languages));
  }

  // ── CERTIFICATIONS ──
  if (formData.certifications?.trim()) {
    sections.push(sectionHeading("Certifications"));
    sections.push(bodyText(formData.certifications));
  }

  // ── BUILD DOC ──
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 20, color: "374151" },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fileName}.docx`);
};
