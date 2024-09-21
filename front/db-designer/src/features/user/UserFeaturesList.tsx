import { observer } from "mobx-react-lite";

import {
    DeleteSvg,
    LiButton,
    LiButtonsHorizontalList,
    ResetPasswordSvg,
} from "@/shared/ui";
import { User } from "@/entities";


export const UserFeaturesList = observer(({ user }: { user: User }) => {
    return (
        <LiButtonsHorizontalList>
            <LiButton to="/delete-profile">
                <DeleteSvg />
            </LiButton>
            <LiButton to="/" onClick={() => user.resetPassword()}>
                <ResetPasswordSvg />
            </LiButton>
        </LiButtonsHorizontalList>
    )
})