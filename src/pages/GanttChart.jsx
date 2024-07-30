import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GanttChart = ({ milestones }) => {
  const data = milestones.map(milestone => ({
    name: milestone.title,
    start: new Date(milestone.startDate).getTime(),
    end: new Date(milestone.endDate).getTime(),
  }));

  const minDate = Math.min(...data.map(d => d.start));
  const maxDate = Math.max(...data.map(d => d.end));

  // Calculate the range in days
  const rangeDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);

  // Function to format dates based on the range
  const formatDate = (date) => {
    const d = new Date(date);
    if (rangeDays > 365) {
      return d.getFullYear().toString();
    } else if (rangeDays > 31) {
      return `${d.getMonth() + 1}/${d.getFullYear()}`;
    } else {
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }
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
            barCategoryGap={10}
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[minDate, maxDate]}
              tickFormatter={formatDate}
            />
            <YAxis type="category" dataKey="name" />
            <Tooltip
              labelFormatter={formatDate}
              formatter={formatDate}
            />
            <Bar dataKey="start" stackId="a" fill="#8884d8" />
            <Bar dataKey="end" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
