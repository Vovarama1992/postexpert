'use client'
import React from 'react';
import BlogCard from "@/components/common/Cards/BlogCard";
import PaginationCustom from "@/components/custom/PaginationCustom/PaginationCustom";
import {parseAsInteger, useQueryState} from "nuqs";
import {BlogData} from "@/types/landing";

const BlogList = ({blog}: {blog: BlogData}) => {

    const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({
        shallow: false
    }))

    return (
        <>
            <section className="my-16 max-xl:my-14 max-lg:my-12 max-md:my-10 container gap-6 grid grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3">
                {
                    blog.blogPosts.data.map(blog => {
                        return <BlogCard className="" key={blog.id} blog={blog}/>
                    })
                }
            </section>
            <PaginationCustom total={blog.blogPosts.last_page} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </>
    );
};

export default BlogList;