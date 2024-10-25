"use client";

import React, {useEffect, useState} from "react";
import {OverviewDashboard} from "@/app/(admin)/_components/overview-dashboard";
import {useUser} from "@clerk/nextjs";
import {UserBox} from "@/components/user-box";

const AdminPage = () => {

    const {user} = useUser()

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-4 sm:p-6 w-full">
                <div className={"p-6 flex items-center justify-between"}>
                    <div>
                        {user && (
                            <h1 className={"text-2xl font-bold"}>Olá {user.fullName}, bem-vindo de volta 👋</h1>
                        )}
                    </div>
                    <UserBox/>
                </div>
                <OverviewDashboard/>
            </div>
        </div>
    );
};

export default AdminPage;