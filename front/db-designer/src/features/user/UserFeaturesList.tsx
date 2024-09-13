import {
    DeleteSvg,
    LiButton,
    LiButtonsHorizontalList,
    ResetPasswordSvg,
} from "@/shared/ui";

export const UserFeaturesList = () => {
    return (
        <LiButtonsHorizontalList>
            <LiButton to="/delete-profile">
                <DeleteSvg />
            </LiButton>
            <LiButton to="/reset-password">
                <ResetPasswordSvg />
            </LiButton>
        </LiButtonsHorizontalList>
    )
}