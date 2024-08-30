import { observer } from "mobx-react-lite";

import { user } from "@/entities";
import { LiButton } from "@/shared/ui";
import {
    ProjectSVG,
    HomeSVG,
} from "@/shared/ui";
import { AuthorizedButtonSet, UnauthorizedButtonSet } from "./UserButtonSet";
import "./navbar.scss";


export const Navbar = observer(() => {
    return (
        <nav className="sidebar">
            <div className="sidebar__wrapper">
                <div className="sidebar__links">
                    <LiButton to="/">
                        <HomeSVG />
                    </LiButton>
                    <LiButton to="#">
                        <ProjectSVG />
                    </LiButton>
                    {
                        user?.isAuth
                            ?
                            <>
                                <AuthorizedButtonSet />
                            </>
                            : <UnauthorizedButtonSet />
                    }
                </div>
            </div>
        </nav>
    )
})