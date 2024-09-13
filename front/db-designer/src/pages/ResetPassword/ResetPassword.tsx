import { ResetPasswordForm } from "@/features/user";
import { user } from "@/entities";

export const ResetPassword = () => {
    return (
        <div className="reset-password-wrapper">
            <ResetPasswordForm user={user} />
        </div>
    )
}