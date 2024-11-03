import React from 'react';
import {ChevronIcon, PeopleIcon, RadarIcon, SMSEditIcon} from "@/assets";
import {Link} from "@/navigation";
import {InfoBlock} from "@/types/landing";
import {listIcons} from "@/utils";

const PromptList = ({
                        variant = 1, blocks
                    }: { variant?: 1 | 2, blocks: InfoBlock[] }) => {
    return (
        <section className={
            `  grid grid-cols-3 max-md:grid-cols-1 max-lg:grid-cols-2 items-center container gap-6  ${variant === 1 ? 'mt-[88px] pt-10' : ''}`
        }>
            {
                blocks.map(block => {

                    const Icon = listIcons[block.icon]

                    return <figure key={block.id}
                        className="rounded-3xl px-12 max-xl:px-8 max-sm:px-4 flex flex-col items-center gap-8  w-full basis-1/3 ">
                        <button className="size-[72px] flex items-center justify-center  rounded-xl bg-gray-100 ">
                            <Icon className="text-gray-900 size-11 "/>
                        </button>
                       <div className="space-y-4">
                           <h6 className="text-site-sub-title-1 text-gray-900 text-center">
                               {block.title}
                           </h6>
                           <p className="text-site-text-1 text-gray-700 text-center">
                               {block.description}
                           </p>
                       </div>
                        {block?.link ? <Link
                            // @ts-ignore
                            href={block.link.url} className="button-link-indigo">
                            <span className="text-[17px] leading-normal font-medium ">{block.link.label}</span>
                            <ChevronIcon className="size-4 "/>
                        </Link> : null}
                    </figure>
                })
            }
        </section>
    );
};

export default PromptList;
