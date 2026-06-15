import axios from "axios";
import { authOptions } from "@/auth";
import { JSON_HEADER } from "./constance";
import { getServerSession } from "next-auth";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: JSON_HEADER,
});

axiosInstance.interceptors.request.use(async (config) => {
    const session = await getServerSession(authOptions);
    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
});

export default axiosInstance;