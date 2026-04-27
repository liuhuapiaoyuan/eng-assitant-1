/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import StudentHome from "./pages/student/StudentHome";
import TextbookUnit from "./pages/student/TextbookUnit";
import TextLearning from "./pages/student/TextLearning";
import SpeakingPractice from "./pages/student/SpeakingPractice";
import AssignmentCenter from "./pages/student/AssignmentCenter";
import EssayGrading from "./pages/student/EssayGrading";

import TeacherWorkspace from "./pages/teacher/TeacherWorkspace";
import MaterialResources from "./pages/teacher/MaterialResources";
import LessonPrep from "./pages/teacher/LessonPrep";
import AssignmentGeneration from "./pages/teacher/AssignmentGeneration";
import StudentAnalytics from "./pages/teacher/StudentAnalytics";
import EssayReview from "./pages/teacher/EssayReview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student" replace />} />
        
        <Route element={<AppLayout />}>
          {/* Student Routes */}
          <Route path="/student" element={<StudentHome />} />
          <Route path="/student/unit" element={<TextbookUnit />} />
          <Route path="/student/text" element={<TextLearning />} />
          <Route path="/student/speaking" element={<SpeakingPractice />} />
          <Route path="/student/assignments" element={<AssignmentCenter />} />
          <Route path="/student/essay" element={<EssayGrading />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherWorkspace />} />
          <Route path="/teacher/materials" element={<MaterialResources />} />
          <Route path="/teacher/lesson-prep" element={<LessonPrep />} />
          <Route path="/teacher/assignment-gen" element={<AssignmentGeneration />} />
          <Route path="/teacher/analytics" element={<StudentAnalytics />} />
          <Route path="/teacher/essay-review" element={<EssayReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
