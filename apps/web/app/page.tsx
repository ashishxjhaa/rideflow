import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-cover bg-center min-h-screen max-w-md md:max-x-lg mx-auto flex flex-col justify-between bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1352&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
        <Image
          src="https://static.vecteezy.com/system/resources/previews/027/127/501/non_2x/uber-logo-uber-icon-transparent-free-png.png"
          alt="Uber Logo"
          height={100}
          width={100}
          className="ml-4 mt-4 w-20 sm:w-24 md:w-28 h-auto"
        />
        <div className="bg-white text-black p-5 sm:p-6 md:p-8 pb-7 rounded-t-3xl shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Get Started with Uber
          </h2>
          <Link
            href="/user-login"
            className="text-base lg:text-lg flex items-center justify-center w-full bg-black text-white py-3 sm:py-4 rounded-lg mt-5 hover:bg-neutral-900 transition-colors"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
