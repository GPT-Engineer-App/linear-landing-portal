import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";

const Projects = ({ projects }) => {
  return (
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
            <Button variant="outline" className="hover:bg-blue-100 dark:hover:bg-blue-900">
              View Issues
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Projects;
