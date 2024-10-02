import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { Button, ErrorList, LoadBar } from "@/shared/ui";
import { UserActivate } from "@/shared/types";
import { UserModel, UserStatus } from "@/entities";
import "./style.scss";

type UserActivateContainerProps = UserActivate & {
    userModel: UserModel ;
}

export const UserActivateContainer = observer(({ uid, token, userModel }: UserActivateContainerProps) => {
    const navigate = useNavigate();

    const handleSub = async ({ uid, token }: UserActivate) => {
        await userModel.userActivate({ uid, token })
    }

    if (userModel.status === UserStatus.LOADING) {
        return (
            <div className="container">
                <LoadBar />
            </div>
        )
    } else if (userModel.status === UserStatus.ACTIVATE) {
        navigate("/");
    }

    return (
        <div className="container">
            <Button onClick={() => handleSub({ uid, token })}>Activate</Button>
            {userModel.status === UserStatus.ERROR && <ErrorList errors={userModel.errors} />}
        </div>
    )
})