import { ResetPasswordConfirmForm } from "@/features/user";
import { user } from "@/entities";
import "./style.scss";
import { useParams } from "react-router-dom";

export const ResetPasswordConfirm = () => {
    const { uid="", token="" } = useParams();

    return (
        <div className="reset-password-wrapper">
            <ResetPasswordConfirmForm user={user} uid={uid} token={token} />
        </div>
    )
}