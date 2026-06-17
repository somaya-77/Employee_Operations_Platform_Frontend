import axios from "axios";
import { authOptions } from "@/auth";
import { JSON_HEADER } from "./constance";
import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: JSON_HEADER,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await signOut({ callbackUrl: "/auth/login" });
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
    }
    return config;
});

export default axiosInstance;