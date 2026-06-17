// axiosServer.ts
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const axiosServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosServer.interceptors.request.use(async (config) => {
    const session = await getServerSession(authOptions);
    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
});

export default axiosServer;