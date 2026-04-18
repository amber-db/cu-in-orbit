import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoursesPage from "./pages/CoursesPage";
import CourseLessonPage from "./pages/CourseLessonPage";
import DashboardPage from "./pages/DashboardPage";
import DiagnosticQuizPage from "./pages/DiagnosticQuizPage";
import TeacherDashboardPage from "./pages/TeacherDashboardPage";
import StudyPlanPage from "./pages/StudyPlanPage";
import CumulativePracticePage from "./pages/CumulativePracticePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseLessonPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quiz/:courseId" element={<DiagnosticQuizPage />} />
          <Route path="/teacher" element={<TeacherDashboardPage />} />
          <Route path="/study-plan" element={<StudyPlanPage />} />
          <Route path="/practice" element={<CumulativePracticePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
