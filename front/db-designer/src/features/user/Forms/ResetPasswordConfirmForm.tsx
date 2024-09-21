import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

import { User, UserStatus } from "@/entities";
import { Button, Form, Input, LoadBar } from "@/shared/ui";
import { useNavigate } from "react-router-dom";


export const ResetPasswordConfirmForm = observer(({ user, uid, token }: { user: User, uid: string, token: string }) => {
    const { register, handleSubmit } = useForm<{ new_password: string }>();
    const navigate = useNavigate();

    const handleSub = async (data: { new_password: string }) => {
        await user.resetPasswordConfirm({ ...data, uid, token });

        if (user.userStatus === UserStatus.FULFILLED) {
            navigate("/login");
        }
    }

    if (user.userStatus === UserStatus.LOADING) {
        return <LoadBar />;
    }

    return (
        <Form onSubmit={handleSubmit(handleSub)}>
            <Input type="password" placeholder="New Password" {...register("new_password", { required: true })}/>
            <Button type="submit">Reset Password</Button>
        </Form>
    )
})