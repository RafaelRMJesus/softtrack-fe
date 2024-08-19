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
import { getRandomNumber } from "@/lib/utils";

const chartConfig = {
  ausentes: {
    label: "ausentes",
    color: "#CECDEE",
  },
  disponiveis: {
    label: "disponiveis",
    color: "#5F5DF1",
  },
} satisfies ChartConfig;

interface GraficoFuncionariosDisponiveisOverviewProps {
  disponiveis: string;
  ausentes: string;
}

export function GraficoFuncionariosDisponiveisOverview({
  disponiveis,
  ausentes,
}: GraficoFuncionariosDisponiveisOverviewProps) {
  const chartData = [
    { month: "janeiro", ausentes: 500, disponiveis: Number(disponiveis) },
  ];

  const totalVisitors = chartData[0].ausentes + chartData[0].disponiveis;

  const percent = getRandomNumber(1, 10).toString();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Funcionários Disponíveis</CardTitle>
        <CardDescription>Agosto - 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] mt-16"
        >
          <RadialBarChart
            data={chartData}
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Funcionários
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
          Aumento de {percent}.3% de funcionários disponíveis{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Porcentagem baseada nos últimos 3 meses
        </div>
        <div className="leading-none text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
}