import type { NextPage } from "next";
import Image from "next/image";

export type FooterNavigationType = {
    className?: string;
};

const FooterNavigation: NextPage<FooterNavigationType> = ({
    className = "",
}) => {
    return (
        <footer
            className={`self-stretch bg-[#000] overflow-hidden flex items-start justify-between !pt-[3.125rem] !pb-[3.125rem] !pl-[3.125rem] !pr-[3.062rem] box-border gap-[1.25rem] max-w-full !mt-[-2.25rem] relative text-center text-[1.125rem] text-[#fff] font-[Montserrat] mq800:gap-[1.25rem] mq800:!pl-[1.563rem] mq800:!pr-[1.5rem] mq800:box-border mq1125:flex-wrap mq1125:gap-[1.25rem] ${className}`}
        >
            <div className="flex flex-col items-start !pt-[1.625rem] !pb-[0rem] !pl-[0rem] !pr-[1.25rem]">
                <div className="flex flex-col items-center justify-center gap-[3.125rem]">
                    <div className="w-[2.563rem] relative flex items-center justify-center">
                        ALL
                    </div>
                    <h3 className="!m-0 w-[5.569rem] relative text-[1.25rem] font-normal font-[inherit] flex items-center justify-center mq450:text-[1rem]">
                        WOMAN
                    </h3>
                    <div className="w-[2.75rem] relative flex items-center justify-center">
                        MEN
                    </div>
                </div>
            </div>
            <div className="h-[13.75rem] w-[31.25rem] flex items-start relative isolate max-w-full">
                <div className="h-full w-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem]">
                    <Image
                        className="absolute h-full top-[0rem] bottom-[0rem] left-[8.75rem] max-h-full w-[13.75rem] object-cover"
                        width={220}
                        height={220}
                        sizes="100vw"
                        alt=""
                        src="/Logo-Background@2x.png"
                    />
                    <Image
                        className="absolute top-[0.75rem] left-[0rem] w-[31.25rem] h-[12.2rem] z-[1]"
                        width={500}
                        height={195.2}
                        sizes="100vw"
                        alt=""
                        src="/Accent-Graphic.svg"
                    />
                </div>
            </div>
            <div className="flex flex-col items-start !pt-[1.625rem] !pb-[0rem] !pl-[0rem] !pr-[0rem]">
                <div className="self-stretch flex-1 flex flex-col items-center gap-[3.125rem]">
                    <div className="relative">WORCOUT</div>
                    <div className="relative">RUN</div>
                    <h3 className="!m-0 relative text-[1.25rem] font-normal font-[inherit] mq450:text-[1rem]">
                        FOOTBALL
                    </h3>
                </div>
            </div>
        </footer>
    );
};

export default FooterNavigation;
