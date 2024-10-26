"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "Outubro 2024", Manutencao: 80, Melhoria: 40, Projetos: 100, Suporte: 50, Erro: 30, Problema: 20 },
  { name: "Novembro 2024", Manutencao: 100, Melhoria: 50, Projetos: 120, Suporte: 70, Erro: 40, Problema: 30 },
  { name: "Dezembro 2024", Manutencao: 120, Melhoria: 60, Projetos: 140, Suporte: 80, Erro: 50, Problema: 40 },
  { name: "Janeiro 2025", Manutencao: 110, Melhoria: 50, Projetos: 130, Suporte: 75, Erro: 45, Problema: 35 },
  { name: "Fevereiro 2025", Manutencao: 130, Melhoria: 70, Projetos: 150, Suporte: 90, Erro: 60, Problema: 50 },
];

const chartConfig = {
  Manutencao: {
    label: "Manutenção",
    color: "#8884d8",
  },
  Melhoria: {
    label: "Melhoria",
    color: "#5623E2",
  },
  Projetos: {
    label: "Projetos",
    color: "#D9014B",
  },
  Suporte: {
    label: "Suporte",
    color: "#EF462F",
  },
  Erro: {
    label: "Erros",
    color: "#FADF0B",
  },
  Problema: {
    label: "Problemas",
    color: "#00CEBE",
  },
} satisfies ChartConfig;

const tickFormatter = (value: string) => value;
const labelFormatter = (value: string) => value;

export function GraficoPrevisaoDemanda() {
  return (
    <Card className="border-none drop-shadow-md h-full w-full bg-white overflow-x-hidden">
      <CardHeader className="flex flex-col items-center gap-2 space-y-0 border-b py-5">
        <div className="grid gap-1 text-center">
          <CardTitle>Previsão de Demanda por Tipo</CardTitle>
          <CardDescription>Próximos Meses - 2024</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="w-full h-full max-h-[290px] aspect-square">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={tickFormatter}
              />
              <YAxis />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent labelFormatter={labelFormatter} indicator="dot" />}
              />
              <Legend
                content={<ChartLegendContent />}
              />
              <Line type="monotone" dataKey="Manutencao" stroke={chartConfig.Manutencao.color} />
              <Line type="monotone" dataKey="Melhoria" stroke={chartConfig.Melhoria.color} />
              <Line type="monotone" dataKey="Projetos" stroke={chartConfig.Projetos.color} />
              <Line type="monotone" dataKey="Suporte" stroke={chartConfig.Suporte.color} />
              <Line type="monotone" dataKey="Erro" stroke={chartConfig.Erro.color} />
              <Line type="monotone" dataKey="Problema" stroke={chartConfig.Problema.color} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

GraficoPrevisaoDemanda.displayName = "GraficoPrevisaoDemanda";
