import React from 'react';
import Image from 'next/image';
import {Store} from "@/types/main";

const Sponsor = ({store}: { store: Store }) => {
    return (
        <section className="space-y-[72px] max-xl:space-y-16 max-lg:space-y-10 overflow-hidden">
            <div className="container w-full flex flex-col gap-4 items-center">
                <span className="text-label">{store.label}</span>
                <div className="flex flex-col gap-6 items-center">
                    <h2 className="text-site-title-2 text-gray-950 max-lg:text-center">{store.title}</h2>
                    <p className="text-site-text-2 text-gray-700 max-w-[600px] text-center">{store.description}</p>
                </div>
            </div>
            <div className="relative overflow-hidden w-full">
                <div className="marquee flex items-center">
                    <div className="flex justify-between gap-10 animate-marquee whitespace-nowrap">
                        {[...store.images, ...store.images, ...store.images, ...store.images, ...store.images, ...store.images, ...store.images, ...store.images].map((partner, index) => (
                            <Image loading="lazy" width={104} height={43} key={index}
                                   className="h-[36px] w-[104px] select-none pointer-events-none" src={partner}
                                   alt={`partner-${index}`}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sponsor;