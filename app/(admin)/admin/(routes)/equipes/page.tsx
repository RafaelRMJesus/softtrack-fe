"use client";

import {Equipe, equipes} from "@/mocks/contracts";

import {Button} from "@/components/ui/button"

import {
    Popover,
    PopoverTrigger,
} from "@/components/ui/popover"

import React, {useState} from 'react';
import {Card} from "@/components/ui/card";
import { HeatmapChart } from "@/app/(admin)/_components/charts/grafico-calor";
import { GraficoBalancoSenioridadeEquipes } from "@/app/(admin)/_components/charts/grafico-balanco-senioridade-equipes";
import { SimularFerias } from "@/app/(admin)/_components/charts/simular-ferias";
import { GraficoDiasCriticos } from "@/app/(admin)/_components/charts/grafico-calculo-diacritico";

export default function EquipeManagementPage() {
    const [selectedEquipe, setSelectedEquipe] = useState<Equipe | null>(equipes[0]);
    const [openCombobox, setOpenCombobox] = React.useState(false);

    return (
        <div className="w-full p-6">

            <div className="mb-6 flex justify-between items-center bg-white p-6 rounded-lg drop-shadow-md">
                <div className="flex items-center space-x-4">
                    <p className="text-md text-muted-foreground">Selecione uma Equipe</p>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-[150px] justify-center border-2 border-black bg-white"
                            >
                                {selectedEquipe ? (
                                    <>{selectedEquipe.nome}</>
                                ) : (
                                    <>+ Selecione uma Equipe</>
                                )}
                            </Button>
                        </PopoverTrigger>
                    </Popover>
                </div>
            </div>

            {selectedEquipe && (
                <>
                    <div className="p-4 rounded-lg mb-6 drop-shadow-md bg-roxo">
                        <h1 className="text-2xl font-bold text-center mb-8 text-white">Detalhes da Equipe</h1>
                        <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row items-center space-y-4 md:space-x-4 w-full justify-around">
                            <Card className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Nome da Equipe</p> {selectedEquipe?.nome}
                            </Card>
                            <Card className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">ID da Equipe</p> {selectedEquipe?.id}
                            </Card>
                            <Card className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Líder</p> Edi
                            </Card>
                            <Card className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Quantidade de Integrantes</p> 24
                            </Card>
                        </div>
                    </div>

                    {/* Charts */
                }
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <HeatmapChart/>
                        <GraficoBalancoSenioridadeEquipes/>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <SimularFerias/>
                        <GraficoDiasCriticos/>
                    </div>
                </>
            )}
        </div>
    );
}
