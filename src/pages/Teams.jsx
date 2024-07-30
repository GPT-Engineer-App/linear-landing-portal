import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Trash2, FolderPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Projects from './Projects';
import AddProjectModal from './AddProjectModal';

const Teams = ({ initialTeams, onAddProject }) => {
  const [teams, setTeams] = useState(initialTeams);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (newTeamName && newTeamDescription) {
      const newTeam = {
        id: Date.now(),
        name: newTeamName,
        description: newTeamDescription,
        projects: [],
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
      setNewTeamDescription('');
    }
  };

  const handleDeleteTeam = (id) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const handleAddProject = (teamId, project) => {
    const newProject = { ...project, teamId };
    onAddProject(teamId, newProject);
    setShowProjectForm(false);
    setSelectedTeam(null);
  };

  const handleDeleteProject = (projectId) => {
    setTeams(teams.map(team => ({
      ...team,
      projects: team.projects.filter(project => project.id !== projectId)
    })));
  };

  const handleDeleteProjectForTeam = (teamId, projectId) => {
    setTeams(teams.map(team => 
      team.id === teamId
        ? { ...team, projects: team.projects.filter(project => project.id !== projectId) }
        : team
    ));
  };

  return (
    <div className="p-6 bg-gray-100">
      <form onSubmit={handleAddTeam} className="mb-8 p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Add New Team</h3>
        <div className="space-y-6">
          <div>
            <Label htmlFor="teamName" className="text-lg font-medium text-gray-800">Team Name</Label>
            <Input
              id="teamName"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Enter team name"
              required
              className="mt-2 block w-full text-lg text-gray-900 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="teamDescription" className="text-lg font-medium text-gray-800">Team Description</Label>
            <Input
              id="teamDescription"
              value={newTeamDescription}
              onChange={(e) => setNewTeamDescription(e.target.value)}
              placeholder="Enter team description"
              required
              className="mt-2 block w-full text-lg text-gray-900 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
            <Plus className="mr-2 h-5 w-5" /> Add Team
          </Button>
        </div>
      </form>

      <div className="space-y-8">
        {teams.map((team) => (
          <Card key={team.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2" />
                  {team.name}
                </div>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteTeam(team.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{team.description}</p>
              <Button variant="outline" onClick={() => {
                setSelectedTeam(team);
                setIsAddProjectModalOpen(true);
              }}>
                <FolderPlus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Projects</h4>
                <Projects 
                  projects={team.projects} 
                  onDeleteProject={(projectId) => handleDeleteProjectForTeam(team.id, projectId)} 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onSubmit={handleAddProject}
        teamId={selectedTeam?.id}
      />
    </div>
  );
};

export default Teams;
