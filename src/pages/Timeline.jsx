import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GanttChart } from 'react-gantt-chart';
import { parseISO, format } from 'date-fns';

const Timeline = ({ milestones }) => {
  const tasks = milestones.map((milestone, index) => ({
    id: index.toString(),
    name: milestone.title,
    start: parseISO(milestone.startDate),
    end: parseISO(milestone.endDate),
    progress: 0,
    type: 'task',
    isDisabled: false,
    styles: { progressColor: `hsl(${index * 45}, 70%, 60%)`, progressSelectedColor: `hsl(${index * 45}, 70%, 60%)` }
  }));

  const formatDate = (date) => {
    return format(date, 'MM/dd/yyyy');
  };

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px' }}>
          <GanttChart
            tasks={tasks}
            viewMode="Month"
            onDateChange={(task, start, end) => {
              console.log(task, start, end);
            }}
            onProgressChange={(task, progress) => {
              console.log(task, progress);
            }}
            onDoubleClick={(task) => {
              console.log(task);
            }}
            onTaskSelect={(task) => {
              console.log(task);
            }}
            listCellWidth=""
            columnWidth={60}
            TooltipContent={({ task }) => (
              <div className="bg-white p-2 border rounded shadow">
                <p className="font-bold">{task.name}</p>
                <p>Start: {formatDate(task.start)}</p>
                <p>End: {formatDate(task.end)}</p>
              </div>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;
