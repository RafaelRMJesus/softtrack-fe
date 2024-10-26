"use client";

import { Contrato, contratos, demandas } from "@/mocks/contracts";
import { GraficoDesvioEscopo } from "@/app/(admin)/_components/charts/grafico-desvio-escopo";
import { ModalContract } from "./modals/modal-contracts";
import {
    calcularCustoConsultores,
    calcularCustoGestao,
    calcularDesvioEscopo,
    calcularDesvioSLA,
    calcularLucroOperacional,
    calcularRentabilidade,
    calcularTotalHorasProjeto,
    converterHorasParaHorasMinutos,
} from "./actions/contracts_helper";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import React, { useState, useContext } from "react";
import { ContractContext } from "../_components/contexts/contract-context";
import { Card } from "@/components/ui/card";
import {
    GraficoChsmadosAbertosResolvidosSegmento,
} from "@/app/(admin)/_components/charts/grafico-chamados-abertos-resolvidos";
import { GraficoChamadosPorCategoria } from "@/app/(admin)/_components/charts/grafico-chamados-categoria";
import { GraficoConsultoresDisponiveisOverview } from "./charts/grafico-consultores-disponiveis-overview";
import { GraficoComparativoDemanda } from "./charts/grafico-comparativo-ferias-demanda";
import { GraficoCustoConsultoresChamados } from "./charts/grafico-custo-consultores-chamados";
import { GraficoBalancoChamadosConsultoresSegmento } from "./charts/grafico-balanco-chamados-consultores";
import { GraficoDemandasSenioridade } from "./charts/grafico-demandas-senioridade-overview";
import { GraficoOciosidadePie } from "./charts/grafico-ociosidade";
import { GraficoPrevisaoDemanda } from "./charts/grafico-previsao-demanda";
import { GraficoRetrabalho } from "./charts/grafico-rework";
import { GraficoConsultoresDisponiveisFuturo } from "./charts/grafico-consultores-disponiveis-futuro";
import { GraficoDemandasSenioridadeFuturo } from "./charts/grafico-demanda-senioridade-futura";
import { GraficoOciosidadePieFuturo } from "./charts/grafico-ociosidade-futuro";

