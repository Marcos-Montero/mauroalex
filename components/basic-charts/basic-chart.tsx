"use client";
import {
  Brush,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  getDurationString,
  getRank,
} from '@/lib/utils';
import {
  Record as RecordType,
  User,
} from '@prisma/client';

import { GraphRank } from '../graph-rank';
import {
  durationBasedExercises,
  durationReversedExercises,
} from './basic-chart-card';

export enum ChartType {
  BurpeesChart = "Burpees",
  PushUpsChart = "PushUps",
  PullUpsChart = "PullUps",
  LSitChart = "LSit",
  DipsChart = "Dips",
  PlankChart = "Plank",
  Squats = "Squats",
}
interface ChartRank {
  name: string;
  value: number;
}
export type RecordWithExercise = RecordType & {
  basicExercise: {
    name: string;
  };
};
export const ranks = {
  PushUps: [
    { name: "Bronze", value: 0 },
    { name: "Silver", value: 10 },
    { name: "Gold", value: 40 },
    { name: "Platinum", value: 60 },
    { name: "Diamond", value: 80 },
    { name: "Master", value: 100 },
    { name: "Challenger", value: 120 },
  ],
  Squats: [
    { name: "Bronze", value: 10 },
    { name: "Silver", value: 30 },
    { name: "Gold", value: 100 },
    { name: "Platinum", value: 120 },
    { name: "Diamond", value: 150 },
    { name: "Master", value: 180 },
    { name: "Challenger", value: 200 },
  ],
  PullUps: [
    { name: "Bronze", value: 0 },
    { name: "Silver", value: 5 },
    { name: "Gold", value: 10 },
    { name: "Platinum", value: 15 },
    { name: "Diamond", value: 18 },
    { name: "Master", value: 25 },
    { name: "Challenger", value: 30 },
  ],
  Plank: [
    { name: "Bronze", value: 120 },
    { name: "Silver", value: 300 },
    { name: "Gold", value: 480 },
    { name: "Platinum", value: 600 },
    { name: "Diamond", value: 900 },
    { name: "Master", value: 1200 },
    { name: "Challenger", value: 1800 },
  ],
  Burpees: [
    { name: "Bronze", value: 1500 },
    { name: "Silver", value: 1200 },
    { name: "Gold", value: 600 },
    { name: "Platinum", value: 600 },
    { name: "Diamond", value: 420 },
    { name: "Master", value: 360 },
    { name: "Challenger", value: 300 },
  ],
  Dips: [
    { name: "Bronze", value: 0 },
    { name: "Silver", value: 5 },
    { name: "Gold", value: 10 },
    { name: "Platinum", value: 20 },
    { name: "Diamond", value: 50 },
    { name: "Master", value: 60 },
    { name: "Challenger", value: 100 },
  ],
  LSit: [
    { name: "Bronze", value: 0 },
    { name: "Silver", value: 3 },
    { name: "Gold", value: 10 },
    { name: "Platinum", value: 15 },
    { name: "Diamond", value: 20 },
    { name: "Master", value: 30 },
    { name: "Challenger", value: 50 },
  ],
} as Record<ChartType, ChartRank[]>;

export const BasicChart = ({
  selectedChart,
  userId,
  selectedChartRecords,
}: {
  selectedChart: ChartType;
  selectedChartRecords?: RecordWithExercise[];
  userId: User["id"];
}) => {
  if (!selectedChartRecords) {
    return <div>No records for the selected exercise.</div>;
  }
  const data = selectedChartRecords?.map(({ mark, timestamp }) => ({
    date: timestamp,
    total: mark,
  }));

  const getYearLines = () => {
    // Get the earliest and latest timestamps in the data array
    const earliestTimestamp = data[0].date;
    const latestTimestamp = data[data.length - 1].date;

    // Convert the timestamps to Date objects
    const earliestDate = new Date(earliestTimestamp);
    const latestDate = new Date(latestTimestamp);

    // Get the year of the earliest and latest dates
    const earliestYear = earliestDate.getFullYear();
    const latestYear = latestDate.getFullYear();

    // Create an array to hold the timestamps of every year passed between the earliest and latest dates
    const yearTimestamps = [];

    // Loop through each year between the earliest and latest years
    for (let year = earliestYear; year <= latestYear; year++) {
      // Create a new Date object for January 1st of the current year
      const yearStart = new Date(year, 0, 1);

      // Get the timestamp of the year start date
      const yearStartTimestamp = yearStart.getTime();

      // Add the year start timestamp to the yearTimestamps array
      yearTimestamps.push(yearStartTimestamp);
    }
    return yearTimestamps;
  };

  if (!data || data.length === 0) {
    return (
      <div className="p-4 flex justify-center flex-col items-center">
        No records for the selected exercise.{" "}
      </div>
    );
  }
  const lastRecordValue =
    data[data.length - 1 >= 0 ? data.length - 1 : 0].total;
  const selectedRank = ranks[selectedChart.replace(" ", "") as ChartType];
  if (!lastRecordValue || !selectedRank) {
    return <div>Something went wrong.</div>;
  }
  const { rank, division } = getRank(
    lastRecordValue,
    selectedRank,
    durationReversedExercises.includes(selectedChart)
  );

  return (
    <div className="relative flex w-full flex-col gap-8 items-center pt-4 px-8">
      {rank && division && (
        <GraphRank
          selectedRank={selectedChart}
          ranks={selectedRank}
          rank={rank}
          division={division}
        />
      )}
      <h3 className="text-3xl">
        {selectedChart}
        {selectedChart === "Burpees" && (
          <span className="text-2xl"> time x 100 reps</span>
        )}
      </h3>
      <ResponsiveContainer height={350}>
        <LineChart data={data} className="outline outline-white/20 rounded-xl ">
          <XAxis
            dataKey="date"
            scale="time"
            color="#fff"
            tickFormatter={(unixTime) =>
              new Date(unixTime).toLocaleDateString("es-es", {
                month: "short",
                day: "numeric",
              })
            }
            stroke="#fff"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#fff"
            reversed={durationReversedExercises.includes(selectedChart)}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) =>
              durationBasedExercises.includes(selectedChart.replace(" ", ""))
                ? `${getDurationString(value)} `
                : " "+ value + " reps"
            }
          />
          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,.2)",
              borderRadius: "8px",
            }}
            formatter={(value) =>
              durationBasedExercises.includes(selectedChart)
                ? `${getDurationString(value as number)}`
                : value + " reps"
            }
            labelFormatter={(unixTime) =>
              new Date(unixTime).toLocaleDateString("es-es", {
                month: "short",
                day: "numeric",
              })
            }
          />
          <Line type="monotone" stroke="#ffa4a4" dataKey="total" color="#fff" />
          {selectedRank.map((rank) => (
            <ReferenceLine
              key={rank.name}
              y={rank.value}
              label={rank.name}
              stroke="gray"
            />
          ))}
          {getYearLines()?.map((date) => (
            <ReferenceLine
              key={date.toString()}
              scale="time"
              x={date}
              label={new Date(date).getFullYear()}
              stroke="gray"
              strokeDasharray="3 3"
            />
          ))}
          <Brush
            scale="time"
            dataKey="date"
            tickFormatter={(unixTime) =>
              new Date(unixTime).toLocaleDateString("es-es", {
                month: "short",
                day: "numeric",
              })
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
