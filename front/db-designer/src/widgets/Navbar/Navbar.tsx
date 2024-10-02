import { observer } from "mobx-react-lite";

import { userModel, UserStatus } from "@/entities";
import { LiButton } from "@/shared/ui";
import {
    ProjectSVG,
    HomeSVG,
} from "@/shared/ui";
import { AuthorizedButtonSet } from "./UserButtonSet/AuthorizedButtonSet";
import { UnauthorizedButtonSet } from "./UserButtonSet/UnauthorizedButtonSet";
import "./navbar.scss";


export const Navbar = observer(() => {
    return (
        <nav className="sidebar">
            <div className="sidebar__wrapper">
                <div className="sidebar__links">
                    <LiButton to="/">
                        <HomeSVG />
                    </LiButton>
                    <LiButton to="/projects">
                        <ProjectSVG />
                    </LiButton>
                    {
                        userModel?.status === UserStatus.LOGIN
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