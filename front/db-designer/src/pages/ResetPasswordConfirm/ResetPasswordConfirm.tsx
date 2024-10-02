import { useParams } from "react-router-dom";

import { ResetPasswordConfirmForm } from "@/features/user";
import { userModel } from "@/entities";
import "./style.scss";

export const ResetPasswordConfirm = () => {
    const { uid="", token="" } = useParams();

    return (
        <div className="reset-password-wrapper">
            <ResetPasswordConfirmForm userModel={userModel} uid={uid} token={token} />
        </div>
    )
}