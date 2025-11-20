import React from "react"
import { useState, useEffect } from 'react'
import { PieChart, Pie, Label } from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {

}

const colors = [
    "#f38ba8", "#fab387", "#f9e2af",
  "#a6e3a1", "#74c7ec", "#b4befe"
]

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0];

    return (
        <div className="bg-neutral-700 border border-neutral-600 rounded-md p-2 shadow-lg text-neutral-100 flex flex-col items-center">
            <div className="font-bold text-sm">{data.name}: {data.value.toLocaleString()}</div>
        </div>
    );
};

export default function DonutChart({ warehouses }) {
    
    const [pieData, setPieData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setPieData(warehouses?.map((warehouse, index) => ({
                label: warehouse.name,
                value: warehouse.usedCapacity,
                fill: colors[index % colors.length]
            }
        )));

        setTotal(warehouses?.reduce((acc, curr) => acc + curr.usedCapacity, 0));
    }, [warehouses]);

  return (
    <Card className="flex flex-col justify-center bg-neutral-800 text-neutral-100 border-neutral-700 shadow h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Inventory</CardTitle>
        <CardDescription>By warehouse</CardDescription>
      </CardHeader>

      <CardContent className="pt-4 flex flex-col items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] min-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<CustomTooltip />} cursor={false} />

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              outerRadius= "100%"
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox)) return null
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan className="fill-neutral-100 text-3xl font-bold">
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-neutral-400 text-sm"
                      >
                        Total
                      </tspan>
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* <CardFooter className="flex-col gap-2 text-sm text-neutral-400">
        <div>Your footer text here</div>
      </CardFooter> */}
    </Card>
  )
}
