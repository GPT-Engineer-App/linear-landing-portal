import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Trash2, Users, ExternalLink, AlertCircle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const Projects = ({ projects = [], onDeleteProject }) => {
  const handleDelete = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      onDeleteProject(projectId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold">
              <Folder className="mr-2 h-5 w-5 text-blue-500" />
              {project.name}
            </CardTitle>
            <Badge className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              <Users className="mr-1 h-3 w-3" />
              {project.teamName}
            </Badge>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="mr-2 h-4 w-4" />
              {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'No start date'}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full justify-center" asChild>
              <Link to={`/project/${project.id}`} state={{ project, showOverview: true }}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Project
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-center" 
              asChild
            >
              <Link to={`/project/${project.id}`} state={{ project, showIssues: true }}>
                <AlertCircle className="mr-2 h-4 w-4" />
                View Issues
              </Link>
            </Button>
            <Button 
              variant="destructive" 
              className="w-full justify-center"
              onClick={() => handleDelete(project.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Project
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Projects;
