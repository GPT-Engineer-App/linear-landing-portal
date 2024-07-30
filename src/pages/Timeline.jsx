import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Timeline = ({ milestones }) => {
  // Sort milestones by start date
  const sortedMilestones = [...milestones].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {sortedMilestones.map((milestone, index) => (
            <div key={milestone.id} className="mb-4 flex items-center">
              <div className="w-24 text-sm text-gray-500">
                {new Date(milestone.startDate).toLocaleDateString()}
              </div>
              <div className="w-4 h-4 rounded-full bg-blue-500 z-10"></div>
              <div className="flex-grow pl-4">
                <h3 className="text-lg font-semibold">{milestone.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(milestone.startDate).toLocaleDateString()} - {new Date(milestone.endDate).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="outline" className="ml-2">
                {Math.ceil((new Date(milestone.endDate) - new Date(milestone.startDate)) / (1000 * 60 * 60 * 24))} days
              </Badge>
            </div>
          ))}
          <div className="absolute top-2 bottom-0 left-[7.5rem] w-0.5 bg-gray-200 -z-10"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;
