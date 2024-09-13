import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";

import { Button, ErrorList, LoadBar } from "@/shared/ui";
import { UserActivate } from "@/shared/types";
import { User, UserStatus } from "@/entities";
import "./style.scss";
import { useState } from "react";


type UserActivateContainerProps = UserActivate & {
    user: User;
}

export const UserActivateContainer = observer(({ uid, token, user }: UserActivateContainerProps) => {
    const [activated, setActivated] = useState(false);

    const handleSub = ({ uid, token }: UserActivate) => {
        user.userActivate({ uid, token })
        setActivated(true);
    }

    if (user.status === UserStatus.LOADING) {
        return (
            <div className="container">
                <LoadBar />
            </div>
        )
    } else if (activated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <Button onClick={() => handleSub({ uid, token })}>Activate</Button>
            {user.status === UserStatus.ERROR && <ErrorList errors={user.errors} />}
        </div>
    )
})