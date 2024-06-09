import Image from "next/image";
import Robot from "@/images/robot.svg";

export function AiCompanion({ messages }: { messages: string }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="p-4" />
        <div className="px-3.5 py-2 bg-primary rounded-3xl rounded-bl-none justify-start  items-center gap-3 inline-flex">
          <h5 className="text-gray-900 text-sm font-normal leading-snug">
            {messages}
          </h5>
        </div>
        <div className="p-2" />
        <Image src={Robot} alt="Example Image" width={100} height={100} />
        <div className="p-4" />
      </div>
    </>
  );
}
