import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ActionCard({
  title,
  description,
  icon: Icon,
  color,
  link,
  onClick,
  disabled = false,
}) {
  const content = (
    <div
      className={`group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="text-white" size={26} />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-slate-500 leading-7">
        {description}
      </p>

      <div className="mt-6 flex items-center font-medium text-indigo-600">
        {disabled ? (
          <span>Coming Soon</span>
        ) : (
          <>
            Open
            <ArrowRight
              size={18}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </div>
    </div>
  );

  if (disabled) return content;

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  return <Link to={link}>{content}</Link>;
}

export default ActionCard;