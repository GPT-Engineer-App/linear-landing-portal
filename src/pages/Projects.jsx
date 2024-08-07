import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Trash2, Users, ExternalLink, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const Projects = ({ projects = [], onDeleteProject }) => {
  const handleDelete = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      onDeleteProject(projectId);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Layers className="mr-2 h-8 w-8" />
        Linear Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-bold">
              <Folder className="mr-3 h-6 w-6 text-blue-500" />
              {project.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              <Users className="mr-1 h-3 w-3" />
              {project.teamName}
            </Badge>
            <div className="flex justify-between items-center">
              <Button variant="outline" className="hover:bg-blue-100 dark:hover:bg-blue-900" asChild>
                <Link to={`/project/${project.id}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Project
                </Link>
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={() => handleDelete(project.id)}
                className="ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
    </>
  );
};

export default Projects;
