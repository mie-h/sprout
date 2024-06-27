"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Robot from "@images/robot.svg";
import GoogleLogo from "@icons/google-logo.png";
import React from "react";
import { Button } from "@headlessui/react";

export default function Home() {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    router.push("/api/login");
  };

  return (
    <div className="bg-stone-50 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:w-7/12 w-10/12 shadow-3xl rounded-xl relative">
        <div className="sm:block bg-indigo-300 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8 top-[-50px] sm:top-[-30px]">
          <Image src={Robot} alt="Example Image" width={100} height={100} />
        </div>
        <form className="p-8 md:p-24">
          <div className="flex items-center justify-center mb-6">
            <Button
              onClick={handleGoogleSignIn}
              className="bg-white text-gray-800 font-medium py-3 px-4 md:py-4 md:px-8 uppercase rounded flex items-center border border-gray-300 hover:bg-gray-100 text-xs md:text-base"
            >
              <img
                src={GoogleLogo.src} // Ensure you access the src property of the StaticImageData object
                alt="Google Logo"
                className="h-5 w-5 md:h-6 md:w-6 mr-2"
              />
              <span className="ml-2">Sign in with Google</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
