export default function Vip({text= "VIP 1"}: {text: "VIP 1" | "VIP 2" | "VIP 3"}) {
    const color = text === "VIP 1" ? "border-vip1 text-vip1 bg-vip1/20" : text === "VIP 2" ? "border-vip2 text-vip2 bg-vip2/20" : "border-vip3 text-vip3 bg-vip3/20";
  return (
    <>
      <div className={`w-24 xl:w-28  h-10 xl:h-12 shrink-0 border-2 ${color} right-0 flex justify-center items-center -top-14   px-4 font-semibold   rounded-full`}>
        {text}
      </div>
    </>
  );
}
