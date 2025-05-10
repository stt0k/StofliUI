"use client";

import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Area,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 30 },
  { name: "Wed", value: 70 },
  { name: "Thu", value: 50 },
  { name: "Fri", value: 45 },
  { name: "Sat", value: 65 },
  { name: "Sun", value: 90 },
];

export default function LineChartComponent() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#666666"
          fontSize={9}
          tickLine={false}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          stroke="#666666"
          fontSize={9}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          padding={{ top: 10, bottom: 10 }}
        />
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-black border border-zinc-800 p-2 rounded text-white text-xs">
                  <p className="font-medium">{label}</p>
                  <p className="text-white">{`${payload[0].value}%`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ffffff"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 6,
            strokeWidth: 2,
            stroke: "#ffffff",
            fill: "#000000",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          fill="url(#colorValue)"
          stroke="transparent"
        />

        {/* Línea horizontal */}
        <ReferenceLine y={40} stroke="#444444" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
}
