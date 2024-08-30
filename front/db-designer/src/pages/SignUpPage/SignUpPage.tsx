import { RegisterForm } from "@/features";
import { user } from "@/entities";
import "./style.scss";


export const SignUpPage = () => {
    return (
        <div className="loginform">
            <RegisterForm user={user}/>
        </div>
    )
}