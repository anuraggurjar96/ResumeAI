import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">

        <div className="bg-blue-600 text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold">
            ResumeAI
          </h1>

          <p className="mt-5 text-center">
            Build ATS Friendly Resume with AI and land your dream job.
          </p>
        </div>

        <div className="p-10">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;