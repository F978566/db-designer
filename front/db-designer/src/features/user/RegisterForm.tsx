import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

import { Form, Input, Button, ErrorList } from "@/shared/ui";
import { User as UserType } from "@/shared/types";
import { User, UserStatus } from "@/entities";
import { LoadBar } from "@/shared/ui";


export const RegisterForm = observer(({ user }: {user: User}) => {
    const { register, handleSubmit } = useForm<UserType>();

    const handleSub = (data: UserType) => {
        if (data.password === data.re_password)
            user.registerUser(data);
        else
            console.log("uu")

        if (user.status === UserStatus.LOADING) {
            <LoadBar />
        }
    }

    return (
        <Form title="Sign-up" onSubmit={handleSubmit(handleSub)}>
            <Input placeholder="email" type="email" {...register("email", { required: true })}/>
            <Input placeholder="Name" {...register("first_name", { required: true })}/>
            <Input placeholder="Surname" {...register("last_name", { required: true })}/>
            <Input placeholder="Password" type="password" {...register("password", { required: true })}/>
            <Input placeholder="Password once again" type="password" {...register("re_password", { required: true })}/>
            {user.status === UserStatus.ERROR && <ErrorList errors={user.errors}/>}
            <Button type="submit">Sign-up</Button>
        </Form>
    )
})