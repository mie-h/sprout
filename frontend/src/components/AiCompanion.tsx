import Image from "next/image";
import Robot from "@images/robot.svg";

export function AiCompanion() {
  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4">
        <Image src={Robot} alt="Example Image" width={100} height={100} />
      </div>
    </>
  );
}
