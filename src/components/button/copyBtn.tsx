import { useRef, useState } from "react";

export default function CopyBtn({text}:{text:string}) {
  const [copySuccess, setCopySuccess] = useState("");

    function Copy() {
        navigator?.clipboard?.writeText(text);
        setCopySuccess("Copied!");
        setTimeout(() => {
            setCopySuccess("");
        }, 2000);
        }


  return (
      <button onClick={Copy} className="flex items-center justify-center relative">
        <svg
          className="w-4 md:w-5 hover:text-gray-400 transition-colors"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.66667 6C7.19391 6 6 7.19391 6 8.66667V12C6 13.4728 7.19391 14.6667 8.66667 14.6667H12C13.4728 14.6667 14.6667 13.4728 14.6667 12V8.66667C14.6667 7.19391 13.4728 6 12 6H8.66667Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.99992 1.33331C2.52716 1.33331 1.33325 2.52722 1.33325 3.99998V7.33331C1.33325 8.91256 2.50745 9.99998 3.99992 9.99998C4.36811 9.99998 4.66659 9.7015 4.66659 9.33331V8.66665C4.66659 6.45751 6.45745 4.66665 8.66659 4.66665H9.33325C9.70144 4.66665 9.99992 4.36817 9.99992 3.99998C9.99992 2.50751 8.9125 1.33331 7.33325 1.33331H3.99992Z"
            fill="currentColor"
          />
        </svg>
        {copySuccess && <span className="absolute -top-11 bg-white text-black shadow-sm p-2 rounded">{copySuccess}</span>}
      </button>
  );
}
