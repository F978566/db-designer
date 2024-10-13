import { Outlet } from "react-router-dom";

import { userModel } from "@/entities";
import { Navbar } from "@/widgets";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";


export const Layout = observer(() => {
    useEffect(() => {
        userModel.checkAuth();
    }, [])
    
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
})