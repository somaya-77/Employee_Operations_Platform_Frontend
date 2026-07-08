// import axios from "axios";
// import { authOptions } from "@/auth";
// import { getServerSession } from "next-auth";

// const axiosServer = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// axiosServer.interceptors.request.use(async (config) => {
//     const session = await getServerSession(authOptions);
   
//     if (session?.accessToken) {
//         config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
//     return config;
// });

// export default axiosServer;

import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const axiosServer = async () => {
    const session = await getServerSession(authOptions);

    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
        },
    });

    return instance;
};