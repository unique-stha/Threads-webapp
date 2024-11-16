import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center gap-10'>
      <h1 className='text-4xl min-h-screen font-bold mt-20'>Please Sign In</h1>
      <SignIn />
    </div>
    );
}
