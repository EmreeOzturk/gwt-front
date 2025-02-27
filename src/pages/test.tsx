//npm install @splinetool/react-spline @splinetool/runtime bu komutları çalıştırıyoruz
import Spline from "@splinetool/react-spline"; // bunu ekleyeceğiz

export default function TEST() {
  return (
    <>
    {/* <img
                  alt="sun"
                  src="sun.svg"
                  className={`max-h-[90vh]  ${finished ?  'animate-spin-slow' : 'animated-sun' }  object-contain`}
                /> 
      Bunun yerine spline kullanıyoruz.
                */}
      <div className="w-[50vw] h-[50vh] absolute  right-0  ">
        <Spline className="scale-125" scene="https://prod.spline.design/xjRDYfv6dsE8jW5M/scene.splinecode" />
      </div>
    </>
  );
}
