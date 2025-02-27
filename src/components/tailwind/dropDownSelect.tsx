// dropDownSelect component

import Dropdown from "./Dropdown";




export default function DropDownSelect({
  children,
  textBtn,
  className,
}: {
  children: any;
  textBtn: string;
  className?: string;
}) {
  return (
    <>
      <Dropdown
        offset={[0, 0]}
        placement={`${"bottom-end"}`}
        btnClassName="flex gap-2  py-2 px-2.5 items-center justify-between shrink-0 w-full h-full xl:hover:text-orange-400 transition-colors cursor-pointer text-center w-full font-normal xl:font-bold text-white  border-white rounded-lg z-30 realtive "
        infinity={true}
        button={
          <>
           {textBtn}
           <svg xmlns="http://www.w3.org/2000/svg" className="w-2 h-fit" fill="currentColor" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
          </>
        }
      >
        {children}
      </Dropdown>
    </>
  );
}
