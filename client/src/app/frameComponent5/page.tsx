import type { NextPage } from "next";
import Image from "next/image";
import FrameComponent2 from "../frameComponent4/page";

export type FrameComponent6Type = {
    className?: string;
};

const FrameComponent6: NextPage<FrameComponent6Type> = ({ className = "" }) => {
    return (
        <section
            className={`flex items-start !pt-[0rem] !pb-[0rem] !pl-[3.125rem] !pr-[3.125rem] box-border max-w-full text-left text-[1.875rem] text-[#ff3939] font-[Montserrat] mq1325:!pl-[1.563rem] mq1325:!pr-[1.563rem] mq1325:box-border ${className}`}
        >
            <div className="flex items-start gap-[3.337rem] max-w-full mq800:gap-[1.688rem] mq1325:flex-wrap">
                <div className="w-[37.913rem] flex items-start relative isolate max-w-full">
                    <div className="h-[27.294rem] w-[29.969rem] absolute !!m-[0 important] top-[-5.956rem] right-[-4.606rem] shadow-[0px_15px_30px_rgba(0,_0,_0,_0.25)] z-[1] overflow-hidden flex items-center justify-center shrink-0">
                        <Image
                            className="h-full w-full shadow-[0px_15px_30px_rgba(0,_0,_0,_0.25)] z-[1] object-cover absolute left-[0rem] top-[0.938rem] [transform:scale(1.125)]"
                            loading="lazy"
                            width={479.5}
                            height={436.7}
                            sizes="100vw"
                            alt=""
                            src="/Nike-Shoe@2x.png"
                        />
                    </div>
                    <FrameComponent2 />
                </div>
                <FrameComponent2 frameDivFlex="unset" frameDivWidth="37.913rem" />
            </div>
        </section>
    );
};

export default FrameComponent6;
