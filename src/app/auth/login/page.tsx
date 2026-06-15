import LoginForm from '../../../features/auth/components/login-form';
import ExploreAccounts from '../../../features/auth/components/explore-accounts';

export default function LoginPage() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center w-full min-h-screen ">
            {/* Explore accounts */}
            <ExploreAccounts />

            <div className="h-full flex-col hidden lg:flex items-center gap-4">
                <span className='h-44 w-0.5 bg-border' />
                <span>Or</span>
                <span className='h-44 w-0.5 bg-border' />
            </div>
            {/* Login card */}
            <div className="flex justify-center items-center w-full p-8">
                <div className="w-full max-w-md space-y-8 p-8 border border-border rounded-lg bg-sidebar-primary/30 shadow-xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Please enter your credentials to access your account.
                        </p>
                    </div>
                    {/* Login form */}
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}