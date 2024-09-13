import { user } from "@/entities"
import { DeleteUserForm } from "@/features"
import "./style.scss";


export const DeleteUser = () => {
    return (
        <div className="delete-user-wrapper">
            <DeleteUserForm user={user}/>
        </div>
    )
}