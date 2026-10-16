import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadPDF = async (resumeRef, fileName = "Resume") => {
  if (!resumeRef.current) return;

  try {
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",

      onclone: (doc) => {
        doc.querySelectorAll("*").forEach((el) => {
          const style = window.getComputedStyle(el);

          if (style.color.includes("oklch")) {
            el.style.color = "#111827";
          }

          if (style.backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "#ffffff";
          }

          if (style.borderColor.includes("oklch")) {
            el.style.borderColor = "#d1d5db";
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

    pdf.save(`${fileName}.pdf`);
  } catch (err) {
    console.error(err);
    alert("PDF download failed");
  }
};