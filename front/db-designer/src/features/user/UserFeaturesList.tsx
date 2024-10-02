import { observer } from "mobx-react-lite";

import {
    DeleteSvg,
    LiButton,
    LiButtonsHorizontalList,
    ResetPasswordSvg,
} from "@/shared/ui";
import { UserModel } from "@/entities";


export const UserFeaturesList = observer(({ userModel }: { userModel: UserModel }) => {
    return (
        <LiButtonsHorizontalList>
            <LiButton to="/delete-profile">
                <DeleteSvg />
            </LiButton>
            <LiButton to="/" onClick={() => userModel.resetPassword()}>
                <ResetPasswordSvg />
            </LiButton>
        </LiButtonsHorizontalList>
    )
})