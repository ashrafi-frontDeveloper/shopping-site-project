import { FaShare } from "react-icons/fa6";
import Tooltip from "../../../../../../Ui/Tooltip";
import { useState } from "react";

const CopyUrl = () => {

  const [isCopied , setIsCopird] = useState(false)

  const copyUrl = () => {
    const origin = location.origin
    const pathname = location.pathname
    const url = origin + pathname
    navigator.clipboard.writeText(url)

    setIsCopird(true)

    setTimeout(() => {
      setIsCopird(false)
    }, 3000);
  }

  return (
    <Tooltip text={`${isCopied ? "کپی انجام شد" : "اشتراک گذاری"}`}>
      <button
      onClick={copyUrl} 
      className="cursor-pointer size-8 text-sm hover:*:text-lg *:duration-150 *:transition-all active:*:text-sm flex-center border border-neutral-300 rounded-lg text-slate-700">
        <FaShare />
      </button>
    </Tooltip>
  );
};

export default CopyUrl;
