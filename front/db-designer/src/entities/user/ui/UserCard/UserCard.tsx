import { observer } from "mobx-react-lite";

import { Info } from "@/shared/ui";
import { UserModel } from "../../model/user";
import "./style.scss";


export const UserCard = observer(({ userModel }: { userModel: UserModel }) => {
    return (
        <div className="profile">
            <Info
                mainInfoText={`${userModel.user.first_name} ${userModel.user.last_name}`}
                minorInfoText={`id: ${userModel.user.id}`}
                >
                <Info.MainInfo />
                <Info.MinorInfo />
            </Info>
            <Info
                mainInfoText="Email"
                minorInfoText={`${userModel.user.email}`}
                >
                <Info.MainInfo />
                <Info.MinorInfo />
            </Info>
        </div>
    )
})