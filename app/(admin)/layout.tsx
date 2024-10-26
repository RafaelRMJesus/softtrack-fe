"use client";

import React, {useEffect, useState} from "react";
import {AdminHeader} from "@/app/(admin)/_components/admin-header";
import {AdminNavigation} from "@/app/(admin)/_components/admin-navigation";
import {AdminNavigationMobile} from "@/app/(admin)/_components/admin-navigation-mobile";
import {UserBox} from "@/components/user-box";

const AdminLayout = ({children}: { children: React.ReactNode }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col md:flex-row">
            {isMobile ? (
                <>
                    <div className="flex items-center justify-around">
                        <AdminNavigationMobile/>
                        <UserBox />
                    </div>

                    <main className="flex-1 overflow-y-auto">{children}</main>
                </>

            ) : (
                <>
                    <AdminNavigation className="w-full md:w-auto"/>
                    <div className="flex flex-1 flex-col overflow-x-hidden">
                        <AdminHeader/>
                        <main className="flex-1 overflow-y-auto">{children}</main>
                    </div>
                </>
            )}

        </div>
    )
        ;
};

export default AdminLayout;
