'use client';

import React from 'react';
import { AboutUsData } from "@/types/about";
import AboutCard from "@/app/[locale]/about-us/components/AboutCard";
import {IndigoButton} from "@/components/custom";

const AboutSlides = ({ page }: { page: AboutUsData }) => {
    return (
        <section className="grid gap-x-16 gap-y-10 grid-cols-[1fr_1.1fr] container max-xl:grid-cols-1 max-xl:max-w-[676px]">
            <div className="space-y-4 sticky max-xl:top-0 top-20 self-start max-xl:relative">
                <span className="text-label">{page.blog.label}</span>
                <div className="space-y-6">
                    <h3 className="text-site-title-3 text-gray-950">About Information</h3>
                    <p className="text-site-text-1 leading-[136.2%]">{page.blog.description}</p>
                    <IndigoButton href={page.blog.button.link} type="button" className="!bg-BG w-[140px]">
                        {page.blog.button.label}
                    </IndigoButton>
                </div>
            </div>
            <div className="space-y-16">
                {page.blog.posts.map((blog, index) => (
                    <AboutCard key={index} blog={blog} />
                ))}
            </div>
        </section>
    );
};

export default AboutSlides;
