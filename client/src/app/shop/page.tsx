import type { NextPage } from "next";
import Image from "next/image";

export type ShopCategoriesType = {
    className?: string;
};

const ShopCategories: NextPage<ShopCategoriesType> = ({ className = "" }) => {
    return (
        <section
            className={`self-stretch flex items-start !pt-[0rem] !pb-[0rem] !pl-[3.125rem] !pr-[3.125rem] box-border max-w-full text-left text-[2.5rem] text-[#000] font-[Montserrat] mq800:!pl-[1.563rem] mq800:!pr-[1.563rem] mq800:box-border ${className}`}
        >
            <div className="flex-1 flex flex-col items-start gap-[1.875rem] max-w-full">
                <h2 className="!m-0 relative text-[length:inherit] font-bold font-[inherit] inline-block max-w-full mq800:text-[2rem] mq450:text-[1.5rem]">
                    Buy by category
                </h2>
                <div className="w-[81.25rem] flex flex-col items-end max-w-full text-[2.25rem]">
                    <div className="flex items-start gap-[11.312rem] max-w-full mq800:gap-[2.813rem] mq1125:gap-[5.625rem] mq1125:flex-wrap mq450:gap-[1.438rem]">
                        <div className="flex flex-col items-start !pt-[16.437rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] mq1125:flex-1">
                            <h2 className="!m-0 relative text-[length:inherit] tracking-[0.3em] italic font-bold font-[inherit] mq800:text-[1.813rem] mq450:text-[1.375rem]">
                                WORKOUT
                            </h2>
                        </div>
                        <Image
                            className="h-[35.625rem] flex-1 relative max-w-full overflow-hidden object-cover min-w-[26.5rem] mq800:min-w-full"
                            loading="lazy"
                            width={652}
                            height={570}
                            sizes="100vw"
                            alt=""
                            src="/karlie-core-1-1@2x.png"
                        />
                    </div>
                    <div className="self-stretch flex items-start max-w-full">
                        <div className="w-[64.25rem] flex items-start justify-between gap-[1.25rem] max-w-full mq1125:flex-wrap mq1125:gap-[1.25rem]">
                            <Image
                                className="w-[40.5rem] relative max-h-full object-cover max-w-full z-[1]"
                                loading="lazy"
                                width={648}
                                height={567}
                                sizes="100vw"
                                alt=""
                                src="/salty-1@2x.png"
                            />
                            <div className="flex flex-col items-start !pt-[16.25rem] !pb-[0rem] !pl-[0rem] !pr-[0rem]">
                                <h2 className="!m-0 relative text-[length:inherit] tracking-[0.3em] italic font-bold font-[inherit] mq800:text-[1.813rem] mq450:text-[1.375rem]">
                                    RUN
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-[11.437rem] max-w-full mq800:gap-[2.875rem] mq1125:gap-[5.688rem] mq1125:flex-wrap mq450:gap-[1.438rem]">
                        <div className="w-[17.5rem] flex flex-col items-start !pt-[16.375rem] !pb-[0rem] !pl-[0rem] !pr-[0rem] box-border mq1125:flex-1">
                            <h2 className="!m-0 self-stretch relative text-[length:inherit] tracking-[0.3em] italic font-bold font-[inherit] mq800:text-[1.813rem] mq450:text-[1.375rem]">
                                FOOTBALL
                            </h2>
                        </div>
                        <Image
                            className="h-[35.625rem] flex-1 relative max-w-full overflow-hidden object-cover min-w-[26.5rem] mq800:min-w-full"
                            loading="lazy"
                            width={652}
                            height={570}
                            sizes="100vw"
                            alt=""
                            src="/9n9z-1@2x.png"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopCategories;
