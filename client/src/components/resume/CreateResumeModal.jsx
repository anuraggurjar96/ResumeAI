import { X } from "lucide-react";

export default function CreateResumeModal({
  open,
  onClose,
  onContinue,
  selectedOption,
  setSelectedOption,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-2">
          Create Resume
        </h2>

        <p className="text-gray-500 mb-6">
          Choose how you want to start.
        </p>

        <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer mb-4">
          <input
            type="radio"
            value="new"
            checked={selectedOption === "new"}
            onChange={(e) => setSelectedOption(e.target.value)}
          />

          <div>
            <h3 className="font-semibold">
              Create New Resume
            </h3>

            <p className="text-sm text-gray-500">
              Start from scratch.
            </p>
          </div>
        </label>

        <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

          <input
            type="radio"
            value="upload"
            checked={selectedOption === "upload"}
            onChange={(e) => setSelectedOption(e.target.value)}
          />

          <div>
            <h3 className="font-semibold">
              Upload Existing Resume
            </h3>

            <p className="text-sm text-gray-500">
              Upload PDF or DOCX.
            </p>
          </div>

        </label>

        <button
          onClick={onContinue}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Continue
        </button>

      </div>

    </div>
  );
}