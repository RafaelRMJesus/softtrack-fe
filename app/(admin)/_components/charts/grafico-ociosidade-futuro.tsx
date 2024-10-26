"use client";

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartConfig, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

const chartConfigFuturo = {
  "Horas Trabalhadas Futuras": {
    label: "Horas Trabalhadas Futuras",
    color: "#FF8C00", 
  },
  "Horas Ociosas Futuras": {
    label: "Horas Ociosas Futuras",
    color: "#00CED1",
  },
} satisfies ChartConfig;

const COLORS_FUTURO = ["#FF8C00", "#00CED1"];

const chartDataFuturo = [
  { name: "Horas Trabalhadas Futuras", value: 1000 }, 
  { name: "Horas Ociosas Futuras", value: 180 },      
];

export function GraficoOciosidadePieFuturo() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Card className="border-none drop-shadow-md h-full w-full">
      <CardHeader className="text-center">
        <CardTitle>Projeção de Ociosidade por Falta de Demanda</CardTitle>
        <CardDescription>Projeção para 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfigFuturo} className="w-full h-auto max-h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartDataFuturo}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
                activeIndex={activeIndex}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {chartDataFuturo.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_FUTURO[index % COLORS_FUTURO.length]}
                    cursor="pointer"
                  />
                ))}
              </Pie>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-center">
        <div className="flex gap-2 font-medium leading-none">
          Projeção de ociosidade em 15.6% das horas futuras <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Baseado nas projeções de horas futuras contratadas versus trabalhadas.
        </div>
      </CardFooter>
    </Card>
  );
}
