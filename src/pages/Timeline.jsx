import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { parseISO, format, differenceInDays } from 'date-fns';

const Timeline = ({ milestones }) => {
  const sortedMilestones = [...milestones].sort((a, b) => parseISO(a.startDate) - parseISO(b.startDate));
  const startDate = sortedMilestones.length > 0 ? parseISO(sortedMilestones[0].startDate) : new Date();
  const endDate = sortedMilestones.length > 0 ? parseISO(sortedMilestones[sortedMilestones.length - 1].endDate) : new Date();
  const totalDays = differenceInDays(endDate, startDate) + 1;

  const formatDate = (date) => format(parseISO(date), 'MM/dd/yyyy');

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px]">
          {sortedMilestones.map((milestone, index) => {
            const start = parseISO(milestone.startDate);
            const end = parseISO(milestone.endDate);
            const left = (differenceInDays(start, startDate) / totalDays) * 100;
            const width = (differenceInDays(end, start) + 1) / totalDays * 100;

            return (
              <div
                key={index}
                className="absolute h-8 rounded-full flex items-center justify-center text-xs text-white overflow-hidden"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  top: `${index * 40}px`,
                  backgroundColor: `hsl(${index * 45}, 70%, 60%)`
                }}
                title={`${milestone.title}\nStart: ${formatDate(milestone.startDate)}\nEnd: ${formatDate(milestone.endDate)}`}
              >
                {milestone.title}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;
