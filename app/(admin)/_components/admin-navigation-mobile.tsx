import React, { useState } from "react";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose
} from "@/components/ui/drawer";
import {
    Home,
    Newspaper,
    Paperclip,
    Users,
    User,
    Settings,
    ArrowLeft, Map
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import Link from "next/link";

export const AdminNavigationMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const routes = [
        {
            name: "Visão Geral",
            path: "/admin",
            icon: <Home className="h-6 w-6" />,
        },
        {
            name: "Contratos",
            path: "/admin/contratos",
            icon: <Paperclip className="h-6 w-6" />,
        },
        {
            name: "Equipes",
            path: "/admin/equipes",
            icon: <Users className="h-6 w-6" />,
        },
        {
            name: "Demandas",
            path: "/admin/demandas",
            icon: <Newspaper className="h-6 w-6" />,
        },
        {
            name: "Consultores",
            path: "/admin/consultores",
            icon: <User className="h-6 w-6" />,
        },
        {
            name: "Roadmap de Evoluções",
            path: "/admin/blog",
            icon: <Map className="h-6 w-6" />,
        },
        {
            name: "Landing Page",
            path: "/",
            icon: <ArrowLeft className="h-6 w-6" />,
        },
    ];

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger>
                <Button className="m-4" onClick={() => setIsOpen(true)}>
                    <AlignJustify />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Navegação</DrawerTitle>
                    <DrawerDescription>Selecione uma página para navegar</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                    {routes.map((route) => (
                        <Link
                            key={route.path}
                            href={route.path}
                            className="flex items-center space-x-2 text-roxo hover:bg-gray-100 p-2 rounded-md"
                            onClick={() => setIsOpen(false)} // Close drawer on click
                        >
                            {route.icon}
                            <span>{route.name}</span>
                        </Link>
                    ))}
                </div>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Fechar
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
