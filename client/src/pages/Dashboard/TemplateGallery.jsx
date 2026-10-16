import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateResumeModal from "../../components/resume/CreateResumeModal";

export default function TemplateGallery() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("new");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: "Modern",
      image: "https://placehold.co/300x420?text=Modern",
    },
    {
      id: 2,
      name: "Professional",
      image: "https://placehold.co/300x420?text=Professional",
    },
    {
      id: 3,
      name: "Minimal",
      image: "https://placehold.co/300x420?text=Minimal",
    },
    {
      id: 4,
      name: "Creative",
      image: "https://placehold.co/300x420?text=Creative",
    },
  ];

  const handleUseTemplate = (templateName) => {
    setSelectedTemplate(templateName);
    setOpenModal(true);
  };

  const handleContinue = () => {
    setOpenModal(false);

    navigate("/resume-builder", {
      state: {
        template: selectedTemplate,
        option: selectedOption,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center">
          Choose Your Resume Template
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-10">
          Select a professional template to start building your resume.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-[420px] object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {template.name}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  ATS Friendly Resume
                </p>

                <button
                  onClick={() => handleUseTemplate(template.name)}
                  className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

      <CreateResumeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        onContinue={handleContinue}
      />
    </div>
  );
}