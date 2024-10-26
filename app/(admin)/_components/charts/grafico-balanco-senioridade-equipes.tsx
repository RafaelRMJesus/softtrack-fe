"use client"

import React, { memo } from "react"
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { nivel: "Estagiário", quantidade: 3 },
  { nivel: "Júnior", quantidade: 10 },
  { nivel: "Pleno", quantidade: 13 },
  { nivel: "Sênior", quantidade: 13 },
  { nivel: "Expert", quantidade: 7 },
]

const chartConfig = {
  quantidade: {
    label: "Quantidade",
    color: "#5F5DF1",
  },
} satisfies ChartConfig

export const GraficoBalancoSenioridadeEquipes = memo(() => {
  return (
    <Card className="border-none drop-shadow-md h-full w-full">
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-center text-base lg:text-lg">
          Balanço de Senioridade das Equipes
        </CardTitle>
        <CardDescription>
          Outubro - 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-full max-h-[400px]">
          <ResponsiveContainer>
            <RadarChart data={chartData}>
              <PolarAngleAxis dataKey="nivel" />
              <PolarGrid />
              <Radar
                dataKey="quantidade"
                fill="var(--color-quantidade)"
                fillOpacity={0.6}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Senioridade mais balanceada <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Distribuição baseada nos níveis de senioridade da equipe
        </div>
      </CardFooter>
    </Card>
  )
})

GraficoBalancoSenioridadeEquipes.displayName = "GraficoBalancoSenioridadeEquipes"
