import React from 'react';
import {__API__, publisher} from "@/lib";
import {BlogOneData} from "@/types/landing";
import {generateMeta, parseAndRenderContent, parseAndRenderStringTitle} from "@/utils";
import BreadcrumbsCustom from "@/components/custom/Breadcrumbs/BreadcrumbsCustom";
import LastNews from "@/app/[locale]/components/LastNews";
import {notFound} from "next/navigation";
import Image from "next/image";

export async function generateMetadata({params: {locale, slug}}: { params: { locale: string, slug: string } }) {
    return generateMeta(locale, `/site/pages/blog/${slug}`)
}

const Page = async ({params: {locale, slug}}: { params: { locale: string, slug: string } }) => {

    const response = await fetch(`${__API__}/site/pages/blog/${slug}`, {
        headers: {
            locale
        },
    })

    const { data } = await response.json()

    if (data.status === 404) return notFound()

    const page = data as BlogOneData

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": page.title,
        "image": page.image,
        publisher,
        "description": page.text,
        "articleBody": page.content
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
                                __html: page.text
                            }}></h4>
                        <BreadcrumbsCustom items={[
                            {
                                label: "Блог",
                                href: "/blog"
                            },
                            {
                                label: page.title
                            }
                        ]}/>
                    </div>
                </section>
                <section className="pt-16 pb-[104px] max-xl:py-10 max-xl:pb-16 container ">
                    <div className="flex flex-col  mx-auto max-w-[840px]">
                        <Image src={page.image} alt={'preview'}
                               className="rounded-3xl h-[460px] object-cover mb-12 max-xl:mb-8 object-top" quality={100}
                               height={460} width={840}/>
                        <div className="flex flex-col gap-6  w-full" dangerouslySetInnerHTML={{
                            __html: parseAndRenderContent(page.content)
                        }}></div>
                    </div>
                </section>
                <LastNews last={page.latestPosts}/>
            </main>
        </>
    );
};

export default Page;
