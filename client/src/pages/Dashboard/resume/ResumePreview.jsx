import Modern from "./templates/Modern";
import Professional from "./templates/Professional";
import Minimal from "./templates/Minimal";
import Creative from "./templates/Creative";

export default function ResumePreview({
  template = "Modern",
  formData,
  education,
  experiences,
  projects,
}) {
  const commonProps = {
    formData,
    education,
    experiences,
    projects,
  };

  switch (template) {
    case "Professional":
      return <Professional {...commonProps} />;

    case "Minimal":
      return <Minimal {...commonProps} />;

    case "Creative":
      return <Creative {...commonProps} />;

    case "Modern":
    default:
      return <Modern {...commonProps} />;
  }
}