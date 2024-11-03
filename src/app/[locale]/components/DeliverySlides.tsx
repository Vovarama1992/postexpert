'use client';

import React from 'react';
import Card from '../components/Slide';
import { Features } from "@/types/main";

const DeliverySlides = ({ features }: { features: Features }) => {
    return (
        <section className="bg-gray-50 pb-[88px] max-xl:pb-[72px] ">
            <div className="container">
                <div className="relative flex flex-col items-center max-w-full gap-6 mx-auto  pt-[88px] pt-footer">
                    <span className="text-label">{features.label}</span>
                    <div className="flex flex-col gap-6 items-center">
                        <h2 className="text-site-title-2 text-gray-950 max-w-[800px] text-center">
                            {features.title}
                        </h2>
                        <p className="text-site-text-2 text-gray-700 max-w-[600px] text-center">
                            {features.description}
                        </p>
                    </div>
                    {features.blocks.map((card, i) => (
                        <Card
                            key={`card_${i}`}
                            card={card}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DeliverySlides;
