import {useEffect, useState} from "react";
import "./style.css";
import {createSwapy} from "swapy";
import {Button} from "@/components/ui/button";
import {ArrowDown, Lock, LockOpen} from "lucide-react";
import {GraficoBalancoChamadosConsultoresSegmento} from "@/app/(admin)/_components/charts/grafico-balanco-chamados-consultores";
import {GraficoChsmadosAbertosResolvidosSegmento} from "@/app/(admin)/_components/charts/grafico-chamados-abertos-resolvidos";
import {GraficoCustoConsultoresChamados} from "@/app/(admin)/_components/charts/grafico-custo-consultores-chamados";
import {GraficoConsultoresDisponiveisOverview} from "@/app/(admin)/_components/charts/grafico-consultores-disponiveis-overview";

const DEFAULT = {
    "1": "a",
    "3": "c",
    "4": "d",
    "5": "e",
    "2": null,
};

function A() {
    return (
        <div data-swapy-item="a">
            <GraficoCustoConsultoresChamados/>
        </div>
    );
}

function C() {
    return (
        <div data-swapy-item="c">
            <GraficoBalancoChamadosConsultoresSegmento/>
        </div>
    );
}

function D() {
    return (
        <div data-swapy-item="d">
            <GraficoChsmadosAbertosResolvidosSegmento/>
        </div>
    );
}

function Placeholder() {
    return (
        <div
            className="space-y-6 text-white font-bold text-2xl w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-roxo rounded-xl"
            data-swapy-item="b">
            Você pode mover os gráficos
            <ArrowDown width={40} height={40}/>
        </div>
    );
}

function E() {
    return (
        <div data-swapy-item="e">
            <GraficoConsultoresDisponiveisOverview disponiveis={"1590"} ausentes={"60"}/>
        </div>
    );
}

function getItemById(itemId: "a" | "c" | "d" | "e" | null) {
    switch (itemId) {
        case "a":
            return <A/>;
        case "c":
            return <C/>;
        case "d":
            return <D/>;
        case "e":
            return <E/>;
        case null:
            return <Placeholder />;
    }
}

export function OverviewDashboard() {
    const slotItems: Record<string, "a" | "c" | "d" | "e" | null> =
        localStorage.getItem("slotItem")
            ? JSON.parse(localStorage.getItem("slotItem")!)
            : DEFAULT;

    const [swapyInstance, setSwapyInstance] = useState<any>(null);
    const [isSwapyEnabled, setIsSwapyEnabled] = useState(true);

    useEffect(() => {
        const container = document.querySelector(".teste")!;
        const swapy = createSwapy(container, {animation: "spring"});
        swapy.onSwap(({data}) => {
            localStorage.setItem("slotItem", JSON.stringify(data.object));
        });
        setSwapyInstance(swapy);
    }, []);

    const toggleSwapy = () => {
        if (swapyInstance) {
            swapyInstance.enable(!isSwapyEnabled);
            setIsSwapyEnabled(!isSwapyEnabled);
        }
    };

    return (
        <div className="relative">
            <div className="teste">
                <div className="slot a" data-swapy-slot="1">
                    {getItemById(slotItems["1"])}
                </div>
                <div className="grid grid-cols-3">
                    <div className="slot c" data-swapy-slot="3">
                        {getItemById(slotItems["3"])}
                    </div>
                    <div className="slot b" data-swapy-slot="2">
                        {getItemById(slotItems["2"])}
                    </div>
                    <div className="slot d" data-swapy-slot="4">
                        {getItemById(slotItems["4"])}
                    </div>
                </div>
                <div className="slot e" data-swapy-slot="5">
                    {getItemById(slotItems["5"])}
                </div>
            </div>
            <Button
                className="fixed bottom-2 right-2 z-50"
                onClick={toggleSwapy}
            >
                {isSwapyEnabled ? <LockOpen/> : <Lock/>}
            </Button>
        </div>
    );
}