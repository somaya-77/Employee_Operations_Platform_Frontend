
// export async function withErrorHandler<T>(apiCall: () => Promise<T>): Promise<T | null> {
//     try {
//         return await apiCall();
//     } catch (error: any) {
//         const isNetworkError = 
//             error.code === 'ECONNRESET' || 
//             error.message.includes('timeout') || 
//             !error.response;

//         if (isNetworkError) {
//             // toast.error("Network/Connection Error detected");
//             return null; 
//         }

//         if (error.response?.status === 401) {
//             // toast.error("Unauthorized access");
//             return null;
//         }

//         throw error;
//     }
// }


// src/lib/api-handler.ts
export async function withErrorHandler<T>(
    apiCall: () => Promise<T>, 
    onError?: (error: any) => void 
): Promise<T | null> {
    try {
        return await apiCall();
    } catch (error: any) {
        const isNetworkError = error.code === 'ECONNRESET' || error.message.includes('timeout') || !error.response;
        
        if (isNetworkError) {
            if (onError) onError(error); 
            return null;
        }
        throw error;
    }
}