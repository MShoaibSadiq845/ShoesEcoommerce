import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponent5Type = {
    className?: string;
};

const FrameComponent5: NextPage<FrameComponent5Type> = ({ className = "" }) => {
    return (
        <section
            className={`flex items-start !pt-[0rem] !pb-[0rem] !pl-[3.125rem] !pr-[3.125rem] box-border max-w-full text-left text-[2.5rem] text-[#000] font-[Montserrat] mq800:!pl-[1.563rem] mq800:!pr-[1.563rem] mq800:box-border ${className}`}
        >
            <div className="w-[81.263rem] flex flex-col items-end gap-[1.875rem] max-w-full">
                <div className="self-stretch flex items-start justify-between gap-[1.25rem] mq800:flex-wrap mq800:gap-[1.25rem]">
                    <div className="w-[17.938rem] flex flex-col items-start !pt-[0.187rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] box-border">
                        <h2 className="!m-0 self-stretch relative text-[length:inherit] font-bold font-[inherit] mq800:text-[2rem] mq450:text-[1.5rem]">
                            Top sneakers
                        </h2>
                    </div>
                    <div className="flex items-start gap-[1.575rem]">
                        <div className="h-[3.438rem] w-[3.438rem] relative rounded-[35px] bg-[#f5f5f5]">
                            <div className="absolute top-[0rem] left-[0rem] rounded-[35px] bg-[#f5f5f5] w-full h-full hidden" />
                            <Image
                                className="absolute h-[28.36%] w-[37.82%] top-[35.64%] right-[31.27%] bottom-[36%] left-[30.91%] max-w-full overflow-hidden max-h-full object-contain z-[1]"
                                width={20.8}
                                height={15.6}
                                sizes="100vw"
                                alt=""
                                src="/Vector.svg"
                            />
                        </div>
                        <div className="h-[3.438rem] w-[3.438rem] relative rounded-[35px] bg-[#c6c6c6]">
                            <div className="absolute top-[0rem] left-[0rem] rounded-[35px] bg-[#c6c6c6] w-full h-full hidden" />
                            <Image
                                className="absolute h-[28.36%] w-[37.82%] top-[35.64%] right-[31.27%] bottom-[36%] left-[30.91%] max-w-full overflow-hidden max-h-full z-[1]"
                                width={20.8}
                                height={15.6}
                                sizes="100vw"
                                alt=""
                                src="/Vector.svg"
                            />
                        </div>
                    </div>
                </div>
                <div className="self-stretch flex items-start gap-[3.125rem] max-w-full mq800:gap-[1.563rem] mq800:grid-cols-[minmax(300px,_1fr)] mq1125:justify-center mq1125:grid-cols-[repeat(2,_minmax(300px,_520px))] mq1325:flex-wrap">
                    <section className="flex-[1.2072] flex flex-col items-start !pt-[0rem] !pb-[0rem] !pl-[0rem] !pr-[0.25rem] box-border min-w-[18.75rem] max-w-full text-center text-[10rem] text-[rgba(0,0,0,0.1)] font-[Poppins]">
                        <div className="self-stretch flex items-start relative isolate max-w-full">
                            <div className="h-[19.488rem] w-[22.994rem] absolute !!m-[0 important] top-[2.45rem] left-[-0.462rem] shadow-[0px_10px_20px_rgba(0,_0,_0,_0.3)] z-[2] overflow-hidden flex items-center justify-center shrink-0">
                                <Image
                                    className="h-full w-full shadow-[0px_10px_20px_rgba(0,_0,_0,_0.3)] z-[2] object-cover absolute left-[0rem] top-[0.625rem] [transform:scale(1.109)]"
                                    loading="lazy"
                                    width={367.9}
                                    height={311.8}
                                    sizes="100vw"
                                    alt=""
                                    src="/Yellow-Shoe@2x.png"
                                />
                            </div>
                            <div className="flex-1 shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] flex flex-col items-start justify-end !pt-[25.825rem] !pb-[1.887rem] !pl-[2.25rem] !pr-[2rem] box-border gap-[1.85rem] max-w-full shrink-0 mq800:!pt-[3.5rem] mq800:!pb-[1.25rem] mq800:box-border">
                                <div className="w-[24.538rem] h-[36.25rem] relative shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] hidden max-w-full shrink-0" />
                                <div className="flex items-start relative isolate shrink-0">
                                    <h1 className="!!m-[0 important] h-[12.5rem] w-[30rem] absolute top-[-22.691rem] right-[-32.937rem] text-[length:inherit] flex italic font-black font-[inherit] items-center justify-center shrink-0 [transform:_rotate(90.1deg)] [transform-origin:0_0] z-[1] mq800:text-[4rem] mq450:text-[2.5rem]">
                                        NIKE
                                    </h1>
                                    <h2 className="!m-0 relative text-[2.5rem] font-bold font-['Work_Sans'] text-[#000] text-left z-[2] shrink-0 mq800:text-[2rem] mq450:text-[1.5rem]">
                                        Air Max 97
                                    </h2>
                                </div>
                                <div className="self-stretch flex items-start justify-between gap-[1.25rem] shrink-0 text-left text-[1.25rem] text-[#000] font-['Work_Sans'] mq450:flex-wrap mq450:gap-[1.25rem]">
                                    <h3 className="!m-0 relative text-[length:inherit] font-normal font-[inherit] shrink-0 z-[2] mq450:text-[1rem]">
                                        $20.99
                                    </h3>
                                    <div className="flex flex-col items-start !pt-[0.443rem] !pb-[0rem] !pl-[0rem] !pr-[0rem]">
                                        <div className="w-[3.438rem] h-[3.306rem] relative rounded-[35px] bg-[#fff] shrink-0 z-[1]">
                                            <div className="absolute top-[0rem] left-[0rem] rounded-[35px] bg-[#fff] w-full h-full hidden" />
                                            <div className="absolute top-[0rem] left-[0rem] rounded-[35px] bg-[#fff] w-full h-full hidden">
                                                <div className="absolute top-[0rem] left-[0rem] rounded-[35px] bg-[#fff] w-full h-full hidden" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="flex-[1.2195] flex items-start relative isolate min-w-[18.75rem] max-w-full text-left text-[2.5rem] text-[#000] font-['Work_Sans']">
                        <div className="h-[21.9rem] w-[24.575rem] absolute !!m-[0 important] top-[3.013rem] left-[-0.306rem] shadow-[0px_10px_20px_rgba(0,_0,_0,_0.25)] z-[3] overflow-hidden flex items-center justify-center shrink-0">
                            <Image
                                className="h-full w-full shadow-[0px_10px_20px_rgba(0,_0,_0,_0.25)] z-[3] object-cover absolute left-[0rem] top-[0.625rem] [transform:scale(1.102)]"
                                loading="lazy"
                                width={393.2}
                                height={350.4}
                                sizes="100vw"
                                alt=""
                                src="/images/4.png"
                            />
                        </div>
                        <div className="flex-1 shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] flex flex-col items-start justify-end !pt-[25.85rem] !pb-[1.887rem] !pl-[2.562rem] !pr-[2rem] box-border gap-[1.875rem] max-w-full shrink-0 mq800:!pt-[3.5rem] mq800:!pb-[1.25rem] mq800:box-border mq450:gap-[0.938rem]">
                            <div className="w-[24.694rem] h-[36.25rem] relative shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] hidden max-w-full shrink-0" />
                            <div className="flex items-start relative isolate shrink-0">
                                <h2 className="!m-0 relative text-[length:inherit] font-bold font-[inherit] z-[1] shrink-0 mq800:text-[2rem] mq450:text-[1.5rem]">
                                    React Presto
                                </h2>
                                <h1 className="!!m-[0 important] h-[12.5rem] w-[30rem] absolute top-[-22.716rem] right-[-29.919rem] text-[10rem] flex italic font-black font-[Poppins] text-[rgba(0,0,0,0.1)] text-center items-center justify-center shrink-0 [transform:_rotate(90.1deg)] [transform-origin:0_0] z-[2] mq800:text-[4rem] mq450:text-[2.5rem]">
                                    NIKE
                                </h1>
                            </div>
                            <div className="self-stretch flex items-start justify-between gap-[1.25rem] shrink-0 text-[1.25rem] mq450:flex-wrap mq450:gap-[1.25rem]">
                                <h3 className="!m-0 relative text-[length:inherit] font-normal font-[inherit] shrink-0 z-[3] mq450:text-[1rem]">
                                    $20.99
                                </h3>
                                <div className="flex flex-col items-start !pt-[0.393rem] !pb-[0rem] !pl-[0rem] !pr-[0rem]">
                                    <div className="w-[3.438rem] h-[3.306rem] relative rounded-[35px] bg-[#fff] shrink-0 z-[1]">
                                        <div className="absolute top-[0rem] left-[0rem] rounded-[35px] bg-[#fff] w-full h-full hidden" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="flex-1 shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] flex flex-col items-start !pt-[3.106rem] !pb-[2.012rem] !pl-[2.625rem] !pr-[1.875rem] box-border min-w-[18.75rem] max-w-full text-center text-[10rem] text-[rgba(0,0,0,0.1)] font-[Poppins] mq800:!pt-[3.5rem] mq800:!pb-[1.313rem] mq800:box-border mq450:!pl-[1.25rem] mq450:box-border">
                        <div className="w-[25rem] h-[36.25rem] relative shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] hidden max-w-full z-[1] shrink-0" />
                        <div className="flex items-start !pt-[0rem] !pb-[0rem] !pl-[3.562rem] !pr-[3.562rem] shrink-0 mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border">
                            <div className="w-[12.569rem] flex items-start relative isolate min-h-[30.063rem]">
                                <h1 className="!m-0 relative text-[length:inherit] inline-block italic font-black font-[inherit] [transform:_rotate(90.1deg)] max-w-full z-[1] shrink-0 mq800:text-[4rem] mq450:text-[2.5rem]">
                                    NIKE
                                </h1>
                                <Image
                                    className="h-[21.725rem] w-[22.194rem] absolute !!m-[0 important] top-[-2.187rem] left-[-5.912rem] shadow-[0px_10px_20px_rgba(0,_0,_0,_0.25)] object-contain z-[2] shrink-0"
                                    loading="lazy"
                                    width={355.1}
                                    height={347.6}
                                    sizes="100vw"
                                    alt=""
                                    src="/images/4.png"
                                />
                                <h2 className="!!m-[0 important] absolute bottom-[4.381rem] left-[-3.569rem] text-[2.5rem] font-bold font-['Work_Sans'] text-[#000] text-left shrink-0 z-[2] mq800:text-[2rem] mq450:text-[1.5rem]">
                                    KD13 EP
                                </h2>
                            </div>
                        </div>
                        <div className="self-stretch flex items-start justify-between gap-[1.25rem] !mt-[-2.525rem] relative shrink-0 text-left text-[1.25rem] text-[#000] font-['Work_Sans'] mq450:flex-wrap mq450:gap-[1.25rem]">
                            <h3 className="!m-0 relative text-[length:inherit] font-normal font-[inherit] shrink-0 z-[1] mq450:text-[1rem]">
                                $20.99
                            </h3>
                            <div className="flex flex-col items-start !pt-[0.318rem] !pb-[0rem] !pl-[0rem] !pr-[0rem]">
                                <div className="w-[3.438rem] h-[3.306rem] relative rounded-[35px] bg-[#fff] shrink-0 z-[1]">
                                    <div className="absolute top-[0rem] left-[0rem] rounded-[35px] bg-[#fff] w-full h-full hidden" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default FrameComponent5;
