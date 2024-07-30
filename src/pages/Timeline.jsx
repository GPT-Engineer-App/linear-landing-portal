import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { parseISO, format, differenceInDays, addDays } from 'date-fns';

const Timeline = ({ milestones }) => {
  const sortedMilestones = [...milestones].sort((a, b) => parseISO(a.startDate) - parseISO(b.startDate));
  const startDate = sortedMilestones.length > 0 ? parseISO(sortedMilestones[0].startDate) : new Date();
  const endDate = sortedMilestones.length > 0 ? parseISO(sortedMilestones[sortedMilestones.length - 1].endDate) : new Date();
  const totalDays = differenceInDays(endDate, startDate) + 1;

  const formatDate = (date) => format(parseISO(date), 'MM/dd/yyyy');

  const generateDateMarkers = () => {
    const markers = [];
    const markerCount = 5; // Number of date markers to show
    for (let i = 0; i < markerCount; i++) {
      const date = addDays(startDate, (totalDays / (markerCount - 1)) * i);
      const left = (differenceInDays(date, startDate) / totalDays) * 100;
      markers.push(
        <div key={i} className="absolute" style={{ left: `${left}%`, top: '100%' }}>
          <div className="h-2 w-px bg-gray-300 mb-1"></div>
          <span className="text-xs text-gray-500">{format(date, 'MM/dd')}</span>
        </div>
      );
    }
    return markers;
  };

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
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
          {generateDateMarkers()}
        </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;
