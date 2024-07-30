import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Users } from "lucide-react";

const Projects = ({ teams }) => {
  const allProjects = teams.flatMap(team => 
    team.projects.map(project => ({ ...project, teamName: team.name }))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allProjects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Folder className="mr-2" />
              {project.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-2">{project.description}</p>
            <p className="text-xs text-gray-400 mb-4 flex items-center">
              <Users className="mr-1 h-3 w-3" /> {project.teamName}
            </p>
            <Button variant="outline">View Issues</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Projects;
