"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

const chartDataFuturo = [
  { month: "Junior", demandas: 21 },  
  { month: "Pleno", demandas: 17 },  
  { month: "Sênior", demandas: 40 }, 
  { month: "Expert", demandas: 28 },  
];

const chartConfigFuturo = {
  demandas: {
    label: "Demandas Futuras",
    color: "#FF7F50",  
  },
} satisfies ChartConfig;

export function GraficoDemandasSenioridadeFuturo() {
  return (
    <Card className="border-none drop-shadow-md">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Projeção de Demandas por Senioridade</CardTitle>
        <CardDescription>Novembro - 2024 (Futuro)</CardDescription>
      </CardHeader>
      <CardContent className="mt-11">
        <ChartContainer config={chartConfigFuturo}>
          <BarChart
            accessibilityLayer
            data={chartDataFuturo}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="demandas" fill="var(--color-demandas)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
