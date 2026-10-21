import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Exact mathematical conversion of CSS oklch(L C H [/ A]) to standard rgb()/rgba() string.
 * This completely avoids browser/canvas oklch parsing limitations and eliminates dark/incorrect color fallbacks.
 */
function parseOklchToRgb(colorStr) {
  if (!colorStr || typeof colorStr !== "string") return colorStr;
  if (!colorStr.includes("oklch")) return colorStr;

  return colorStr.replace(
    /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\)/gi,
    (match, lRaw, cRaw, hRaw, aRaw) => {
      try {
        let l = parseFloat(lRaw);
        if (lRaw.endsWith("%")) l /= 100;

        let c = parseFloat(cRaw);
        let h = parseFloat(hRaw);

        // Convert hue to radians
        const hr = (h * Math.PI) / 180;
        const a = c * Math.cos(hr);
        const b = c * Math.sin(hr);

        // OKLab to linear RGB matrix
        const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
        const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
        const s_ = l - 0.0894841775 * a - 1.291485548 * b;

        const l_3 = l_ * l_ * l_;
        const m_3 = m_ * m_ * m_;
        const s_3 = s_ * s_ * s_;

        const rLinear = +4.0767439362 * l_3 - 3.3077115913 * m_3 + 0.2309699292 * s_3;
        const gLinear = -1.2684380046 * l_3 + 2.6097574011 * m_3 - 0.3413193965 * s_3;
        const bLinear = -0.0041960863 * l_3 - 0.7034186147 * m_3 + 1.707614701 * s_3;

        // Linear RGB to standard sRGB (gamma correction)
        const toSRGB = (x) => {
          const clamped = Math.max(0, Math.min(1, x));
          return clamped <= 0.0031308
            ? 12.92 * clamped
            : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
        };

        const r = Math.round(toSRGB(rLinear) * 255);
        const g = Math.round(toSRGB(gLinear) * 255);
        const bl = Math.round(toSRGB(bLinear) * 255);

        if (aRaw !== undefined) {
          let alpha = parseFloat(aRaw);
          if (aRaw.endsWith("%")) alpha /= 100;
          return `rgba(${r}, ${g}, ${bl}, ${alpha})`;
        }
        return `rgb(${r}, ${g}, ${bl})`;
      } catch {
        return "rgb(15, 23, 42)";
      }
    }
  );
}

