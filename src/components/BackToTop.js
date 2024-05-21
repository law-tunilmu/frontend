import { FaAngleUp } from "react-icons/fa6";

export default function BackToTopBtn() {
    return (
      <button className="fixed bottom-10 z-20 w-fit h-fit bg-blue-400 rounded-[50%] 
                          right-[1%] sm:right-[3%] lg:right-[4%] xl:right-[12%] 
                          opacity-70 hover:opacity-100"
              onClick={() => window.scrollTo({top:0})}>
        <FaAngleUp size={35} color="white"/>
      </button>
    );
}
  