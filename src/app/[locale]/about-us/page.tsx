import React from 'react';
import BreadcrumbsCustom from "@/components/custom/Breadcrumbs/BreadcrumbsCustom";
import PromptList from "@/app/[locale]/components/PromptList";
import LastNews from "@/app/[locale]/components/LastNews";
import {__API__} from "@/lib";
import {AboutUsData} from "@/types/about";
import {generateMeta, parseAndRenderContent, parseAndRenderStringTitle, stripHtmlTags} from "@/utils";
import AboutSlides from "@/app/[locale]/about-us/components/AboutSlides";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
    return generateMeta(locale, '/site/pages/about-us')
}

const Page = async ({params: {locale}}: {params: { locale: string }}) => {

    const response = await fetch(`${__API__}/site/pages/about-us`, {
        headers: {
            locale
        }
    })

    const { data } = await response.json()

    const page = data as AboutUsData

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": page.title,
        "url": "https://www.example.com",
        "logo": "https://www.example.com/logo.png",
        "description": page.description,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-555-5555",
            "contactType": "Customer Service"
        },
        "sameAs": [
            "https://www.facebook.com/yourcompany",
            "https://twitter.com/yourcompany",
            "https://www.linkedin.com/company/yourcompany"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="flex flex-col page-gap bg-white">
                <section
                    className={` relative page-section-top`}>
                    <div className="flex flex-col gap-6 items-center z-10 relative container">
                        <h1 className="text-site-title-5 text-white text-center max-w-[840px]" dangerouslySetInnerHTML={{
                            __html: parseAndRenderStringTitle(page.title)
                        }}>
                        </h1>
                        <h4 className="text-xl leading-[31px] text-white/80 max-w-[640px] text-center" dangerouslySetInnerHTML={{
                            __html: page.description
                        }}>
                        </h4>
                        <BreadcrumbsCustom items={[
                            {
                                label: stripHtmlTags(page.title)
                            }
                        ]} className={"mt-8 self-start"}/>
                    </div>
                </section>
                <AboutSlides page={page}/>
                <section className="py-[88px] bg-BG space-y-12 max-xl:py-[72px] max-lg:py-16 max-md:py-12">
                    <div className="w-full container gap-4 flex flex-col items-center">
                        <span className="text-label">{page.mission.label}</span>
                        <div className="flex flex-col gap-6 items-center">
                            <h2 className="text-site-title-2 text-white max-w-[800px] text-center" dangerouslySetInnerHTML={{
                                __html: parseAndRenderStringTitle(page.mission.title)
                            }}>
                            </h2>
                            <p className="text-site-text-2 text-white max-w-[600px] text-center" >
                                {page.mission.description}
                            </p>
                        </div>
                    </div>
                    <div className="container w-full py-8 grid grid-cols-4 items-center gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
                        {
                            page.mission.items.map((item, index) => {
                                return <figure key={index}
                                               className="rounded-3xl border border-white/20 h-[195px] flex flex-col justify-center items-center gap-2 ">
                                    <h5 className="text-site-title-6 text-white">{item.value}</h5>
                                    <p className="text-normal font-medium text-white/80">{item.title}</p>
                                </figure>
                            })
                        }
                    </div>
                </section>
                <section className="space-y-12 container">
                    <div className="space-y-4">
                    <span className="text-label">
                    {page.delivery.label}
                </span>
                        <h2 className="text-site-title-2 text-gray-950  ">
                            {page.delivery.title}
                        </h2>
                    </div>
                    <div className="flex flex-col gap-6 w-full" dangerouslySetInnerHTML={{
                        __html: parseAndRenderContent(page.delivery.content, {
                            paragraph: 'columns-2'
                        })
                    }}>
                    </div>
                </section>
                <PromptList blocks={page.blocks} variant={2}/>
                <LastNews last={page.latestPosts}/>
            </main>
        </>
    );
};

export default Page;
