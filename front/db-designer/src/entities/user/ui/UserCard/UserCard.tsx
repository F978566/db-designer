import { observer } from "mobx-react-lite";

import { Info } from "@/shared/ui";
import { User } from "../../model";
import "./style.scss";


export const UserCard = observer(({ user }: { user: User }) => {
    return (
        <div className="profile">
            <Info
                mainInfoText={`${user.user.first_name} ${user.user.last_name}`}
                minorInfoText={`id: ${user.user.id}`}
                >
                <Info.MainInfo />
                <Info.MinorInfo />
            </Info>
            <Info
                mainInfoText="Email"
                minorInfoText={`${user.user.email}`}
                >
                <Info.MainInfo />
                <Info.MinorInfo />
            </Info>
        </div>
    )
})