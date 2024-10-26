"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {
    ChevronsLeft,
    ChevronsRight,
    Home,
    Newspaper,
    Paperclip, Users,
    User, Settings, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface NavigationProps {
    className?: string;
}

export const AdminNavigation = ({className}: NavigationProps) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const routes = [
        {
            name: "Visão Geral",
            path: "/admin",
            icon: <Home className="h-6 w-6"/>,
        },

        {
            name: "Contratos",
            path: "/admin/contratos",
            icon: <Paperclip/>
        },
        {
            name: "Equipes",
            path: "/admin/equipes",
            icon: <Users/>
        },
        {
            name: "Demandas",
            path: "/admin/demandas",
            icon: <Newspaper/>
        },
        {
            name: "Consultores",
            path: "/admin/consultores",
            icon: <User/>
        },
    ];

    const currentPath = usePathname();

    return (
        <div
            className={`hidden border-r bg-muted/40 md:block ${className} ${
                isExpanded ? "w-62" : "w-20"
            } transition-all duration-300`}
        >
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-6 lg:h-[60px] justify-between">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        {isExpanded && <span className="text-3xl">SoftTrack</span>}
                    </Link>
                    <Button
                        variant={"secondary"}
                        size={"icon"}
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? <ChevronsLeft/> : <ChevronsRight/>}
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 lg:mt-6">
                        {routes.map((route) => (
                            <Link
                                key={route.name}
                                href={route.path}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all mt-1 ${
                                    currentPath === route.path
                                        ? "bg-roxo text-white shadow-2xl"
                                        : "hover:text-black hover:bg-muted-foreground/30"
                                }`}
                            >
                                {route.icon}
                                {isExpanded && route.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                {isExpanded && (
                    <div className={"p-3"}>
                        <div
                            className={"w-full h-44 bg-white drop-shadow-lg border px-3 rounded-lg flex flex-col items-center"}>
                            <div className={"flex flex-col p-3"}>
                                <h1 className={"text-3xl font-bold"}>Evoluções <br/> Softtrack</h1>
                                <p>Descubra o que vem por aí!</p>
                            </div>
                            <div className={""}>
                                <Link href={"/admin/blog"}>
                                    <Button className={" flex gap-x-2 "}>
                                        Novidades Softtrack <ArrowUpRight/>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
