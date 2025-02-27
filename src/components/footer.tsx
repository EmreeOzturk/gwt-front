import Image from "next/image";

export default function Footer() {
  return (
    <footer className="absolute transform -translate-x-1/2 left-1/2 bottom-0 w-fit min-w-[300px] flex flex-col justify-start items-center gap-2 z-20 pb-3">
      <span
        className="font-light text-[10px] md:text-sm text-white"
        style={{
          letterSpacing: "7.8px",
        }}
      >
        ALL RIGHT RESERVED
      </span>
      {/* <Image src="/footerlogo.svg" width={150} height={100} alt="" /> */}
    </footer>
  );
}
