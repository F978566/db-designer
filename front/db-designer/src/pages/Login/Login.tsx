import { LoginForm } from "@/features";
import { user } from "@/entities";
import "./login-style.scss";


export const Login = () => {
    return (
        <div className="loginform">
            <LoginForm user={user}/>
        </div>
    )
}