export function ContractManagementPage() {
    const [selectedContract, setSelectedContract] = useState<Contrato | null>(
        contratos[0]
    );
    const [showModal, setShowModal] = useState(false);
    const [showFinancialData, setShowFinancialData] = useState(false);
    const [showHoursData, setShowHoursData] = useState(false);
    const [openCombobox, setOpenCombobox] = React.useState(false);
    const [viewType, setViewType] = useState<"present" | "future">("present");

    const { updateContract } = useContext(ContractContext);

    const toggleButtons = [
        {
            value: "financialData",
            label: "Dados Financeiros",
            state: showFinancialData,
            setState: setShowFinancialData,
        },
        {
            value: "hoursData",
            label: "Dados de Horas",
            state: showHoursData,
            setState: setShowHoursData,
        },
    ];

    return (
        <div className="w-full p-6">
            {/* Seletor de contrato */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-lg drop-shadow-md space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                    <p className="text-md text-muted-foreground">Selecione um Contrato:</p>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-[150px] justify-center border-2 border-black bg-white"
                            >
                                {selectedContract ? (
                                    <>{selectedContract.projeto}</>
                                ) : (
                                    <>+ Selecione um Contrato</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="p-0 border-2 border-black"
                            side="right"
                            align="start"
                        >
                            <Command>
                                <CommandInput placeholder="Procurar contrato..." />
                                <CommandList>
                                    <CommandEmpty>Nenhum contrato encontrado.</CommandEmpty>
                                    <CommandGroup>
                                        {contratos.map((contrato, index) => (
                                            <CommandItem
                                                key={index}
                                                value={contrato.projeto}
                                                onSelect={() => {
                                                    setSelectedContract(contrato);
                                                    updateContract(contrato);
                                                    setOpenCombobox(false);
                                                }}
                                            >
                                                <span>{contrato.projeto}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <Button variant="outline" onClick={() => setShowModal(true)}>
                    Ver Custo dos Consultores
                </Button>
            </div>

            {/* Detalhes do contrato */}
            {selectedContract && (
                <>
                    <div className="p-4 rounded-lg mb-6 drop-shadow-md bg-roxo">
                        <h1 className="text-2xl font-bold text-center mb-8 text-white">
                            Detalhes do Contrato
                        </h1>
                        <div className="flex flex-col md:flex-row items-center justify-around space-y-4 md:space-y-0">
                            <Card className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg">
                                <p className="font-bold">Nome do Contrato</p>
                                {selectedContract?.projeto}
                            </Card>
                            <Card className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg">
                                <p className="font-bold">Início do Contrato</p>
                                {selectedContract?.inicio_contrato}
                            </Card>
                            <Card className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg">
                                <p className="font-bold">Fim do Contrato</p>
                                {selectedContract?.fim_contrato}
                            </Card>
                            <Card className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg">
                                <p className="font-bold">Valor total do Contrato</p>
                                {selectedContract?.valor_contrato}
                            </Card>
                            <Card className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg">
                                <p className="font-bold">Valor total da Gestão</p>
                                {calcularCustoGestao(selectedContract).toFixed(2)}
                            </Card>
                        </div>
                    </div>

                    {/* Toggle de indicadores */}
                    <div className="w-full bg-white rounded-lg p-6 drop-shadow-md mb-6">
                        <h1 className="mb-4 font-bold text-2xl text-center -mt-2">Indicadores</h1>

                        <ToggleGroup size="lg" type="multiple" className="flex flex-col gap-4">
                            {toggleButtons.map((button, index) => (
                                <ToggleGroupItem
                                    key={index}
                                    value={button.value}
                                    aria-label={`Toggle ${button.label}`}
                                    onClick={() => button.setState(!button.state)}
                                    className={`py-2 px-4 text-center rounded-lg ${button.state
                                        ? "drop-shadow-md bg-roxo text-white"
                                        : "drop-shadow-md border bg-white"
                                        }`}
                                >
                                    {button.state
                                        ? `Ocultar ${button.label}`
                                        : `Mostrar ${button.label}`}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>

                    {/* Botões de alternância de visão */}
                    <div className="w-full bg-white rounded-lg p-6 drop-shadow-md mb-6">
                        <div className="flex flex-col justify-center space-y-4 mb-6">
                            <Button
                                variant={viewType === "present" ? "default" : "outline"}
                                className={`px-4 py-2 rounded-lg ${viewType === "present" ? "bg-roxo text-white" : ""
                                    }`}
                                onClick={() => setViewType("present")}
                            >
                                Visão do Presente
                            </Button>
                            <Button
                                variant={viewType === "future" ? "default" : "outline"}
                                className={`px-4 py-2 rounded-lg ${viewType === "future" ? "bg-roxo text-white" : ""
                                    }`}
                                onClick={() => setViewType("future")}
                            >
                                Visão de Análise Futura
                            </Button>
                        </div>
                    </div>

                    {/* Renderização Condicional com base na Visão */}
                    {viewType === "present" ? (
                        <div>
                            {/* Gráficos da visão presente */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                <GraficoDesvioEscopo
                                    nome="Desvio de Escopo"
                                    subtitle="Setembro - 2024"
                                    valor={calcularDesvioEscopo(
                                        calcularTotalHorasProjeto(demandas, selectedContract.projeto),
                                        contratos[contratos.indexOf(selectedContract)].baseline
                                    )}
                                    labelFinal={`Escopo excedido em ${calcularDesvioEscopo(
                                        calcularTotalHorasProjeto(demandas, selectedContract.projeto),
                                        contratos[contratos.indexOf(selectedContract)].baseline
                                    ).toFixed(2)}% devido ao uso de mais horas do que o planejado.`}
                                />
                                <GraficoDesvioEscopo
                                    nome="Rentabilidade do Projeto"
                                    subtitle="Setembro - 2024"
                                    valor={calcularRentabilidade(selectedContract)}
                                    labelFinal={`A rentabilidade do projeto é de ${calcularRentabilidade(
                                        selectedContract
                                    )}%. Este valor reflete a diferença entre os custos totais dos consultores e o valor do contrato.`}
                                />
                                <GraficoDesvioEscopo
                                    nome="Desvio de SLA"
                                    subtitle="Setembro - 2024"
                                    valor={calcularDesvioSLA(demandas, contratos.indexOf(selectedContract))}
                                    labelFinal={`${calcularDesvioSLA(
                                        demandas,
                                        contratos.indexOf(selectedContract)
                                    )}% dos chamados ultrapassaram o prazo do SLA.`}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                <GraficoChsmadosAbertosResolvidosSegmento />
                                <GraficoChamadosPorCategoria
                                    nome={"Grafico Chamados Por Categoria"}
                                    subtitle={"Setembro - 2024"}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                <GraficoConsultoresDisponiveisOverview
                                    disponiveis={"1200"}
                                    ausentes={"100"}
                                />
                                <GraficoComparativoDemanda />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                <GraficoCustoConsultoresChamados />
                                <GraficoRetrabalho />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                <GraficoDemandasSenioridade />
                                <GraficoBalancoChamadosConsultoresSegmento />
                                <GraficoOciosidadePie />
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Gráficos da visão futura */}
                            <div className="grid grid-cols-1 gap-6 mb-6">
                                <GraficoPrevisaoDemanda />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                <GraficoConsultoresDisponiveisFuturo
                                    disponiveisFuturo={"18"}
                                    ausentesFuturo={"32"}
                                />
                                <GraficoDemandasSenioridadeFuturo />
                                <GraficoOciosidadePieFuturo />
                            </div>
                        </div>
                    )}

                    <ModalContract
                        show={showModal}
                        onClose={() => setShowModal(false)}
                        selectedContract={selectedContract}
                    />
                </>
            )}
        </div>
    );
}
