import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

import { Form, Input, Button, ErrorList } from "@/shared/ui";
import { User as UserType } from "@/shared/types";
import { User, UserStatus } from "@/entities";
import { LoadBar } from "@/shared/ui";
import { useNavigate } from "react-router-dom";


export const RegisterForm = observer(({ user }: { user: User }) => {
    const { register, handleSubmit } = useForm<UserType>();
    const navigate = useNavigate();

    const handleSub = async (data: UserType) => {
        if (data.password === data.re_password) {
            await user.registerUser(data);
            if (user.userStatus === UserStatus.FULFILLED) {
                navigate("/login");
            }
        }
    }

    if (user.userStatus === UserStatus.LOADING) {
        return <LoadBar />;
    }

    return (
        <Form title="Sign-up" onSubmit={handleSubmit(handleSub)}>
            <Input placeholder="email" type="email" {...register("email", { required: true })} />
            <Input placeholder="Name" {...register("first_name", { required: true })} />
            <Input placeholder="Surname" {...register("last_name", { required: true })} />
            <Input placeholder="Password" type="password" {...register("password", { required: true })} />
            <Input placeholder="Password once again" type="password" {...register("re_password", { required: true })} />
            {user.userStatus === UserStatus.ERROR && <ErrorList errors={user.errors} />}
            <Button type="submit">Sign-up</Button>
        </Form>
    )
})