import { toast } from "sonner";

const getPublicResumeUrl = (publicId) => {
  return `${window.location.origin}/resume/${publicId}`;
};

/**
 * Copy the public resume link to clipboard.
 * Shows a toast notification on success/failure.
 */
export const copyResumeLink = async (publicId) => {
  const url = getPublicResumeUrl(publicId);

  try {
    await navigator.clipboard.writeText(url);
    toast.success("Resume link copied!", {
      description: "Share it with anyone — no login required.",
      icon: "🔗",
    });
  } catch {
    // Fallback for browsers that block clipboard API
    const el = document.createElement("textarea");
    el.value = url;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.focus();
    el.select();
    try {
      document.execCommand("copy");
      toast.success("Resume link copied!", {
        description: "Share it with anyone — no login required.",
        icon: "🔗",
      });
    } catch {
      toast.error("Could not copy link. Please copy it manually:", {
        description: url,
      });
    } finally {
      document.body.removeChild(el);
    }
  }
};

/**
 * Share the public resume using the Web Share API.
 * Falls back to copyResumeLink if Web Share is not supported.
 */
export const shareResumeLink = async (resumeName, publicId) => {
  const url = getPublicResumeUrl(publicId);

  if (navigator.share) {
    try {
      await navigator.share({
        title: resumeName || "My Resume",
        text: `Check out my professional resume: ${resumeName || "Resume"}`,
        url,
      });
    } catch (err) {
      // User cancelled the share — don't show error
      if (err.name !== "AbortError") {
        toast.error("Sharing failed. Copying link instead.");
        await copyResumeLink(publicId);
      }
    }
  } else {
    // Fallback: just copy the link
    await copyResumeLink(publicId);
  }
};
