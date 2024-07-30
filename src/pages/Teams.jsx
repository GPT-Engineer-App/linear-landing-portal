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
    <div>
      <form onSubmit={handleAddTeam} className="mb-6 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Team</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="teamName" className="text-gray-700">Team Name</Label>
            <Input
              id="teamName"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Enter team name"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="teamDescription" className="text-gray-700">Team Description</Label>
            <Input
              id="teamDescription"
              value={newTeamDescription}
              onChange={(e) => setNewTeamDescription(e.target.value)}
              placeholder="Enter team description"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            <Plus className="mr-2 h-4 w-4" /> Add Team
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
