import type { NextPage } from "next";
import Image from "next/image";
import FrameComponent4 from "../frameComponent1/page";
import FrameComponent3 from "../frameComponent2/page";
import FrameComponent5 from "../frameComponent3/page";
import ShopCategories from "../shop/page";
import FrameComponent6 from "../frameComponent5/page";
import FrameComponent7 from "../frameComponent6/page";
import FooterNavigation from "../footer/page";

const Desktop: NextPage = () => {
    return (
        <div className="w-full relative bg-[#fff] overflow-hidden flex flex-col items-start !pt-[1.25rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] box-border isolate leading-[normal] tracking-[normal]">
            <FrameComponent4 />
            <div className="self-stretch h-[43.75rem] relative bg-[url('/Group-17@3x.png')] bg-cover bg-no-repeat bg-[top] !mt-[-2.25rem]">
                <Image
                    className="absolute top-[0rem] left-[0rem] w-full h-full object-cover hidden"
                    width={1400}
                    height={700}
                    sizes="100vw"
                    alt=""
                    src="/image-3@2x.png"
                />
                <div className="absolute top-[0rem] left-[0rem] [backdrop-filter:blur(15px)] bg-[rgba(196,196,196,0.2)] w-full h-full z-[1]" />
                <Image
                    className="absolute h-[18.76%] w-[26.43%] top-[40.57%] right-[36.79%] bottom-[40.67%] left-[36.79%] max-w-full overflow-hidden max-h-full z-[2]"
                    loading="lazy"
                    width={370}
                    height={131.3}
                    sizes="100vw"
                    alt=""
                    src="/Accent-Graphic.svg"
                />
            </div>
            <div className="w-[25.056rem] h-[20.931rem] absolute !!m-[0 important] right-[3.081rem] bottom-[75.2rem] shadow-[0px_15px_30px_rgba(0,_0,_0,_0.3)] z-[3] overflow-hidden flex items-center justify-center">
                <Image
                    className="w-full h-full shadow-[0px_15px_30px_rgba(0,_0,_0,_0.3)] z-[3] object-cover absolute left-[0rem] top-[0.938rem] [transform:scale(1.15)]"
                    loading="lazy"
                    width={400.9}
                    height={334.9}
                    sizes="100vw"
                    alt=""
                    src="/Green-1@2x.png"
                />
            </div>
            <div className="w-[29.35rem] h-[24.925rem] absolute !!m-[0 important] top-[63.125rem] left-[15.25rem] shadow-[0px_22px_45px_rgba(0,_0,_0,_0.25)] z-[4] overflow-hidden flex items-center justify-center">
                <Image
                    className="w-full h-full shadow-[0px_22px_45px_rgba(0,_0,_0,_0.25)] z-[4] object-cover absolute left-[0rem] top-[1.375rem] [transform:scale(1.192)]"
                    loading="lazy"
                    width={469.6}
                    height={398.8}
                    sizes="100vw"
                    alt=""
                    src="/nike-air-max-270-sunset-dq7625-600-w380-removebg-preview-3@2x.png"
                />
            </div>
            <div className="w-[25.556rem] h-[21.875rem] absolute !!m-[0 important] top-[64.25rem] right-[2.5rem] shadow-[0px_22px_45px_rgba(0,_0,_0,_0.3)] z-[4] overflow-hidden flex items-center justify-center">
                <Image
                    className="w-full h-full shadow-[0px_22px_45px_rgba(0,_0,_0,_0.3)] z-[4] object-cover absolute left-[0rem] top-[1.375rem] [transform:scale(1.208)]"
                    loading="lazy"
                    width={408.9}
                    height={350}
                    sizes="100vw"
                    alt=""
                    src="/Red-Shoe@2x.png"
                />
            </div>
            <main className="self-stretch flex flex-col items-start !pt-[0rem] !pb-[8.5rem] !pl-[0rem] !pr-[0rem] box-border gap-[6.25rem] max-w-full !mt-[-2.25rem] relative text-left text-[2.5rem] text-[#000] font-[Montserrat] mq800:gap-[3.125rem] mq800:!pb-[1.5rem] mq800:box-border mq450:gap-[1.563rem] mq1325:!pb-[2.313rem] mq1325:box-border">
                <FrameComponent3 />
                <section className="self-stretch flex items-start !pt-[0rem] !pb-[0rem] !pl-[15.062rem] !pr-[15.062rem] box-border max-w-full text-left text-[2.5rem] text-[#000] font-[Montserrat] mq800:!pl-[7.5rem] mq800:!pr-[7.5rem] mq800:box-border mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border">
                    <div className="flex-1 flex flex-col items-start gap-[1.875rem] max-w-full">
                        <div className="self-stretch flex flex-col items-start gap-[0.625rem] max-w-full">
                            <div className="self-stretch flex items-start !pt-[0rem] !pb-[0rem] !pl-[18.687rem] !pr-[18.625rem] mq1125:!pl-[9.313rem] mq1125:!pr-[9.313rem] mq1125:box-border mq450:!pl-[4.625rem] mq450:!pr-[4.625rem] mq450:box-border">
                                <h2 className="!m-0 w-[20.063rem] relative text-[length:inherit] font-normal font-[inherit] inline-block mq800:text-[2rem] mq450:text-[1.5rem]">
                                    At the moment
                                </h2>
                            </div>
                            <h1 className="!m-0 w-[57.375rem] relative text-[5rem] inline-block italic font-black font-[inherit] max-w-full mq800:text-[2.5rem] mq450:text-[1.5rem]">
                                SUMMERTIME MOOD
                            </h1>
                        </div>
                        <div className="self-stretch flex items-start !pt-[0rem] !pb-[0rem] !pl-[9.437rem] !pr-[10.062rem] mq1125:!pl-[4.688rem] mq1125:!pr-[5rem] mq1125:box-border mq450:!pl-[2.313rem] mq450:!pr-[2.5rem] mq450:box-border">
                            <h2 className="!m-0 relative text-[length:inherit] font-normal font-[inherit] mq800:text-[2rem] mq450:text-[1.5rem]">
                                Fight the heat in a sunny look!
                            </h2>
                        </div>
                    </div>
                </section>
                <FrameComponent5 />
                <ShopCategories />
                <div className="flex items-start !pt-[0rem] !pb-[0rem] !pl-[15.625rem] !pr-[15.625rem] box-border max-w-full mq800:!pl-[7.813rem] mq800:!pr-[7.813rem] mq800:box-border mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border">
                    <h2 className="!m-0 w-[56.25rem] relative text-[length:inherit] inline-block italic font-black font-[inherit] max-w-full mq800:text-[2rem] mq450:text-[1.5rem]">
                        LOOKS GOOD. RUNS GOOD. FEELS GOOD.
                    </h2>
                </div>
                <FrameComponent6 />
                <FrameComponent7 />
            </main>
            <Image
                className="w-full h-[3.063rem] absolute !!m-[0 important] top-[23.688rem] right-[0rem] left-[0rem] max-w-full overflow-hidden shrink-0 object-cover z-[3]"
                loading="lazy"
                width={1400}
                height={49}
                sizes="100vw"
                alt=""
                src="/Page-Separator@2x.png"
            />
            <FooterNavigation />
        </div>
    );
};

export default Desktop;
