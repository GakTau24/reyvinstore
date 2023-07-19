import { signIn } from "next-auth/react";
import { LoginUserParams } from "@/helper";
import { InputErrors } from "@/helper/error";

export const getErrorMsg = (key: string, errors: InputErrors[]) => {
    if(errors.find(err => err.hasOwnProperty(key) !== undefined)) {
        const errorObj = errors.find(err => err.hasOwnProperty(key))
        return errorObj && errorObj[key]
    }
}

export const loginUser = async ({email, password} : LoginUserParams) => {
    const res = await signIn("credentials", {
        redirect: false,
        email,
        password
    })

    return res
}