"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

Chart.register(...registerables);

const data = [
  [1, 2, 0, 3, 2, 4, 5, 1, 3, 0, 1, 2, 3, 4, 5, 1, 2, 0, 4, 2, 1, 3, 0, 2, 3, 4, 5, 1, 2, 3, 4],
  [3, 5, 2, 4, 1, 3, 4, 5, 2, 1, 0, 4, 5, 2, 1, 4, 2, 1, 3, 2, 0, 5, 4, 3, 2, 1, 0, 2, 4, 3, 5], 
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
  [2, 1, 4, 3, 5, 2, 4, 3, 1, 2, 4, 5, 3, 1, 0, 2, 3, 4, 1, 5, 2, 1, 0, 3, 5, 4, 2, 3, 1, 2, 4],
];

const xLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

const getFilteredYLabels = (startDay: number) => {
  return Array.from({ length: 7 }, (_, i) => {
    const dayOfMonth = startDay + i;
    const weekDay = weekDays[i % 5]; 
    return `${dayOfMonth} - ${weekDay}`;
  }).filter((label, i) => i < 31); 
};

export function HeatmapChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null); 

    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedWeek, setSelectedWeek] = useState(1); 

    const [openMonthPopover, setOpenMonthPopover] = useState(false); 
    const [openWeekPopover, setOpenWeekPopover] = useState(false);   

    const startDay = (selectedWeek - 1) * 7 + 1; 
    const yLabels = getFilteredYLabels(startDay); 
    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const scatterData = {
                    datasets: [{
                        label: 'Ausência de Funcionários',
                        data: data[selectedMonth].slice(startDay - 1, startDay - 1 + 7).map((value, columnIndex) => ({
                            x: selectedMonth,    
                            y: columnIndex,      
                            v: value            
                        })),
                        backgroundColor: function(context: any) {
                            const value = context.raw.v;
                            const alpha = value / 5; 
                            return `rgba(255, 99, 132, ${alpha})`;
                        },
                        pointRadius: function(context: any) {
                            const value = context.raw.v;
                            return Math.max(value * 2, 3); 
                        }
                    }]
                };

                const scatterOptions = {
                    scales: {
                        x: {
                            type: 'category', 
                            labels: [xLabels[selectedMonth]], 
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Mês Selecionado' 
                            }
                        },
                        y: {
                            type: 'category',
                            labels: yLabels, 
                            title: {
                                display: true,
                                text: 'Dias do Mês e Semana'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context: any) {
                                    return `Ausências: ${context.raw.v}`;
                                }
                            }
                        }
                    }
                };

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'scatter',
                    data: scatterData,
                });
            }
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [selectedMonth, selectedWeek]); 

    return (
        <div className="w-full h-full bg-white p-4 rounded-lg drop-shadow-md">
            <h2 className="text-center text-xl font-bold mb-4">Heatmap de Ausência de Funcionários - Ano</h2>

            <div className="mb-4 flex space-x-4">
                <Popover open={openMonthPopover} onOpenChange={setOpenMonthPopover}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-[150px] justify-center border-2 border-black bg-white"
                        >
                            {xLabels[selectedMonth]}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            className="w-full p-2 bg-white border rounded-lg"
                        >
                            {xLabels.map((month, index) => (
                                <option key={index} value={index}>{month}</option>
                            ))}
                        </select>
                    </PopoverContent>
                </Popover>

                <Popover open={openWeekPopover} onOpenChange={setOpenWeekPopover}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-[150px] justify-center border-2 border-black bg-white"
                        >
                            Semana {selectedWeek}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <select
                            value={selectedWeek}
                            onChange={(e) => setSelectedWeek(Number(e.target.value))}
                            className="w-full p-2 bg-white border rounded-lg"
                        >
                            <option value={1}>Semana 1</option>
                            <option value={2}>Semana 2</option>
                            <option value={3}>Semana 3</option>
                            <option value={4}>Semana 4</option>
                        </select>
                    </PopoverContent>
                </Popover>
            </div>

            <canvas ref={chartRef} width="400" height="200"></canvas>
        </div>
    );
}
