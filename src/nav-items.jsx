import { Home, Users, Folder, AlertCircle } from "lucide-react";
import Index from "./pages/Index.jsx";
import Teams from "./pages/Teams.jsx";
import Projects from "./pages/Projects.jsx";
import Project from "./pages/Project.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Teams",
    to: "/teams",
    icon: <Users className="h-4 w-4" />,
    page: <Teams teams={[]} />,
  },
  {
    title: "Projects",
    to: "/projects",
    icon: <Folder className="h-4 w-4" />,
    page: <Projects projects={[]} />,
  },
  {
    title: "Project",
    to: "/project/:id",
    icon: <Folder className="h-4 w-4" />,
    page: <Project />,
  },
];
