import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center gap-10'>
      <Image src='/logo_full.svg' alt='logo' width={300} height={100} style={{position:"absolute",marginBottom:"55vh"}}/>
      <SignIn />
    </div>
    );
}
