import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { Button, ErrorList, LoadBar } from "@/shared/ui";
import { UserActivate } from "@/shared/types";
import { User, UserStatus } from "@/entities";
import "./style.scss";

type UserActivateContainerProps = UserActivate & {
    user: User;
}

export const UserActivateContainer = observer(({ uid, token, user }: UserActivateContainerProps) => {
    const navigate = useNavigate();

    const handleSub = async ({ uid, token }: UserActivate) => {
        await user.userActivate({ uid, token })
    }

    if (user.status === UserStatus.LOADING) {
        return (
            <div className="container">
                <LoadBar />
            </div>
        )
    } else if (user.status === UserStatus.ACTIVATE) {
        navigate("/");
    }

    return (
        <div className="container">
            <Button onClick={() => handleSub({ uid, token })}>Activate</Button>
            {user.status === UserStatus.ERROR && <ErrorList errors={user.errors} />}
        </div>
    )
})