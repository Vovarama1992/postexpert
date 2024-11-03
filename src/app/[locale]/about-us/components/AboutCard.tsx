'use client';

import React from 'react';
import Image from "next/image";
import { Link } from "@/navigation";
import { ChevronIcon } from "@/assets";
import { BlogPost } from "@/types/about";

const AboutCard = ({ blog }: { blog: BlogPost }) => {
    return (
        <figure className="flex flex-col gap-6">
            <Image
                quality={100}
                src={blog.image}
                alt={blog.title}
                width={676}
                height={380}
                className="h-[380px] w-full object-cover object-center rounded-3xl pointer-events-none select-none"
            />
            <div className="space-y-4">
                <h6 className="text-[26px] font-semibold text-gray-900 leading-normal">
                    {blog.title}
                </h6>
                <p className="text-[18px] leading-[26px] text-gray-700">{blog.text}</p>
                {blog.link && (
                    <Link
                        // @ts-ignore
                        href={blog.link.url} className="button-link-indigo">
                        <span className=" font-medium">{blog.link.label}</span>
                        <ChevronIcon  />
                    </Link>
                )}
            </div>
        </figure>
    );
};

export default AboutCard;
