// 'use client';


// import { ForgotPasswordFormValues } from '@/lib/schemas/forgot-password.schema';
// import { useState, useEffect } from 'react';

// export default function OTPTimer({ initialSeconds = 60, onResend,email }: { initialSeconds?: number, onResend: (email: ForgotPasswordFormValues) => void, email: string | null | undefined}) {
//     const [seconds, setSeconds] = useState(initialSeconds);

//     useEffect(() => {
//         if (seconds > 0) {
//             const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
//             return () => clearInterval(timer);
//         }
//     }, [seconds]);

//     const handleResend = () => {
//         if (email) {
//             setSeconds(initialSeconds); 
//             onResend({email}); 
//         }
//     };

//     return (
//         <div className="text-sm w-full mt-5 flex ةف-5 flex-col items-center justify-center gap-2">
//             {seconds > 0 ? (
//                 <p>
//                     <span className="">You can request another code in: </span>
//                     <span className="font-semibold text-maroon-600 dark:text-softPink-400">{seconds}s</span>
//                 </p>
//             ) : (
//                 <p>
//                     <span className="">Didn't receive the code? </span>
//                     <button 
//                         type="button" 
//                         onClick={handleResend}
//                         className="text-maroon-600 dark:text-softPink-400 font-semibold hover:underline cursor-pointer"
//                     >
//                         Resend
//                     </button>
//                 </p>
//             )}
//         </div>
//     );
// };