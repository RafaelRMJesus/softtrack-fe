"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  diasCriticos: {
    label: "Dias Críticos",
    color: "#FF6B6B",
  },
  diasNormais: {
    label: "Dias Normais",
    color: "#5F5DF1",
  },
} satisfies ChartConfig;

const chartData = [
  { day: "1", diasCriticos: 5, diasNormais: 20 },
  { day: "2", diasCriticos: 10, diasNormais: 15 },
  { day: "3", diasCriticos: 8, diasNormais: 18 },
  { day: "4", diasCriticos: 15, diasNormais: 13 },
  { day: "5", diasCriticos: 20, diasNormais: 10 },
  { day: "6", diasCriticos: 25, diasNormais: 5 },
];

export function GraficoDiasCriticos() {

  return (
    <Card className="flex flex-col border-none drop-shadow-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cálculo de Dias Críticos</CardTitle>
        <CardDescription>Simulação de Impacto no Projeto</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] mt-16"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius="20%"
            outerRadius="80%"
          >
            <PolarAngleAxis
              type="number"
              domain={[0, Math.max(...chartData.map((d) => d.diasCriticos + d.diasNormais))]}
              angleAxisId={0}
              tick={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <RadialBar
              dataKey="diasCriticos"
              cornerRadius={5}
              fill={chartConfig.diasCriticos.color}
            />
            <RadialBar
              dataKey="diasNormais"
              cornerRadius={5}
              fill={chartConfig.diasNormais.color}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {`Dia mais Critico: 20/10/2024`}
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Calculado no dia 26/10/2024
        </div>
      </CardFooter>
    </Card>
  );
}
