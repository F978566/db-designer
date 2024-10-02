import { Outlet } from "react-router-dom";

import { userModel } from "@/entities";
import { Navbar } from "@/widgets";
import { observer } from "mobx-react-lite";


export const Layout = observer(() => {
    userModel.checkAuth();

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
})