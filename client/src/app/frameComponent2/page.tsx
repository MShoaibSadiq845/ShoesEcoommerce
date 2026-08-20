import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponent3Type = {
    className?: string;
};

const FrameComponent3: NextPage<FrameComponent3Type> = ({ className = "" }) => {
    return (
        <section
            className={`flex items-start !pt-[0rem] !pb-[0.55rem] !pl-[3.125rem] !pr-[3.125rem] box-border max-w-full text-left text-[3rem] text-[#ff3939] font-[Montserrat] mq800:!pl-[1.563rem] mq800:!pr-[1.563rem] mq800:box-border ${className}`}
        >
            <div className="flex items-start gap-[4.243rem] max-w-full mq800:gap-[2.125rem] mq450:gap-[1.063rem] mq1325:flex-wrap">
                <div className="shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] flex flex-col items-start !pt-[3.75rem] !pb-[1.512rem] !pl-[4.125rem] !pr-[4.125rem] box-border gap-[0.943rem] min-w-[37.631rem] max-w-full z-[3] mq800:min-w-full mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border mq1325:flex-1">
                    <div className="w-[37.631rem] h-[17.025rem] relative shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] hidden max-w-full shrink-0" />
                    <div className="w-[14.3rem] flex flex-col items-start gap-[0.637rem] shrink-0">
                        <h2 className="!m-0 relative text-[length:inherit] italic font-bold font-[inherit] shrink-0 z-[4] mq800:text-[2.375rem] mq450:text-[1.813rem]">
                            NEW
                        </h2>
                        <div className="relative text-[1.25rem] tracking-[0.01em] text-[#000] shrink-0 z-[5] mq450:text-[1rem]">
                            AIR JORDAN 1 MID LIGHT SMOKE GREY
                        </div>
                    </div>
                    <div className="flex items-start !pt-[0rem] !pb-[0rem] !pl-[2.125rem] !pr-[2.125rem] shrink-0">
                        <div className="h-[3.438rem] w-[3.438rem] rounded-[35px] bg-[#fff] flex items-start relative isolate z-[4]">
                            <div className="h-[3.438rem] w-[3.438rem] relative rounded-[35px] bg-[#fff] hidden z-[0]" />
                            <Image
                                className="h-[1.494rem] w-[1.613rem] absolute !!m-[0 important] top-[0.969rem] left-[0.906rem] object-contain z-[1]"
                                width={25.8}
                                height={23.9}
                                sizes="100vw"
                                alt=""
                                src="/Vector.svg"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start !pt-[0.168rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] box-border max-w-full mq800:min-w-full mq1325:flex-1">
                    <div className="w-[38.3rem] shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] flex flex-col items-start !pt-[3.775rem] !pb-[1.556rem] !pl-[4.687rem] !pr-[4.687rem] box-border gap-[1.906rem] max-w-full z-[3] mq450:gap-[0.938rem] mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border">
                        <div className="w-[38.3rem] h-[17.156rem] relative shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] hidden max-w-full shrink-0" />
                        <div className="w-[9.7rem] flex flex-col items-start gap-[1.268rem] shrink-0">
                            <h2 className="!m-0 relative text-[length:inherit] inline-block italic font-bold font-[inherit] min-w-[8.044rem] shrink-0 z-[4] mq800:text-[2.375rem] mq450:text-[1.813rem]">
                                NEW
                            </h2>
                            <div className="self-stretch flex items-start !pt-[0rem] !pb-[0rem] !pl-[0.062rem] !pr-[0rem] text-center text-[1.25rem] text-[#000] font-['Work_Sans']">
                                <h3 className="!m-0 flex-1 relative text-[length:inherit] tracking-[0.25px] font-normal font-[inherit] shrink-0 z-[4] mq450:text-[1rem]">
                                    Air Max 200 SE
                                </h3>
                            </div>
                        </div>
                        <div className="flex items-start !pt-[0rem] !pb-[0rem] !pl-[1.625rem] !pr-[1.625rem] shrink-0">
                            <div className="h-[3.438rem] w-[3.438rem] rounded-[35px] bg-[#fff] flex items-start relative isolate z-[4]">
                                <div className="h-[3.438rem] w-[3.438rem] relative rounded-[35px] bg-[#fff] hidden z-[0]" />
                                <Image
                                    className="h-[1.494rem] w-[1.613rem] absolute !!m-[0 important] top-[0.963rem] left-[0.906rem] object-contain z-[1]"
                                    width={25.8}
                                    height={23.9}
                                    sizes="100vw"
                                    alt=""
                                    src="/Vector.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FrameComponent3;
