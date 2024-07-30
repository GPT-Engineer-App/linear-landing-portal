import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Teams from './Teams';
import Projects from './Projects';
import Issues from './Issues';

const Index = () => {
  const [teams, setTeams] = useState([
    { 
      id: 1, 
      name: 'Frontend Team', 
      description: 'Responsible for UI/UX development',
      projects: [
        { id: 1, name: 'Website Redesign', description: 'Overhaul of the company website', teamId: 1 },
      ]
    },
    { 
      id: 2, 
      name: 'Backend Team', 
      description: 'Handles server-side logic and databases',
      projects: [
        { id: 2, name: 'Mobile App', description: 'Development of iOS and Android apps', teamId: 2 },
      ]
    },
  ]);

  const allProjects = teams.flatMap(team => 
    team.projects.map(project => ({ ...project, teamName: team.name }))
  );

  const issues = [
    { id: 1, title: 'Fix login bug', description: 'Users unable to log in on Safari', status: 'In Progress' },
    { id: 2, title: 'Implement dark mode', description: 'Add dark mode option to settings', status: 'To Do' },
  ];

  const handleAddProject = useCallback((teamId, newProject) => {
    setTeams(prevTeams => prevTeams.map(team => 
      team.id === teamId 
        ? { ...team, projects: [...team.projects, { ...newProject, id: Date.now() }] }
        : team
    ));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Linear</h1>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
            Sign Up
          </Button>
        </nav>
      </header>

      <main className="container mx-auto mt-20">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">Manage Your Projects Efficiently</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Organize teams, projects, and issues all in one place. Streamline your workflow and boost productivity.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Your Teams</h2>
          <Teams initialTeams={teams} onAddProject={handleAddProject} />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Projects</h2>
          <Projects projects={allProjects} />
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Active Issues</h2>
          <Issues issues={issues} />
        </section>
      </main>

      <footer className="container mx-auto mt-20 py-6 text-center text-gray-400">
        <p>&copy; 2023 Linear. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
