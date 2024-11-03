'use client';

import React from 'react';
import { Link } from "@/navigation";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { BlogPost } from "@/types/landing";

const BlogCard = ({ className, blog }: { className?: string, blog: BlogPost }) => {
    return (
        <Link
            // @ts-ignore
            href={`/blog/${blog.slug}`} scroll
            className={twMerge(
                "flex flex-col gap-[18px] rounded-3xl h-full w-full min-h-[465px] max-xl:min-h-[404px] select-none transition-all duration-300 hover:bg-blue-50 hover:border-blue-300 border border-transparent",
                className
            )}
        >
            <Image
                quality={100}
                loading="lazy"
                src={blog.image}

                alt={'news'}
                width={340}
                height={380}
                className="rounded-3xl w-full object-top aspect-h-1 object-cover aspect-w-1 h-[360px] max-xl:h-[300px] transition-opacity duration-300 hover:opacity-90"
            />
            <div className="space-y-2 p-2 pt-0">
                <h6 className="text-site-text-1 !leading-normal font-semibold text-gray-900 transition-colors duration-300 hover:text-indigo-600">
                    {blog.title}
                </h6>
                <p className="] tracking-[-0.01em] line-clamp-3 text-normal !leading-[23px] text-gray-600 transition-colors duration-300 hover:text-indigo-800">
                    {blog.text}
                </p>
            </div>
        </Link>
    );
};

export default BlogCard;
