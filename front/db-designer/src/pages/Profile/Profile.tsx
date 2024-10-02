import { userModel } from "@/entities";
import { UserCard } from "@/entities/user";
import { UserFeaturesList } from "@/features";
import "./profileStyle.scss";


export const Profile = () => {
    return (
        <div className="wrapper">
            <div className="profile-wrapper">
                <UserCard userModel={userModel} />
                <UserFeaturesList userModel={userModel} />
            </div>
        </div>
    )
}