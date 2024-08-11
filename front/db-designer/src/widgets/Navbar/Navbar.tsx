import { observer } from "mobx-react-lite";

import { user } from "@/entities";
import { LiButton } from "@/shared/ui";
import {
    ProjectSVG,
    LoginSVG,
    ProfileSVG,
    HomeSVG,
    LogoutSVG,
} from "@/shared/ui";
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
                                <LiButton to="profile/">
                                    <ProfileSVG />
                                </LiButton>
                                <LiButton to="logout/">
                                    <LogoutSVG />
                                </LiButton>
                            </>
                            : <LiButton to="login/"><LoginSVG /></LiButton>
                    }
                </div>
            </div>
        </nav>
    )
})