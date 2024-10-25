"use client";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

import {Contrato} from "@/mocks/contracts";


interface ModalProps {
    show: boolean;
    onClose: () => void;
    selectedContract: Contrato;
}

export const ModalContract: React.FC<ModalProps> = ({show, onClose, selectedContract}) => {
    if (!show) return null;

    const calcularCustoIndividual = (
        cargo: string,
        horas: number,
        percentual: number,
        custo: string
    ) => {
        const total =
            (percentual / 100) * horas * parseFloat(custo.replace("R$", "").replace(",", "."));
        return total.toFixed(2);
    };

    const consultores = [
        {nome: "Expert", data: selectedContract.expert},
        {nome: "Senior", data: selectedContract.senior},
        {nome: "Pleno", data: selectedContract.pleno},
        {nome: "Junior", data: selectedContract.junior},
        {nome: "Estagiario", data: selectedContract.estagiario},
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Custo dos Consultores</h2>

                {consultores.map((consultor, index) => (
                    <Card key={index} className={"p-4 m-2 drop-shadow-md"}>
                        <p className="text-lg font-medium">{consultor.nome}</p>
                        <p>Custo por Hora: R$ {consultor.data.custo_venda}</p>
                        <p>
                            Custo Total: R${" "}
                            {calcularCustoIndividual(
                                consultor.nome,
                                selectedContract.baseline,
                                parseFloat(consultor.data.percentual.replace("%", "")),
                                consultor.data.custo_venda
                            )}
                        </p>
                    </Card>
                ))}
                <div className={"w-full flex justify-end"}>
                    <Button onClick={onClose} className="mt-6">
                        Fechar
                    </Button>
                </div>
            </div>
        </div>
    );
};