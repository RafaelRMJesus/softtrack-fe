import {CloudSVG, LinesSVG} from '@/svgs/svgs';
import {
    ChartLine,
    ChevronRightIcon,
    Cog,
    Lightbulb,
    User,
} from "lucide-react";
import Link from "next/link";
import {Heading} from "../heading";

const visionData = [
    {
        title: "Inovação Contínua",
        desc: "Desenvolvemos soluções que antecipam e moldam o futuro digital.",
        icon: <Lightbulb/>,
        color: "#5623E2",
    },
    {
        title: "Eficiência Operacional",
        desc: "Maximizamos a produtividade com automação e tecnologia de ponta.",
        icon: <Cog/>,
        color: "#00CEBE",
    },
    {
        title: "Experiência do Usuário",
        desc: "Criamos interfaces intuitivas que se adaptam às necessidades individuais.",
        icon: <User/>,
        color: "#5623E2",
    },
    {
        title: "Decisão Baseada em Dados",
        desc: "Capacitamos decisões estratégicas com insights precisos em tempo real.",
        icon: <ChartLine/>,
        color: "#00CEBE",
    },
];

export const VisionSection = () => {
    return (
        <>
            <div className="py-12 lg:py-24 relative container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                        {visionData.map((vision, index) => (
                            <a
                                className="group flex flex-col justify-center p-5 border-2 border-black bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 translate-x-[-4px] translate-y-[-4px] rounded-md shadow-[4px_4px_0px_black] hover:translate-x-[0px] hover:translate-y-[0px] hover:shadow-none"
                                href={""}
                                key={index}
                            >
                                <div
                                    className="flex justify-center items-center w-12 h-12 border rounded-lg"
                                    style={{backgroundColor: vision.color}}
                                >
                                    <div className="flex-shrink-0 w-6 h-6 text-primary-foreground">
                                        {vision.icon}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">{vision.title}</h3>
                                    <p className="mt-1 text-muted-foreground">{vision.desc}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="lg:w-3/4">
                        <Heading
                            title="Conheça Nossa Visão"
                            badge="Visão SoftTrack"
                            classNameBadge="flex justify-center md:justify-start "
                            classNameTitle="text-center md:text-start"
                            id="visao"
                        />
                        <p className="mt-3 text-base md:text-lg text-muted-foreground">
                            Na Softtrack, somos especialistas em desenvolver soluções que
                            alavancam a tecnologia para resolver desafios complexos de gestão.
                            Nossa missão é capacitar empresas com ferramentas inovadoras que
                            aumentam a eficiência operacional e maximizam resultados.
                        </p>
                        <p className="mt-5">
                            <Link
                                className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4 text-sm md:text-base"
                                href="/about"
                            >
                                Conheça o coração do nosso projeto
                                <ChevronRightIcon
                                    className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1"/>
                            </Link>
                        </p>
                    </div>
                </div>
                <div
                    className="absolute transform rotate-12 z-10 hidden lg:block"
                    style={{top: "70%", left: "84%"}}
                >
                    <CloudSVG/>
                </div>
                <div
                    className="absolute transform rotate-12 z-10 hidden xl:block"
                    style={{top: "60%", left: "-30%"}}
                >
                    <LinesSVG/>
                </div>
            </div>
        </>
    );
};
