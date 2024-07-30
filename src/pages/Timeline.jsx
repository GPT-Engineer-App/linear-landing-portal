import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { addDays, format, isAfter, isBefore, max, min, parseISO } from 'date-fns';

const GanttChart = ({ milestones }) => {
  const data = milestones.map(milestone => ({
    name: milestone.title,
    start: parseISO(milestone.startDate),
    end: parseISO(milestone.endDate),
  }));

  const minDate = min(data.map(d => d.start));
  const maxDate = max(data.map(d => d.end));

  // Extend the chart range by 7 days on both sides
  const chartStartDate = addDays(minDate, -7);
  const chartEndDate = addDays(maxDate, 7);

  const formatDate = (date) => {
    return format(date, 'MM/dd/yyyy');
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-bold">{data.name}</p>
          <p>Start: {formatDate(data.start)}</p>
          <p>End: {formatDate(data.end)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-[400px] mb-8">
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            barSize={20}
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[chartStartDate.getTime(), chartEndDate.getTime()]}
              tickFormatter={(timestamp) => formatDate(new Date(timestamp))}
              ticks={[chartStartDate.getTime(), chartEndDate.getTime()]}
            />
            <YAxis type="category" dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="end" stackId="a">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`hsl(${index * 45}, 70%, 60%)`}
                  shape={
                    <rect x={entry.start.getTime()} 
                          width={entry.end.getTime() - entry.start.getTime()}
                    />
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
