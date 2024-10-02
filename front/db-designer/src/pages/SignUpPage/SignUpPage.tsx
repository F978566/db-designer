import { RegisterForm } from "@/features";
import { userModel } from "@/entities";
import "./style.scss";


export const SignUpPage = () => {
    return (
        <div className="loginform">
            <RegisterForm userModel={userModel}/>
        </div>
    )
}