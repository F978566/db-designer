import { observer } from "mobx-react-lite";

import { LiButton } from "@/shared/ui";
import {
    ProfileSVG,
    LogoutSVG,
} from "@/shared/ui";
import { userModel } from "@/entities";


export const AuthorizedButtonSet = observer(() => {
    return (
        <>
            <LiButton to="profile/">
                <ProfileSVG />
            </LiButton>
            <LiButton to="login/">
                <LogoutSVG onClick={() => userModel.logout()} />
            </LiButton>
        </>
    )
})