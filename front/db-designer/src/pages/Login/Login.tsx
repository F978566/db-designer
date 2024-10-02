import { LoginForm } from "@/features";
import { userModel } from "@/entities";
import "./style.scss";


export const Login = () => {
    return (
        <div className="loginform">
            <LoginForm userModel={userModel}/>
        </div>
    )
}