// src/app/auth/login/page.tsx
import Link from 'next/link';
import LoginForm from './_comp/login-form';

export default function LoginPage() {
    return (
        <div className="w-full max-w-md space-y-8 p-8 border border-border rounded-lg bg-card shadow-xl">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Please enter your credentials to access your account.
                </p>
            </div>

          <LoginForm />

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/auth/register" className="font-semibold text-primary hover:underline">
                    Sign up now
                </Link>
            </p>
        </div>
    );
}