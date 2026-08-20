import type { NextPage } from "next";
import Image from "next/image";

export type FrameComponent7Type = {
    className?: string;
};

const FrameComponent7: NextPage<FrameComponent7Type> = ({ className = "" }) => {
    return (
        <section
            className={`self-stretch flex flex-col items-start gap-[1.875rem] max-w-full text-left text-[2.5rem] text-[#000] font-[Montserrat] ${className}`}
        >
            <div className="flex items-start !pt-[0rem] !pb-[0rem] !pl-[3.125rem] !pr-[3.125rem] box-border max-w-full mq800:!pl-[1.563rem] mq800:!pr-[1.563rem] mq800:box-border">
                <h2 className="!m-0 relative text-[length:inherit] uppercase font-bold font-[inherit] mq800:text-[2rem] mq450:text-[1.5rem]">
                    More Nike products
                </h2>
            </div>
            <section className="self-stretch flex flex-col items-start !pt-[2.75rem] !pb-[2.75rem] !pl-[3.125rem] !pr-[1.25rem] box-border gap-[1.562rem] bg-[url('/Group-66@3x.png')] bg-cover bg-no-repeat bg-[top] max-w-full text-left text-[2.5rem] text-[#fff] font-[Montserrat] mq800:!pl-[1.563rem] mq800:box-border">
                <Image
                    className="w-[87.5rem] h-[20.25rem] relative object-cover hidden max-w-full shrink-0"
                    width={1400}
                    height={324}
                    sizes="100vw"
                    alt=""
                    src="/image-11@2x.png"
                />
                <h1 className="!m-0 w-[19.25rem] relative text-[length:inherit] inline-block italic font-black font-[inherit] z-[1] shrink-0 mq800:text-[2rem] mq450:text-[1.5rem]">
                    YOUR NIKE MEMBERSHIP
                </h1>
                <div className="w-[27.875rem] relative text-[1.25rem] inline-block max-w-full z-[1] shrink-0 mq450:text-[1rem]">
                    <span>{`Join our members and show your love with `}</span>
                    <b>Nike By You!</b>
                </div>
                <div className="rounded-2xl bg-[#fff] flex items-start !pt-[0.625rem] !pb-[0.625rem] !pl-[2.875rem] !pr-[2.875rem] z-[1] shrink-0 text-[1rem] text-[#000]">
                    <div className="h-[2.5rem] w-[9.375rem] relative rounded-2xl bg-[#fff] hidden shrink-0" />
                    <div className="relative z-[1] shrink-0">Join Us</div>
                </div>
            </section>
        </section>
    );
};

export default FrameComponent7;
