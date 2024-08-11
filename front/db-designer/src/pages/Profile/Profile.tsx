import { observer } from "mobx-react-lite";

import { user } from "@/entities";
import "./profileStyle.scss";


export const Profile = observer(() => {
    return (
        <div className="wrapper">
            <div className="profile">
                <div>
                    <div className="mainInfo">
                        {user.user.first_name} {user.user.last_name}
                    </div>
                    <div className="minorInfo">id: {user.user.id}</div>
                </div>
                <div>
                    <div className="mainInfo">Email</div>
                    <div className="minorInfo">{user.user.email}</div>
                </div>
            </div>
        </div>
    )
})