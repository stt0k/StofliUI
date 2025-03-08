// icons
import { HiArrowRight } from "react-icons/hi2";

const ButtonHome = () => {
  return (
    <button className="group cursor-pointer relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium transition-all duration-300">
      {/* Gradient background that moves on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF] via-[#FF8C33] to-[#FF5733] rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:blur-xl opacity-60" />

      {/* Button background */}
      <div className="absolute inset-0.5 bg-white dark:bg-black rounded-[7px] transition-all duration-300" />

      {/* Content */}
      <span className="relative flex items-center gap-2">
        <span className="bg-gradient-to-r from-[#00D1FF] to-[#FF5733] bg-clip-text text-transparent">
          Get Started
        </span>
        <HiArrowRight className="w-5 h-5 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1 text-[#00D1FF]" />
      </span>

      {/* Pulsing gradient border effect */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-r from-[#00D1FF] via-[#FF8C33] dark:via-none to-[#FF5733] rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
    </button>
  );
};

export default ButtonHome;
