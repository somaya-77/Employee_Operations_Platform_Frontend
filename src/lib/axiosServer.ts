import axios from "axios";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

const axiosServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosServer.interceptors.request.use(async (config) => {
    const session = await getServerSession(authOptions);
    console.log("session", session?.accessToken)
    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
});

export default axiosServer;