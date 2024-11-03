import BreadcrumbsCustom from '@/components/custom/Breadcrumbs/BreadcrumbsCustom';
import React from 'react';
import BlogList from "@/app/[locale]/blog/components/BlogList";
import {__API__, publisher} from "@/lib";
import {BlogData, BlogPost} from "@/types/landing";
import {generateMeta, parseAndRenderStringTitle, stripHtmlTags} from "@/utils";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
    return generateMeta(locale, '/site/pages/blog')
}

const Page = async ({params: {locale}}: {
    params: { locale: string },
}) => {

    const response = await fetch(`${__API__}/site/pages/blog`, {
        headers: {
            locale
        },
    })

    const { data } = await response.json()

    const page = data as BlogData

    const jsonLd = page.blogPosts.data.map((post: BlogPost) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        publisher,
        "description": stripHtmlTags(post.text),
        "articleBody": stripHtmlTags(post.content)
    }));



    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                />
            )}
            <main className="flex flex-col  bg-white">
                <section
                    className={` relative page-section-top`}>
                    <div className="flex flex-col flex-1 gap-6 items-center z-10 relative container">
                        <h1 className="text-site-title-5 text-white text-center " dangerouslySetInnerHTML={{
                            __html: parseAndRenderStringTitle(page.title)
                        }}>

                        </h1>
                        <h4 className="text-xl leading-[31px] text-white/80 max-w-[640px] text-center"
                            dangerouslySetInnerHTML={{
                                __html: page.description
                            }}></h4>
                        <BreadcrumbsCustom items={[
                            {
                                label: locale === 'en' ? 'Blog' : "Блог",
                            }
                        ]}/>
                    </div>
                </section>
                <BlogList blog={page}/>
            </main>
        </>
    );
};

export default Page;
