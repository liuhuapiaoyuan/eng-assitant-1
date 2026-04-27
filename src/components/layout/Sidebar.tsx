import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, Mic, PenTool, LayoutDashboard, FileText, Settings, Book, BarChart3, Users, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();
  const isTeacher = location.pathname.startsWith('/teacher');

  const studentLinks = [
    { name: "学习看板", icon: Home, path: "/student" },
    { name: "教材学习", icon: BookOpen, path: "/student/unit" },
    { name: "课文精讲", icon: FileText, path: "/student/text" },
    { name: "口语跟读", icon: Mic, path: "/student/speaking" },
    { name: "作业中心", icon: PenTool, path: "/student/assignments" },
    { name: "作文批改", icon: PenTool, path: "/student/essay" },
  ];

  const teacherLinks = [
    { name: "工作台", icon: LayoutDashboard, path: "/teacher" },
    { name: "教材资源", icon: Book, path: "/teacher/materials" },
    { name: "智能备课", icon: FileText, path: "/teacher/lesson-prep" },
    { name: "作业发布", icon: ClipboardList, path: "/teacher/assignment-gen" },
    { name: "学情统计", icon: BarChart3, path: "/teacher/analytics" },
  ];

  const links = isTeacher ? teacherLinks : studentLinks;

  return (
    <aside className="w-64 h-screen border-r border-slate-200 bg-white flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 font-bold text-lg text-slate-800 truncate">
        {isTeacher ? "教案与管理" : "我的学习地图"}
      </div>
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
              location.pathname === link.path
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.name}
          </Link>
        ))}
      </div>
      <div className="p-4 border-t flex flex-col gap-2">
        <Link 
          to="/student" 
          className={cn(
            "text-sm p-2 rounded-md transition-colors text-center font-medium",
            !isTeacher ? "bg-indigo-100 text-indigo-700" : "hover:bg-slate-200 text-slate-600"
          )}
        >
          进入学生端
        </Link>
        <Link 
          to="/teacher" 
          className={cn(
            "text-sm p-2 rounded-md transition-colors text-center font-medium",
            isTeacher ? "bg-purple-100 text-purple-700" : "hover:bg-slate-200 text-slate-600"
          )}
        >
          进入教师端
        </Link>
      </div>
    </aside>
  );
}
