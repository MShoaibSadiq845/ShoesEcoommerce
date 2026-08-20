import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponent4Type = {
    className?: string;
};

const FrameComponent4: NextPage<FrameComponent4Type> = ({ className = "" }) => {
    return (
        <div
            className={`self-stretch flex flex-col items-start !pt-[0rem] !pb-[5.312rem] !pl-[0rem] !pr-[0rem] box-border gap-[1rem] max-w-full mq450:!pb-[3.438rem] mq450:box-border ${className}`}
        >
            <header className="self-stretch flex items-start !pt-[0rem] !pb-[0rem] !pl-[3.125rem] !pr-[3.125rem] box-border max-w-full text-center text-[1.25rem] text-[#000] font-[Montserrat] mq800:!pl-[1.563rem] mq800:!pr-[1.563rem] mq800:box-border">
                <div className="self-stretch flex-1 flex items-start gap-[3.125rem] max-w-full mq800:gap-[1.563rem]">
                    <div className="flex flex-col items-start !pt-[0.437rem] !pb-[0rem] !pl-[0rem] !pr-[0rem]">
                        <h3 className="!m-0 self-stretch relative text-[length:inherit] font-normal font-[inherit]">
                            WOMAN
                        </h3>
                    </div>
                    <div className="self-stretch flex-1 flex items-start gap-[14.125rem] max-w-full text-[1.125rem] mq800:gap-[3.5rem] mq450:gap-[1.75rem] mq1325:gap-[7.063rem]">
                        <div className="w-[8.556rem] flex flex-col items-start !pt-[0.5rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] box-border">
                            <div className="self-stretch flex items-start justify-between gap-[1.25rem]">
                                <div className="relative">MEN</div>
                                <div className="h-[2.188rem] w-[2.813rem] flex flex-col items-start !pt-[0rem] !pb-[0.125rem] !pl-[0rem] !pr-[0rem] box-border gap-[0.687rem]">
                                    <div className="self-stretch flex items-start !pt-[0rem] !pb-[0rem] !pl-[0.125rem] !pr-[0.125rem]">
                                        <b className="flex-1 relative">ALL</b>
                                    </div>
                                    <div className="w-[2.938rem] h-[0.125rem] relative border-[#000] border-solid border-t-[2px] box-border" />
                                </div>
                            </div>
                        </div>
                        <div className="w-[24.75rem] flex flex-col items-start !pt-[0rem] !pb-[0rem] !pl-[0rem] !pr-[1.25rem] box-border max-w-full text-left text-[2rem] text-[#a0a0a0]">
                            <h2 className="!m-0 relative text-[length:inherit] tracking-[0.1em] uppercase whitespace-nowrap font-[inherit]">
                                <span>your</span>
                                <b className="text-[#000]">SNEAKER</b>
                            </h2>
                        </div>
                        <div className="w-[11rem] flex flex-col items-start !pt-[0.25rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] box-border">
                            <div className="self-stretch flex items-end justify-between gap-[1.25rem]">
                                <Image
                                    className="h-[1.875rem] w-[1.625rem] relative"
                                    width={26}
                                    height={30}
                                    sizes="100vw"
                                    alt=""
                                    src="/.svg"
                                />
                                <div className="flex flex-col items-start justify-end !pt-[0rem] !pb-[0.125rem] !pl-[0rem] !pr-[0rem]">
                                    <Image
                                        className="w-full h-[1.563rem] relative"
                                        width={25}
                                        height={25}
                                        sizes="100vw"
                                        alt=""
                                        src="/.svg"
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-end !pt-[0rem] !pb-[0.125rem] !pl-[0rem] !pr-[0rem]">
                                    <Image
                                        className="w-full h-[1.563rem] relative"
                                        width={25}
                                        height={25}
                                        sizes="100vw"
                                        alt=""
                                        src="/.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="self-stretch flex flex-col items-start !pt-[3.125rem] !pb-[1.875rem] !pl-[3.125rem] !pr-[1.25rem] box-border gap-[1.843rem] bg-[url('/Promotion@3x.png')] bg-cover bg-no-repeat bg-[top] max-w-full text-left text-[2.5rem] text-[#fff] font-[Montserrat] mq800:!pl-[1.563rem] mq800:box-border">
                <Image
                    className="w-[87.5rem] h-[18.75rem] relative object-cover hidden max-w-full shrink-0"
                    width={1400}
                    height={300}
                    sizes="100vw"
                    alt=""
                    src="/image-12@2x.png"
                />
                <h2 className="!m-0 relative text-[length:inherit] inline-block italic font-black font-[inherit] max-w-full z-[1] shrink-0 mq800:text-[2rem] mq450:text-[1.5rem]">
                    WE ARE NEVER DONE
                </h2>
                <div className="w-[34.938rem] relative text-[1.25rem] font-black inline-block max-w-full z-[1] shrink-0 mq450:text-[1rem]">
                    Celebrating 50 years of Nike from May 16th!
                    <br />
                    Exclusive products, experiences and much more await you for five days.
                    Scan and join the Nike app!
                </div>
                <div className="rounded-2xl bg-[#fff] flex items-start !pt-[0.625rem] !pb-[0.625rem] !pl-[1.562rem] !pr-[1.562rem] z-[1] shrink-0 text-[1rem] text-[#000]">
                    <div className="h-[2.5rem] w-[12.5rem] relative rounded-2xl bg-[#fff] hidden shrink-0" />
                    <div className="relative font-semibold z-[2] shrink-0">
                        Celebrate with us
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FrameComponent4;
