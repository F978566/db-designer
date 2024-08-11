import { Outlet } from "react-router-dom";

import { user } from "@/entities";
import { Navbar } from "@/widgets";


export const Layout = () => {
    user.checkAuth();

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}