import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Teams = ({ initialTeams }) => {
  const [teams, setTeams] = useState(initialTeams);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');

  const handleAddTeam = (e) => {
    e.preventDefault();
    if (newTeamName && newTeamDescription) {
      const newTeam = {
        id: Date.now(),
        name: newTeamName,
        description: newTeamDescription,
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
      setNewTeamDescription('');
    }
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
              className="mt-2 block w-full text-lg border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-2 block w-full text-lg border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
            <Plus className="mr-2 h-5 w-5" /> Add Team
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" />
                {team.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{team.description}</p>
              <Button variant="outline">View Projects</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Teams;
