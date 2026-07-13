

import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const axiosServer = async () => {
    const session = await getServerSession(authOptions);
if (!session?.accessToken) {
        throw new Error("No active session");
    }
    
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
        },
    });

    instance.interceptors.request.use((config) => {
        if(session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return config;
    })

    return instance;
};