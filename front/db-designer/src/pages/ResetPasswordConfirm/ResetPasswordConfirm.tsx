import { useParams } from "react-router-dom";

import { ResetPasswordConfirmForm } from "@/features/user";
import { user } from "@/entities";
import "./style.scss";

export const ResetPasswordConfirm = () => {
    const { uid="", token="" } = useParams();

    return (
        <div className="reset-password-wrapper">
            <ResetPasswordConfirmForm user={user} uid={uid} token={token} />
        </div>
    )
}