export const downloadPDF = async (resumeRef, fileName = "Resume") => {
  if (!resumeRef?.current) return;

  // 1. Locate the true resume sheet, avoiding any outer grey preview wrapper
  const sourceElement =
    resumeRef.current.querySelector(".resume-sheet") || resumeRef.current;

  // 2. Create an isolated off-screen staging container at exact A4 width (794px = 210mm at 96 DPI)
  // This completely isolates the PDF generation from user's screen resolution, CSS zoom, and preview scale transforms.
  const stage = document.createElement("div");
  stage.style.position = "fixed";
  stage.style.top = "-99999px";
  stage.style.left = "-99999px";
  stage.style.width = "794px";
  stage.style.minHeight = "1123px";
  stage.style.margin = "0";
  stage.style.padding = "0";
  stage.style.backgroundColor = "#ffffff";
  stage.style.zIndex = "-9999";
  stage.style.overflow = "visible";

  // 3. Deep-clone the element
  const clone = sourceElement.cloneNode(true);

  // Normalize root styling on the clone to prevent scale, overflow, or aspect ratio bugs
  clone.style.transform = "none";
  clone.style.transformOrigin = "unset";
  clone.style.width = "794px";
  clone.style.maxWidth = "794px";
  clone.style.minWidth = "794px";
  clone.style.margin = "0";
  clone.style.boxSizing = "border-box";
  clone.style.overflow = "visible";
  clone.style.letterSpacing = "normal";

  // Check if this template is Creative (which has a dark sidebar) vs white background templates
  const isCreative = clone.querySelector("aside") !== null;
  if (!isCreative) {
    clone.style.backgroundColor = "#ffffff";
  }

  stage.appendChild(clone);
  document.body.appendChild(stage);

  try {
    // 4. Render high-resolution canvas with scale: 2 (crisp print-ready 300 DPI equivalent)
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: 794,
      onclone: (clonedDoc) => {
        // Strip/convert oklch from all <style> tags in the cloned document
        clonedDoc.querySelectorAll("style").forEach((styleTag) => {
          if (styleTag.textContent && styleTag.textContent.includes("oklch")) {
            styleTag.textContent = parseOklchToRgb(styleTag.textContent);
          }
        });

        // Normalize all elements in the cloned DOM tree
        clonedDoc.querySelectorAll("*").forEach((node) => {
          // Normalize typography to prevent horizontal/vertical collisions
          node.style.letterSpacing = "normal";
          node.style.wordBreak = "break-word";
          node.style.overflowWrap = "break-word";

          const tag = node.tagName.toLowerCase();

          // Enforce clear, explicit line-height and bottom margins on all headings, paragraphs, and list items
          if (tag === "h1") {
            node.style.lineHeight = "1.25";
            if (!node.style.marginBottom) node.style.marginBottom = "6px";
          } else if (tag === "h2") {
            node.style.lineHeight = "1.3";
            if (!node.style.marginBottom) node.style.marginBottom = "6px";
          } else if (tag === "h3") {
            node.style.lineHeight = "1.35";
            if (!node.style.marginBottom) node.style.marginBottom = "4px";
          } else if (tag === "p") {
            node.style.lineHeight = "1.5";
            if (!node.style.marginBottom) node.style.marginBottom = "4px";
          } else if (tag === "li") {
            node.style.lineHeight = "1.5";
            if (!node.style.marginBottom) node.style.marginBottom = "3px";
          } else if (tag === "span" || tag === "a") {
            node.style.lineHeight = "1.4";
          }

          // Convert flexbox gap into explicit child margins to prevent html2canvas gap collapsing
          const computed = window.getComputedStyle(node);
          if (computed.display === "flex" || computed.display === "inline-flex") {
            const hasChildren = node.children && node.children.length > 1;
            if (hasChildren) {
              const isCol = computed.flexDirection === "column" || computed.flexDirection === "column-reverse";
              Array.from(node.children).forEach((child, idx) => {
                if (!isCol && idx < node.children.length - 1 && !child.style.marginRight) {
                  child.style.marginRight = "14px";
                }
                if (!child.style.marginBottom && !isCol) {
                  child.style.marginBottom = "4px";
                }
              });
            }
          }

          // Convert any OKLCH colors on the element into standard RGB
          if (computed.color && computed.color.includes("oklch")) {
            node.style.color = parseOklchToRgb(computed.color);
          }
          if (computed.backgroundColor && computed.backgroundColor.includes("oklch")) {
            node.style.backgroundColor = parseOklchToRgb(computed.backgroundColor);
          }
          if (computed.borderColor && computed.borderColor.includes("oklch")) {
            node.style.borderColor = parseOklchToRgb(computed.borderColor);
          }
          if (computed.outlineColor && computed.outlineColor.includes("oklch")) {
            node.style.outlineColor = parseOklchToRgb(computed.outlineColor);
          }
        });

        // Ensure resume sheet root has clean white background (unless creative sidebar layout)
        const clonedSheet = clonedDoc.querySelector(".resume-sheet");
        if (clonedSheet && !clonedSheet.querySelector("aside")) {
          clonedSheet.style.backgroundColor = "#ffffff";
        }
      },
    });

    // 5. Generate precise A4 PDF (210 x 297 mm, portrait)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    // Calculate page height in canvas pixels based on exact A4 aspect ratio (297 / 210 = 1.41428):
    const pageCanvasHeight = Math.round((canvas.width * pdfHeight) / pdfWidth);

    const totalCanvasHeight = canvas.height;

    // If total content fits on a single A4 page (with reasonable threshold for rounding/padding),
    // output a clean 1-page PDF instead of creating a nearly-empty second page
    let numPages = 1;
    if (totalCanvasHeight > pageCanvasHeight + 40) {
      numPages = Math.ceil(totalCanvasHeight / pageCanvasHeight);
    }

    for (let page = 0; page < numPages; page++) {
      if (page > 0) {
        pdf.addPage("a4", "portrait");
      }

      // Create an individual clean A4 page canvas
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageCanvasHeight;
      const ctx = pageCanvas.getContext("2d");

      // Fill pure white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      const sourceY = page * pageCanvasHeight;
      const remainingHeight = totalCanvasHeight - sourceY;
      const sliceHeight = Math.min(pageCanvasHeight, remainingHeight);

      if (sliceHeight > 0) {
        // Draw the exact slice for this page
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );
      }

      const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.98);
      pdf.addImage(
        pageImgData,
        "JPEG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST"
      );
    }

    // Save PDF in browser
    pdf.save(`${fileName || "Resume"}.pdf`);
    return true;
  } catch (err) {
    console.error("PDF download error:", err);
    throw err;
  } finally {
    // 6. Always clean up staging DOM
    if (stage && stage.parentNode) {
      stage.parentNode.removeChild(stage);
    }
  }
};