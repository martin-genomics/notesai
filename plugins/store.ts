import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { create } from 'zustand'
// const { getUser } = getKindeServerSession();



export const userStore = create(() => ({
    user: null,
}))