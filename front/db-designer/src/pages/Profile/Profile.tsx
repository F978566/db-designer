import { user } from "@/entities";
import { UserCard } from "@/entities/user";
import "./profileStyle.scss";


export const Profile = () => {
    return (
        <div className="wrapper">
            <UserCard user={user} />
        </div>
    )
}