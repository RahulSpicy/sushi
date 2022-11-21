import Image from "next/image";
import teamwork from "../../images/teamwork.png";

const SlideshowLayout = () => {
  return (
    <div className="z-10 fixed left-1/3 h-screen w-4/6 bg-[#f6f6f8] flex flex-col justify-center">
      <div className="text-center">
        <Image src={teamwork} alt="bg" width="550px" height="390px" />
      </div>
      <div className="text-center font-mono">
        <h1 className="text-black text-6xl font-bold leading-relaxed">
          Plan your tasks
        </h1>
        <p className="text-[#373737] leading-tight text-lg">
          With Sushi it’s more than work. It’s a way of working together.
        </p>
      </div>
    </div>
  );
};

export default SlideshowLayout;
