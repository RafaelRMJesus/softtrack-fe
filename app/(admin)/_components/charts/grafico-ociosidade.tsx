"use client"

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"
import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { Contrato, contratos, Demanda, demandas } from "@/mocks/contracts"
import { calcularOciosidadeTotal } from "../actions/ociosidade_helper"

const chartConfig = {
    "Horas Trabalhadas": {
        label: "Horas Trabalhadas",
        color: "#5F5DF1",
    },
    "Horas Ociosas": {
        label: "Horas Ociosas",
        color: "#CECDEE",
    },
} satisfies ChartConfig

const COLORS = ["#5F5DF1", "#CECDEE"];

const resultadoOciosidadeTotal = calcularOciosidadeTotal(contratos, demandas);

const chartData = [
    { name: "Horas Trabalhadas", value: parseFloat(resultadoOciosidadeTotal.totalHorasTrabalhadas.toFixed(2)) },
    { name: "Horas Ociosas", value: 224 }
];

export function GraficoOciosidadePie() {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index)
    }

    const onPieLeave = () => {
        setActiveIndex(undefined)
    }

    return (
        <Card className="border-none shadow-none h-full w-full">
            <CardHeader className="text-center">
                <CardTitle>Ociosidade por Falta de Demanda</CardTitle>
                <CardDescription>Ano de 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-auto max-h-[300px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
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
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        cursor="pointer"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length && typeof payload[0].value === 'number') {
                                        return (
                                            <div className="bg-white p-2 rounded shadow-lg">
                                                <p className="label">{`${payload[0].name} : ${payload[0].value.toFixed(2)}`}</p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Ociosidade detectada em 9.36% das horas totais <TrendingUp className="h-4 w-4"/>
                </div>
                <div className="leading-none text-muted-foreground">
                    Baseado nas horas contratadas versus trabalhadas.
                </div>
            </CardFooter>
        </Card>
    )
}