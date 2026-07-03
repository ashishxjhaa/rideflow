import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1352&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full pt-1 flex flex-col justify-between">
        <Image
          src="https://static.vecteezy.com/system/resources/previews/027/127/501/non_2x/uber-logo-uber-icon-transparent-free-png.png"
          alt="Uber Logo"
          height={100}
          width={100}
          className="ml-3"
        />
        <div className="bg-white text-black p-4 pb-7">
          <h2 className="text-2xl font-bold">Get Started with Uber</h2>
          <Link
            href="/user-login"
            className="text-lg flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
