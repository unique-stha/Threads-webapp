import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <h1 className='text-4xl font-bold mt-20'>Please Sign Up</h1>
      <SignUp />
    </div>
    );
}
