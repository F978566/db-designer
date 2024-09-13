import { DeleteSvg, LiButton, LiButtonsHorizontalList } from "@/shared/ui"

export const UserFeaturesList = () => {
    return (
        <LiButtonsHorizontalList>
            <LiButton to="/delete-profile">
                <DeleteSvg />
            </LiButton>
        </LiButtonsHorizontalList>
    )
}