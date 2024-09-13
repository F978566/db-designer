import { Outlet } from "react-router-dom";

import { user } from "@/entities";
import { Navbar } from "@/widgets";
import { observer } from "mobx-react-lite";


export const Layout = observer(() => {
    user.checkAuth();

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
})