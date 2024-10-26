"use client"

import React, { useState } from "react"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format, getMonth } from "date-fns"

type Ferias = {
  nome: string;
  senioridade: string;
  inicioFerias: string;
  fimFerias: string;
};

const feriasData: Ferias[] = [
  { nome: "Ali", senioridade: "Pr", inicioFerias: "2024-10-01", fimFerias: "2024-10-30" },
  { nome: "Ari", senioridade: "Sr", inicioFerias: "2024-10-05", fimFerias: "2024-11-15" },
  { nome: "Arl", senioridade: "Ex", inicioFerias: "2024-10-10", fimFerias: "2024-11-15" },
  { nome: "Ber", senioridade: "Sr", inicioFerias: "2024-10-15", fimFerias: "2024-11-15" }, 
  { nome: "Dan", senioridade: "Jr", inicioFerias: "2024-11-25", fimFerias: "2024-11-20" },
];

export const SimularFerias = () => {
  const [dates, setDates] = useState<[Date, Date] | null>(null);
  
  const [impact, setImpact] = useState<Ferias[] | null>(null);

  const simularImpacto = () => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      const ausentes = feriasData.filter(ferias => {
        const inicio = new Date(ferias.inicioFerias);
        const fim = new Date(ferias.fimFerias);
        return (
          (startDate <= fim && startDate >= inicio) || 
          (endDate <= fim && endDate >= inicio) || 
          (startDate <= inicio && endDate >= fim) 
        );
      });

      const ausentesDepoisDeOutubro = ausentes.filter(ausente => {
        const mesInicioFerias = getMonth(new Date(ausente.inicioFerias)) + 1; 
        return mesInicioFerias >= 10;
      });

      setImpact(ausentesDepoisDeOutubro);
    } else {
      setImpact(null);
    }
  };

  const calcularImpactoPorSenioridade = () => {
    if (impact) {
      const impactoSenioridade = {
        Sr: impact.filter(f => f.senioridade === 'Sr').length,
        Pr: impact.filter(f => f.senioridade === 'Pr').length,
        Jr: impact.filter(f => f.senioridade === 'Jr').length,
        Ex: impact.filter(f => f.senioridade === 'Ex').length,
      };
      return impactoSenioridade;
    }
    return null;
  };

  const impactoSenioridade = calcularImpactoPorSenioridade();

  return (
    <div className="p-6 bg-white rounded-lg drop-shadow-md">
      <h2 className="text-center text-xl font-bold mb-4">Simular Férias e Impactos</h2>

      <div className="flex justify-center items-center mb-4">
        <Calendar
          selectRange={true} 
          onChange={(value) => setDates(value as [Date, Date])} 
          value={dates} 
          className="border-2 rounded-md shadow-md"
        />
      </div>

      <Button variant="outline" onClick={simularImpacto} className="w-full justify-center">
        Simular Impacto
      </Button>

      {impact && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Resultados da Simulação (Férias a partir de Outubro)</h3>
          {impact.length > 0 ? (
            <div>
              <p>{impact.length} pessoas estarão ausentes nesse período:</p>
              <ul>
                {impact.map((ausente) => (
                  <li key={ausente.nome}>
                    {ausente.nome} ({ausente.senioridade}) - Férias de {format(new Date(ausente.inicioFerias), "dd/MM/yyyy")} até {format(new Date(ausente.fimFerias), "dd/MM/yyyy")}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <h4 className="text-md font-semibold">Impacto por Senioridade:</h4>
                <p>Senior: {impactoSenioridade?.Sr} pessoas</p>
                <p>Pleno: {impactoSenioridade?.Pr} pessoas</p>
                <p>Júnior: {impactoSenioridade?.Jr} pessoas</p>
                <p>Expert: {impactoSenioridade?.Ex} pessoas</p>
              </div>
            </div>
          ) : (
            <p>Nenhuma pessoa estará ausente nesse período.</p>
          )}
        </div>
      )}
    </div>
  )
}
