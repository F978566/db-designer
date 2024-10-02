import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { PostToken } from "@/shared/types";
import { UserModel } from "@/entities";
import { Input, Form, Button, LoadBar } from "@/shared/ui";
import { UserStatus } from "@/entities/user";
import { ErrorList } from "@/shared/ui";

export const LoginForm = observer(({ userModel }: { userModel: UserModel }) => {
    const { register, handleSubmit } = useForm<PostToken>();

    const handleSub = async (data: PostToken) => {
        await userModel.userLogin(data);
    }

    if (userModel.status === UserStatus.LOADING) {
        return <LoadBar />;
    }

    return (
        <>
            <Form
                title="Login"
                onSubmit={handleSubmit(handleSub)}
            >
                <Input
                    {...register("email", { required: true })}
                    placeholder="Email"
                    type="email"
                />
                <Input
                    {...register("password",
                        { required: true })}
                    placeholder="Password"
                    type="password"
                />
                <Button type="submit">Login</Button>
                <a href="/sign-up">Sign-up</a>
                {userModel.status === UserStatus.ERROR && <ErrorList errors={userModel.errors} />}
                {userModel.status === UserStatus.LOGIN && <Navigate to="/" />}
            </Form>
        </>
    )
})