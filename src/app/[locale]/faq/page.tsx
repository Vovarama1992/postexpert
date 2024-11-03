import React from 'react';
import BreadcrumbsCustom from "@/components/custom/Breadcrumbs/BreadcrumbsCustom";
import FaqList from "@/app/[locale]/faq/components/FaqList";
import {__API__} from "@/lib";
import {FaqData} from "@/types/landing";
import {generateMeta, parseAndRenderStringTitle, stripHtmlTags} from "@/utils";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
    return generateMeta(locale, '/site/pages/faq')
}

const Page = async ({params: {locale}}: {
    params: { locale: string },
    searchParams: { page?: string, category?: string }
}) => {

    const response = await fetch(`${__API__}/site/pages/faq`, {
        headers: {
            locale
        },
    })

    const { data } = await response.json()

    const page = data as FaqData

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": page.faqs.data.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    }


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
                    className={`pt-[72px] page-section-top relative`}>
                    <div className="flex flex-col gap-6 items-center z-10 relative container">
                        <h1 className="text-site-title-5 text-white text-center " dangerouslySetInnerHTML={{
                            __html: parseAndRenderStringTitle(page.title)
                        }}>
                        </h1>
                        <h4 className="text-xl leading-[31px] text-white/80 max-w-[640px] text-center"
                            dangerouslySetInnerHTML={{
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
                <FaqList faq={page}/>
            </main>
        </>
    );
};

export default Page;
