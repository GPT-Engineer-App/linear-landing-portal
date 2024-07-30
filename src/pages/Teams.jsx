import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Teams = ({ teams }) => {
  return (
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
  );
};

export default Teams;
