import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import TemplateGallery from "./pages/Dashboard/TemplateGallery";
import ResumeBuilder from "./pages/Dashboard/ResumeBuilder";
import PublicResumePage from "./pages/PublicResume/PublicResumePage";

function App() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Choose Template */}
        <Route
          path="/create-resume"
          element={
            <ProtectedRoute>
              <TemplateGallery />
            </ProtectedRoute>
          }
        />

        {/* Resume Builder */}
        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />

        {/* Public Resume — no auth required */}
        <Route path="/resume/:publicId" element={<PublicResumePage />} />
      </Routes>

      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
      />
    </>
  );
}

export default App;