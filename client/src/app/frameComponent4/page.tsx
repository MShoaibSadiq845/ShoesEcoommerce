"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type FrameComponent2Type = {
    className?: string;

    /** Style props */
    frameDivFlex?: CSSProperties["flex"];
    frameDivWidth?: CSSProperties["width"];
};

const FrameComponent2: NextPage<FrameComponent2Type> = ({
    className = "",
    frameDivFlex,
    frameDivWidth,
}) => {
    const frameDivStyle: CSSProperties = useMemo(() => {
        return {
            flex: frameDivFlex,
            width: frameDivWidth,
        };
    }, [frameDivFlex, frameDivWidth]);

    return (
        <div
            className={`flex-1 shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] flex flex-col items-start !pt-[3.206rem] !pb-[1.712rem] !pl-[3rem] !pr-[3rem] box-border gap-[3.775rem] max-w-full shrink-0 text-left text-[1.875rem] text-[#ff3939] font-[Montserrat] mq450:gap-[1.875rem] mq450:!pl-[1.25rem] mq450:!pr-[1.25rem] mq450:box-border ${className}`}
            style={frameDivStyle}
        >
            <div className="w-[37.913rem] h-[17.056rem] relative shadow-[5px_5px_25px_rgba(0,_0,_0,_0.25)] rounded-[18px] bg-[#efefef] hidden max-w-full shrink-0" />
            <div className="flex flex-col items-start gap-[1.15rem] shrink-0">
                <div className="flex items-start gap-[0.668rem]">
                    <h2 className="!m-0 relative text-[length:inherit] font-bold font-[inherit] z-[1] shrink-0 mq800:text-[1.5rem] mq450:text-[1.125rem]">
                        -20%
                    </h2>
                    <div className="flex flex-col items-start !pt-[0.375rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] shrink-0 text-[1.5rem]">
                        <h3 className="!m-0 relative text-[length:inherit] font-bold font-[inherit] z-[2] mq450:text-[1.188rem]">
                            Discount
                        </h3>
                    </div>
                </div>
                <h3 className="!m-0 relative text-[1.25rem] font-normal font-[inherit] text-[#202727] z-[2] mq450:text-[1rem]">
                    on your first purchase
                </h3>
            </div>
            <div className="rounded-2xl bg-[#000] flex items-start !pt-[0.943rem] !pb-[0.943rem] !pl-[2.312rem] !pr-[2.312rem] z-[2] shrink-0 text-[1.25rem] text-[#fff]">
                <div className="h-[3.394rem] w-[11.263rem] relative rounded-2xl bg-[#000] hidden shrink-0" />
                <h3 className="!m-0 relative text-[length:inherit] font-normal font-[inherit] inline-block min-w-[6.544rem] z-[3] shrink-0">
                    Shop now
                </h3>
            </div>
        </div>
    );
};

export default FrameComponent2;
