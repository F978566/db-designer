import { useParams } from "react-router-dom";

import { UserActivateContainer } from "./UserActivateContainer";
import { UserActivate } from "@/shared/types";
import { userModel } from "@/entities";


export const Activate = () => {
    const { uid = "", token = ""} = useParams<UserActivate>();

    return (
        <UserActivateContainer uid={uid} token={token} userModel={userModel} />
    )
}