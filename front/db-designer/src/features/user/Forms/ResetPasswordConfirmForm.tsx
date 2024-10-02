import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

import { UserModel, UserStatus } from "@/entities";
import { Button, Form, Input, LoadBar } from "@/shared/ui";
import { useNavigate } from "react-router-dom";


export const ResetPasswordConfirmForm = observer(({ userModel, uid, token }: { userModel: UserModel, uid: string, token: string }) => {
    const { register, handleSubmit } = useForm<{ new_password: string }>();
    const navigate = useNavigate();

    const handleSub = async (data: { new_password: string }) => {
        await userModel.resetPasswordConfirm({ ...data, uid, token });
    }

    if (userModel.status === UserStatus.LOADING) {
        return <LoadBar />;
    } else if (userModel.status === UserStatus.RESETPASSWORDCONFIRM) {
        navigate("/login");
    }

    return (
        <Form onSubmit={handleSubmit(handleSub)}>
            <Input type="password" placeholder="New Password" {...register("new_password", { required: true })}/>
            <Button type="submit">Reset Password</Button>
        </Form>
    )
})