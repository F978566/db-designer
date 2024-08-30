import { observer } from "mobx-react-lite";

import { Button } from "@/shared/ui";
import { UserActivate } from "@/shared/types";
import { User } from "@/entities";


type UserActivateContainerProps = UserActivate & {
    user: User;
}


export const UserActivateContainer = observer(({ uid, token, user }: UserActivateContainerProps) => {
    return (
        <div className="container">
            <Button onClick={() => user.userActivate({uid, token})}>Activate</Button>
        </div>
    )
})