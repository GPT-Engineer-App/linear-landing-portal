import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const GanttChart = ({ milestones }) => {
  const data = milestones.map(milestone => ({
    name: milestone.title,
    start: new Date(milestone.startDate).getTime(),
    duration: new Date(milestone.endDate).getTime() - new Date(milestone.startDate).getTime(),
  }));

  const minDate = Math.min(...data.map(d => d.start));
  const maxDate = Math.max(...data.map(d => d.start + d.duration));

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-bold">{data.name}</p>
          <p>Start: {formatDate(data.start)}</p>
          <p>End: {formatDate(data.start + data.duration)}</p>
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
              domain={[minDate, maxDate]}
              tickFormatter={formatDate}
            />
            <YAxis type="category" dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="duration" stackId="a">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
