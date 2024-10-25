"use client";

import {Contrato, contratos, demandas} from "@/mocks/contracts";

import {GraficoDesvioEscopo} from "@/app/(admin)/_components/charts/grafico-desvio-escopo";
import {GraficoPrevisaoDemanda} from "./charts/grafico-previsao-demanda";
import {ModalContract} from "./modals/modal-contracts";
import {
    calcularCustoConsultores,
    calcularCustoGestao,
    calcularDesvioEscopo,
    calcularDesvioSLA,
    calcularLucroOperacional,
    calcularRentabilidade,
    calcularTotalHorasProjeto,
    calculateUtilizationRate,
    converterHorasParaHorasMinutos
} from "./actions/contracts_helper";

import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"


import React, {useState, useContext} from 'react';
import {ContractContext} from '../_components/contexts/contract-context';
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

export function ContractManagementPage() {
    const [selectedContract, setSelectedContract] = useState<Contrato | null>(contratos[0]);
    const [showModal, setShowModal] = useState(false);
    const [showFinancialData, setShowFinancialData] = useState(false);
    const [showHoursData, setShowHoursData] = useState(false);
    const [openCombobox, setOpenCombobox] = React.useState(false);

    const {updateContract} = useContext(ContractContext);

    const toggleButtons = [
        {
            value: 'financialData',
            label: 'Dados Financeiros',
            state: showFinancialData,
            setState: setShowFinancialData,
        },
        {
            value: 'hoursData',
            label: 'Dados de Horas',
            state: showHoursData,
            setState: setShowHoursData,
        },
    ];

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
                                {selectedContract ? (
                                    <>
                                        {selectedContract.projeto}
                                    </>
                                ) : (
                                    <>+ Selecione um Contrato</>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 border-2 border-black" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Procurar contrato..."/>
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

            {selectedContract && (
                <>
                    <div className="p-4 rounded-lg mb-6 drop-shadow-md bg-roxo">
                        <h1 className="text-2xl font-bold text-center mb-8 text-white">Detalhes do Contrato</h1>
                        <div className="flex items-center space-x-4 w-full justify-around">
                            <Card
                                className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg hover:border-none hover:drop-shadow-none transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Nome do Contrato</p> {selectedContract?.projeto}</Card>
                            <Card
                                className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg hover:border-none hover:drop-shadow-none transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Início do Contrato</p> {selectedContract?.inicio_contrato}
                            </Card>
                            <Card
                                className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg hover:border-none hover:drop-shadow-none transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Fim do Contrato</p> {selectedContract?.fim_contrato}</Card>
                            <Card
                                className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg hover:border-none hover:drop-shadow-none transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Valor total do Contrato</p> {selectedContract?.valor_contrato}
                            </Card>
                            <Card
                                className="text-lg h-40 w-60 flex flex-col items-center justify-center text-center border-none drop-shadow-md rounded-lg hover:border-none hover:drop-shadow-none transition-all duration-300 hover:shadow-2xl">
                                <p className="font-bold">Valor total da
                                    Gestão</p>{calcularCustoGestao(selectedContract).toFixed(2)}
                            </Card>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-lg p-6 drop-shadow-md mb-6">
                        <h1 className="mb-4 font-bold text-2xl text-center -mt-2">Indicadores</h1>
                        <ToggleGroup size="lg" type="multiple" className={"gap-2"}>
                            {toggleButtons.map((button, index) => (
                                <ToggleGroupItem
                                    key={index}
                                    value={button.value}
                                    aria-label={`Toggle ${button.label}`}
                                    onClick={() => button.setState(!button.state)}
                                    className={`${button.state ? 'drop-shadow-md !bg-roxo !text-white' : 'drop-shadow-md border'}`}
                                >
                                    {button.state ? `Ocultar ${button.label}` : `Mostrar ${button.label}`}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>

                    {
                        showFinancialData && (
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <div className="p-4 bg-white rounded-lg text-center drop-shadow-md">
                                    <p className="text-xl font-bold">Lucro Operacional</p>
                                    <p className="text-3xl">
                                        R$ {calcularLucroOperacional(selectedContract).toFixed(2)}
                                    </p>
                                    <p className="text-sm text-red-500">
                                        {calcularLucroOperacional(selectedContract) === 0
                                            ? "Sem lucro"
                                            : "Lucro obtido"}
                                    </p>
                                </div>

                                <div className="p-4 bg-white rounded-lg text-center drop-shadow-md">
                                    <p className="text-xl font-bold">Custo Consultores</p>
                                    <p className="text-3xl">
                                        R$ {calcularCustoConsultores(selectedContract).toFixed(2)}
                                    </p>
                                    <p className="text-sm text-red-500">70% do valor total</p>
                                </div>

                                <div className="p-4 bg-white rounded-lg text-center drop-shadow-md">
                                    <p className="text-xl font-bold">Utilização de Recursos</p>
                                    <p className="text-3xl">{calculateUtilizationRate(selectedContract)}%</p>
                                </div>
                            </div>
                        )
                    }

                    {
                        showHoursData && (
                            <div className="grid grid-cols-3 gap-6 mb-6">

                                <div className="p-4 bg-white rounded-lg text-center drop-shadow-md">
                                    <p className="text-xl font-bold">Horas Contratadas</p>
                                    <p className="text-3xl">
                                        {contratos[contratos.indexOf(selectedContract)].baseline} h
                                    </p>
                                </div>

                                <div className="p-4 bg-white rounded-lg text-center drop-shadow-md">
                                    <p className="text-xl font-bold">Desvio de Horas Contratadas</p>
                                    <p className="text-3xl">
                                        {converterHorasParaHorasMinutos(
                                            Math.max(
                                                0,
                                                calcularTotalHorasProjeto(demandas, selectedContract.projeto) -
                                                contratos[contratos.indexOf(selectedContract)].baseline
                                            )
                                        )}
                                    </p>
                                </div>

                                {/* Card de Horas Trabalhadas */}
                                <div className="p-4 bg-white rounded-lg text-center drop-shadow-md">
                                    <p className="text-xl font-bold">Horas Trabalhadas</p>
                                    <p className="text-3xl">
                                        {converterHorasParaHorasMinutos(
                                            calcularTotalHorasProjeto(demandas, selectedContract.projeto)
                                        )}
                                    </p>
                                </div>
                            </div>
                        )
                    }

                    {/* Charts */
                    }
                    <div className="grid grid-cols-3 gap-6 mb-6">
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
                            labelFinal={`A rentabilidade do projeto é de ${calcularRentabilidade(selectedContract)}%. Este valor reflete a diferença entre os custos totais dos consultores e o valor do contrato.`}
                        />
                        <GraficoDesvioEscopo
                            nome="Desvio de SLA"
                            subtitle="Setembro - 2024"
                            valor={calcularDesvioSLA(demandas, contratos.indexOf(selectedContract))}
                            labelFinal={`${calcularDesvioSLA(demandas, contratos.indexOf(selectedContract))}% dos chamados ultrapassaram o prazo do SLA devido à alta complexidade e falta de recursos.`}
                        />
                    </div>
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

                    <ModalContract show={showModal} onClose={() => setShowModal(false)}
                                   selectedContract={selectedContract}/>
                </>
            )}
        </div>
    );
}
