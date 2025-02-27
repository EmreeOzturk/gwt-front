import  {Handle}  from "reactflow";
import  {Position}  from "reactflow";

function CardPlus({
  userCount = 1,
  users = "User 1",
  show = false,
  //setShow,
  address = "0x123456789",
  data,
}: {
  userCount?: number;
  users?: string;
  show?: boolean;
  //setShow: any;
  address?: string;
  data?: any;
}) {
  //console.log("data", data);
  return (
    <div
      className="border-4 border-purple animate-fadeIn  backdrop-blur-sm bg-white/10 text-white flex justify-center   rounded-lg p-3 w-full relative z-20"
      style={{
        width: "250px",
        height: "120px",
      }}
    >
      <div className="absolute top-1 text-2xl font-semibold rounded-full " >
        {!data?.first && (data?.index === 0 && (!data?.type) ? (
          <span className="text-blue-400">L</span>
          ) : <span className="text-red-400">R</span>)}
      </div>
      {!data?.first && (
        <Handle className={"w-2 h-2"} type="target" position={Position.Top} />
      )}
      <div className="grid grid-cols-3 items-center  gap-0 pt-2 w-full">
        <svg
          className="w-10"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.8706 7.39543C11.4804 7.39543 9.54272 9.33309 9.54272 11.7233C9.54272 14.1135 11.4804 16.0512 13.8706 16.0512C16.2608 16.0512 18.1985 14.1135 18.1985 11.7233C18.1985 9.33309 16.2608 7.39543 13.8706 7.39543Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.46087 3.06755C5.47309 3.06755 3.05103 5.48962 3.05103 8.47739V19.2971C3.05103 22.2848 5.47309 24.7069 8.46087 24.7069H19.2806C22.2683 24.7069 24.6904 22.2848 24.6904 19.2971V8.47739C24.6904 5.48962 22.2683 3.06755 19.2806 3.06755H8.46087ZM5.21496 8.47739C5.21496 6.68473 6.6682 5.23149 8.46087 5.23149H19.2806C21.0732 5.23149 22.5265 6.68473 22.5265 8.47739V19.2971C22.5265 20.237 22.1269 21.0836 21.4884 21.6764C20.0255 18.972 17.1638 17.1331 13.8705 17.1331C10.5772 17.1331 7.71563 18.9719 6.25265 21.6761C5.61435 21.0834 5.21496 20.2369 5.21496 19.2971V8.47739Z"
            fill="currentColor"
          />
        </svg>
        <div className="col-span-2 flex flex-col items-end">
          <span>User {Number(data?.label)-1}</span>
          <h4>
            {data?.address &&
              data?.address?.slice(0, 6) +
                "....." +
                data?.address?.slice(
                  data?.address?.length - 6,
                  data?.address?.length
                )}
          </h4>
        </div>
        <div className="flex gap-2 items-center opacity-80">
          <svg
            className="w-6"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.81176 1.94762C6.21828 1.94762 4.92651 3.23939 4.92651 4.83287C4.92651 6.42634 6.21828 7.71812 7.81176 7.71812C9.40524 7.71812 10.697 6.42634 10.697 4.83287C10.697 3.23939 9.40524 1.94762 7.81176 1.94762Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.08042 8.29517C5.12094 8.29517 4.19822 8.73288 3.65748 9.39182C3.38304 9.72626 3.19011 10.1401 3.17331 10.5987C3.15615 11.0671 3.32522 11.5242 3.67389 11.9231C4.52363 12.8952 5.88034 13.4886 7.81157 13.4886C9.74281 13.4886 11.0995 12.8952 11.9493 11.9231C12.2979 11.5242 12.467 11.0671 12.4498 10.5987C12.433 10.1401 12.2401 9.72626 11.9657 9.39182C11.4249 8.73288 10.5022 8.29517 9.54272 8.29517H6.08042Z"
              fill="currentColor"
            />
          </svg>
          {data?.count || 0}
        </div>
        <div className="col-span-2 hidden gap-2 items-center justify-end opacity-80">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.44156 6.47688C11.0717 8.1064 11.088 10.6931 9.48956 12.2909L7.11479 14.6648C5.52476 16.2552 2.9372 16.2549 1.34319 14.6624L1.2989 14.6173C-0.292329 13.0276 -0.292327 10.4409 1.29882 8.85032L3.67285 6.47717C3.70641 6.44362 3.72996 6.42464 3.77527 6.39079C3.79458 6.37613 3.79157 6.37861 3.79157 6.37861C3.99852 6.18652 4.15372 6.04245 4.25719 5.9464C4.35142 5.85894 4.17282 6.35488 4.17282 7.05518C4.17282 7.75548 4.34347 8.13248 4.30524 8.17071C3.89562 8.58035 3.28119 9.19482 2.46196 10.0141C1.51303 10.962 1.51303 12.5064 2.46206 13.4544L2.50989 13.5022C3.45811 14.4508 5.00313 14.4508 5.95146 13.5021L8.32631 11.1281C9.27456 10.1802 9.27456 8.63559 8.32599 7.68736C8.02944 7.39024 7.66806 7.18035 7.2562 7.05518C7.1823 6.95928 7.25086 6.69503 7.46188 6.26239C7.6729 5.82975 7.81304 5.58167 7.88229 5.51815C8.47757 5.72288 9.00534 6.0417 9.44156 6.47688ZM14.2167 1.70385C15.8466 3.33314 15.8629 5.91977 14.2645 7.51858L11.8897 9.89171C11.8558 9.9256 11.8315 9.94526 11.7853 9.97986C11.764 9.99609 11.7657 9.99469 11.7657 9.99469C11.6058 10.1437 11.4858 10.2554 11.4058 10.3299C11.3467 10.385 11.2672 10.4591 11.1673 10.5521C11.122 10.5943 11.3681 10.0769 11.3681 9.324C11.3681 8.5711 11.2403 8.21525 11.3681 8.08748C11.7532 7.70246 12.331 7.12492 13.1013 6.35488C14.0495 5.40698 14.0495 3.86235 13.1013 2.91445C12.1108 1.92437 10.5663 1.91184 9.61111 2.86671L7.23692 5.24086C6.288 6.18873 6.288 7.73321 7.23955 8.68373L7.28392 8.72887C7.56197 9.00682 7.90656 9.20476 8.30343 9.324C8.45361 9.33263 8.42005 9.59053 8.20276 10.0977C7.98547 10.6049 7.81142 10.8557 7.6806 10.8501C7.08574 10.646 6.55711 10.3271 6.11815 9.88916L6.07386 9.8441C4.48262 8.25435 4.48262 5.66758 6.07373 4.07797L8.44781 1.70393C10.0387 0.113656 12.6253 0.113945 14.2167 1.70385Z"
              fill="currentColor"
            />
          </svg>
          User {Number(data?.refId)-1 || 0}
        </div>

        {data?.open && data?.children?.length > 1 && (
          <>
            <div className="border-[3px] absolute -bottom-14 w-[120px] text-center justify-center text-[10px] -left-10 flex items-center bg-[#D2F5DC] text-green-600 border-green-400 p-2 h-7 rounded-full shrink-0">
              Revenue: ${data?.leftChildRevenue || 0}
            </div>
            <div className="border-[3px] absolute -bottom-14 w-[120px] text-center justify-center text-[10px] -right-10 flex items-center bg-[#D2F5DC] text-green-600 border-green-400 p-2 h-7 rounded-full shrink-0">
              Revenue: ${data?.rightChildRevenue || 0}
            </div>
          </>
        )}
        {data?.open && data?.children?.length === 1 && (
          <>
            <div className="border-[3px] absolute -bottom-14 w-[120px] text-center justify-center text-[10px] left-1/4 flex items-center bg-[#D2F5DC] text-green-600 border-green-400 p-2 h-7 rounded-full shrink-0">
              Revenue: ${data?.leftChildRevenue || data?.rightChildRevenue || 0}
            </div>
          </>
        )}
      </div>
      {data?.childrenStatus &&
        (!data?.open ? (
          <button
            onClick={() => {} /* setShow(!show) */}
            className="absolute -bottom-6 bg-white rounded-full z-20"
          >
            <svg
              className="w-7"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99976 7.62939e-06C4.47691 7.62939e-06 -0.000244141 4.47716 -0.000244141 10C-0.000244141 15.5229 4.47691 20 9.99976 20C15.5226 20 19.9998 15.5229 19.9998 10C19.9998 4.47716 15.5226 7.62939e-06 9.99976 7.62939e-06ZM9.99976 5.00001C10.552 5.00001 10.9998 5.44772 10.9998 6.00001V9.00001H13.9998C14.552 9.00001 14.9998 9.44772 14.9998 10C14.9998 10.5523 14.552 11 13.9998 11H10.9998V14C10.9998 14.5523 10.552 15 9.99976 15C9.44747 15 8.99976 14.5523 8.99976 14V11H5.99976C5.44747 11 4.99976 10.5523 4.99976 10C4.99976 9.44772 5.44747 9.00001 5.99976 9.00001H8.99976V6.00001C8.99976 5.44772 9.44747 5.00001 9.99976 5.00001Z"
                fill="#1FCB4F"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => {} /* setShow(!show) */}
            className="absolute -bottom-6 bg-white flex justify-center rounded-full z-20"
          >
            <svg
            className="w-7"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2888 0.258331C6.3982 0.258331 0.812256 5.84427 0.812256 12.7349C0.812256 19.6255 6.3982 25.2114 13.2888 25.2114C20.1794 25.2114 25.7654 19.6255 25.7654 12.7349C25.7654 5.84427 20.1794 0.258331 13.2888 0.258331ZM7.05053 12.7349C7.05053 12.0458 7.60913 11.4872 8.29819 11.4872H18.2794C18.9685 11.4872 19.5271 12.0458 19.5271 12.7349C19.5271 13.4239 18.9685 13.9825 18.2794 13.9825H8.29819C7.60913 13.9825 7.05053 13.4239 7.05053 12.7349Z"
                fill="#F46D22"
              />
            </svg>
          </button>
        ))}

      {data?.childrenStatus && (
        <Handle
          className={"w-2 h-2"}
          type="source"
          position={Position.Bottom}
        />
      )}
    </div>
  );
}

export default CardPlus;
