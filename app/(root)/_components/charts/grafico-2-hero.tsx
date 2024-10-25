"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { segmento: "ti", consultores: 2067, fill: "#5F5DF1" },
  { segmento: "vendas", consultores: 3562, fill: "#00CEBE" },
  { segmento: "rh", consultores: 1530, fill: "#3b82f6" },
  { segmento: "suporte", consultores: 1892, fill: "#CECDEE" },
];

const chartConfig = {
  consultores: {
    label: "Consultores",
  },
  ti: {
    label: "N1",
    color: "#5F5DF1",
  },
  vendas: {
    label: "N2",
    color: "#00CEBE",
  },
  rh: {
    label: "N3",
    color: "#D9014B",
  },
  suporte: {
    label: "Outras",
    color: "#CECDEE",
  },
} satisfies ChartConfig;

export function Grafico2Hero() {
  const totalconsultores = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.consultores, 0);
  }, []);

  return (
    <Card className="flex flex-col overflow-hidden border-none shadow-xl">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">Retrabalho por Complexidade</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[320px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="consultores"
              nameKey="segmento"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalconsultores.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Horas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="segmento" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
