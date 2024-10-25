"use client";

import {demandas, Equipe, equipes} from "@/mocks/contracts";

import {GraficoDesvioEscopo} from "@/app/(admin)/_components/charts/grafico-desvio-escopo";
import {GraficoPrevisaoDemanda} from "@/app/(admin)/_components/charts/grafico-previsao-demanda";

import {Button} from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import React, {useState, useContext} from 'react';
import {Card} from "@/components/ui/card";
import {
    GraficoBalancoChamadosConsultoresSegmento
} from "@/app/(admin)/_components/charts/grafico-balanco-chamados-consultores";
import {
    GraficoChsmadosAbertosResolvidosSegmento
} from "@/app/(admin)/_components/charts/grafico-chamados-abertos-resolvidos";
import {GraficoChamadosPorCategoria} from "@/app/(admin)/_components/charts/grafico-chamados-categoria";
import {GraficoComparativoDemanda} from "@/app/(admin)/_components/charts/grafico-comparativo-ferias-demanda";
import {
    GraficoConsultoresDisponiveisOverview
} from "@/app/(admin)/_components/charts/grafico-consultores-disponiveis-overview";
import {GraficoCustoConsultoresChamados} from "@/app/(admin)/_components/charts/grafico-custo-consultores-chamados";
import {GraficoDemandasSenioridade} from "@/app/(admin)/_components/charts/grafico-demandas-senioridade-overview";
import {GraficoOciosidadePie} from "@/app/(admin)/_components/charts/grafico-ociosidade";
import {GraficoRetrabalho} from "@/app/(admin)/_components/charts/grafico-rework";

export default function EquipeManagementPage() {
    const [selectedEquipe, setSelectedEquipe] = useState<Equipe | null>(equipes[0]);
    const [showModal, setShowModal] = useState(false);
    const [openCombobox, setOpenCombobox] = React.useState(false);

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="w-full p-6">

            <div className="mb-6 flex justify-between items-center bg-white p-6 rounded-lg drop-shadow-md">
                <div className="flex items-center space-x-4 ">
                    <p className="text-md text-muted-foreground">Selecione um Contrato:</p>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-[150px] justify-center border-2 border-black bg-white"
                            >
                                {selectedEquipe ? (
                                    <>
                                        {selectedEquipe.nome}
                                    </>
                                ) : (
                                    <>+ Selecione um Contrato</>
                                )}
                            </Button>
                        </PopoverTrigger>
                    </Popover>
                </div>
                <Button variant="outline" onClick={() => setShowModal(true)}>
                    Ver Custo dos Consultores
                </Button>
            </div>

            {selectedEquipe && (
                <>
                    <div className="p-4 rounded-lg mb-6 drop-shadow-md bg-roxo">
                        <h1 className="text-2xl font-bold text-center mb-8 text-white">Detalhes do Contrato</h1>
                        <div className="flex items-center space-x-4 w-full justify-around">
                            <Card
                                className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg hover:border-none hover:drop-shadow-none transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Nome do Contrato</p> {selectedEquipe?.nome}</Card>
                            <Card
                                className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg hover:border-none hover:drop-shadow-none transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Início do Contrato</p> {selectedEquipe?.id}
                            </Card>
                            <Card
                                className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg hover:border-none hover:drop-shadow-none transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Líder</p> teste
                            </Card>
                            <Card
                                className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg hover:border-none hover:drop-shadow-none transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Valor total do Contrato</p> teste
                            </Card>
                        </div>
                    </div>

                    {/* Charts */
                }
                    <div className="grid grid-cols-2 gap-6 mb-6">

                        <GraficoChsmadosAbertosResolvidosSegmento/>
                        <GraficoChamadosPorCategoria nome={"Grafico Chamados Por Categoria"}
                                                     subtitle={"Setembro - 2024"}/>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <GraficoConsultoresDisponiveisOverview disponiveis={"1200"} ausentes={"100"}/>
                        <div className={"col-span-2"}>
                            <GraficoComparativoDemanda/>
                        </div>
                    </div>
                    <div className={"mb-6"}><GraficoCustoConsultoresChamados/></div>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <GraficoDemandasSenioridade/>
                        <GraficoBalancoChamadosConsultoresSegmento/>
                        <GraficoOciosidadePie/>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div className={"col-span-2"}>
                            <GraficoPrevisaoDemanda/>
                        </div>
                        <GraficoRetrabalho/>
                    </div>

                </>
            )}
        </div>
    );
}