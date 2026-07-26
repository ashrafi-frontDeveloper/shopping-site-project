import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

const AccordionItem = ({ label, content }) => {

  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => setIsOpen((prev) => !prev)

  return (
    <div>
      <div
        onClick={toggleIsOpen}
        className={`flex-between select-none h-12 text-sm px-4 flex-ic duration-300 hover:bg-slate-50 active:*:scale-95 min-h-20 group cursor-pointer ${isOpen ? "bg-blue-500/15 text-blue-500" : ""}`}
        tabIndex="1"
      >
        <div className="duration-300 cursor-pointer w-full">{label}</div>
        <BiChevronLeft className={`${isOpen ? "rotate-90" : ""} duration-300 text-2xl`} />
      </div>
      <div className={` ${isOpen ? "h-full px-7 py-4" : "h-0 opacity-0 invisible overflow-hidden p-0 whitespace-nowrap"} duration-300 transition-all text-sm  text-slate-500`}>
        {/* { isOpen ? content : null } */}
        {content}
      </div>
    </div>
  ); 
};

export default AccordionItem;