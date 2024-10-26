"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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

const chartConfigFuturo = {
  ausentes: {
    label: "Projeção Ausentes",
    color: "#CECDEE",
  },
  disponiveis: {
    label: "Projeção Disponíveis",
    color: "#5623E2",
  },
} satisfies ChartConfig;

interface GraficoConsultoresDisponiveisFuturoProps {
  disponiveisFuturo: string;
  ausentesFuturo: string;
}

export function GraficoConsultoresDisponiveisFuturo({
  disponiveisFuturo,
  ausentesFuturo,
}: GraficoConsultoresDisponiveisFuturoProps) {
  const chartDataFuturo = [
    {
      month: "setembro",
      ausentes: Number(ausentesFuturo),
      disponiveis: Number(disponiveisFuturo),
    },
  ];

  const totalConsultoresFuturo =
    chartDataFuturo[0].ausentes + chartDataFuturo[0].disponiveis;

  return (
    <Card className="flex flex-col border-none drop-shadow-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Projeção de Consultores Disponíveis</CardTitle>
        <CardDescription>Novembro - 2024 (Futuro)</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfigFuturo}
          className="mx-auto aspect-square w-full max-w-[250px] mt-16"
        >
          <RadialBarChart
            data={chartDataFuturo}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalConsultoresFuturo.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Projeção 
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="ausentes"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-ausentes)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="disponiveis"
              fill="var(--color-disponiveis)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Projeção de aumento de 9.5%{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Projeção com base nas tendências dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
