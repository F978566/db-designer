import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";

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
        if (user.userStatus === UserStatus.FULFILLED) {
            navigate("/");
        }
    }

    if (user.userStatus === UserStatus.LOADING) {
        return (
            <div className="container">
                <LoadBar />
            </div>
        )
    }

    return (
        <div className="container">
            <Button onClick={() => handleSub({ uid, token })}>Activate</Button>
            {user.userStatus === UserStatus.ERROR && <ErrorList errors={user.errors} />}
        </div>
    )
})