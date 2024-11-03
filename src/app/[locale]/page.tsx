import {
    ChevronIcon,
} from "@/assets";
import {Link} from "@/navigation";
import Image from "next/image";
import React from "react";
import ButtonVideo from "@/components/common/Tutorial/ButtonVideo";
import {__API__, mainEntity, publisher} from "@/lib";
import {MainData} from "@/types/main";
import {generateMeta, parseAndRenderStringTitle} from "@/utils";
import HeroBlock from "@/app/[locale]/components/HeroBlock";
import DocumentItemsBlock from "@/app/[locale]/components/DocumentItemsBlock";
import dynamic from "next/dynamic";
import { IndigoButton, StrokeButton } from "@/components/custom";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
    return generateMeta(locale, '/site/pages/main')
}

const DeliverySlides = dynamic(() => import('@/app/[locale]/components/DeliverySlides'), {
    loading: () => <p>Loading...</p>,
});

const DeliveryCalculator = dynamic(() => import('@/app/[locale]/components/DeliveryCalculator'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

const AccordionCustom = dynamic(() => import('@/components/custom/Accordion/AccordionCustom'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

const SliderReview = dynamic(() => import('@/app/[locale]/components/SliderReview'), {
    loading: () => <p>Loading...</p>,
});

const LastNews = dynamic(() => import("@/app/[locale]/components/LastNews"), {
    loading: () => <p>Loading...</p>,
});

const Sponsor = dynamic(() => import("@/app/[locale]/components/Sponsor"), {
    loading: () => <p>Loading...</p>,
});

const MainPage = async ({params: {locale}}: { params: { locale: string } }) => {

    const response = await fetch(`${__API__}/site/pages/main`, {
        headers: {
            locale
        },
    })

    const { data } = await response.json()

    const page = data as MainData

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": page.hero.title,
        "description": page.hero.description,
        "url": "https://www.example.com",
        publisher,
        mainEntity
    };

    return <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main className="flex flex-col page-gap bg-white">
            <section
                className={`pt-24 max-xl:pt-[80px] max-md:after:rounded-b-[24px] max-lg:pt-[72px] max-md:pt-16 relative after:content-['*']  after:absolute after:top-0
                space-y-24    
             after:left-0 after:w-full after:bg-BG-2 after:h-[676px] max-xl:after:h-[540px] max-lg:after:h-[466px] after:z-[0] after:rounded-b-[32px]`}>
                <div className="flex flex-col gap-6 items-center z-10 relative container">
                    <h1  className="text-site-title-1 text-white text-center max-md:max-w-[510px] max-w-[840px]" dangerouslySetInnerHTML={{
                        __html: parseAndRenderStringTitle(page.hero.title)
                    }}></h1>
                     {/*Здесь параграф*/}
                    <p className="text-xl !leading-[31px]  text-white/80 max-w-[840px] text-center max-xl:max-w-[600px]">
                        {
                            page.hero.description
                        }
                    </p>
                    <div className="pt-4 flex items-center gap-6">
                        <StrokeButton href={page.hero.button.link} className="!text-white w-40 h-16 max-lg:w-[114px] max-lg:!h-14">
                            {page.hero.button.label}
                        </StrokeButton>
                        <ButtonVideo source={page.hero.video.url}/>
                    </div>
                </div>
                <HeroBlock className="flex max-xl:hidden" blocks={page.hero.blocks}/>
            </section>
            <HeroBlock className="hidden max-xl:flex" blocks={page.hero.blocks}/>
            <DeliveryCalculator info={page.delivery_information}/>
            <DeliverySlides features={page.features}/>
            <section className="bg-BG pt-[88px] !mt-0 max-lg:pt-16 max-md:pt-12 ">
                <div className=" w-full ">
                    <div className="flex flex-col gap-4 items-center container">
                        <span className="text-label">{page.document_assistance.label}</span>
                        <div className="flex flex-col gap-6 items-center">
                            <h2 className="text-site-title-2 text-white max-w-[800px] text-center">{page.document_assistance.title}</h2>
                            <p className="text-site-text-2 text-white text-center max-w-[600px]">{page.document_assistance.description}</p>
                        </div>
                    </div>
                    <div className="mt-12 space-y-10 max-2xl:mt-[88px] container max-lg:mt-10">
                        <div className="flex gap-14 max-sm:gap-12 max-2xl:gap-14 max-xl:flex-col max-xl:max-w-[800px] max-xl:mx-auto">
                            <div className="basis-1/2 flex justify-center relative after:content-['*'] after:z-[1] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-white/40">
                                <Image loading="lazy" width={444} height={779} src={page.document_assistance.features.image} alt={'previewIphone.png'}
                                       className="xl:max-h-[779px] max-xl:h-[701px] h-[779px] max-sm:w-[309px] z-[2] max-sm:h-[505px] max-lg:h-[580px] max-lg:w-[356px]  pointer-events-none select-none"/>
                            </div>
                            <div className="basis-1/2">
                                <AccordionCustom options={page.document_assistance.features.services.map(el => ({
                                    answer: el.description, question: el.title
                                }))}/>
                            </div>
                        </div>
                    </div>
                    <DocumentItemsBlock steps={page.document_assistance.steps.items}/>
                    <div className="my-14 flex items-center max-sm:flex-col justify-center gap-6 container">
                        <IndigoButton href={page.document_assistance.steps.button.link}
                                      className="bg-blue-400 font-medium h-[60px] max-xl:h-14 max-sm:w-full w-[173px]  !text-small-2 !text-white"
                                      color="primary">
                            {page.document_assistance.steps.button.label}
                        </IndigoButton>
                        <ButtonVideo source={page.document_assistance.steps.video.url}/>
                    </div>
                    <Image quality={60} src={'/img/preview.png'} alt={'preview'} loading="lazy"
                           className="w-full object-contain pointer-events-none max-lg:h-[522px] max-md:h-auto h-[595px] object-bottom container" height={730} width={750}/>
                </div>
            </section>
            <section className="container">
                <div className="w-full gap-14 max-xl:gap-10 grid grid-cols-[1fr_1.5fr] max-xl:grid-cols-1">
                    <div className="flex flex-col gap-4 max-xl:items-center ">
                        <span className="text-label">{page.faq.label}</span>
                        <div className="flex flex-col gap-6 max-xl:items-center">
                            <h3 className="max-md:text-center text-site-title-3 text-gray-950">{page.faq.title}</h3>
                            <p className="text-site-text-1 leading-[136.2%] max-xl:text-center">{page.faq.description}</p>
                            <Link
                                // @ts-ignore
                                href={page.faq.link.url} className="button-link-indigo xl:self-start" scroll>
                                <span >{page.faq.link.label}</span>
                                <ChevronIcon />
                            </Link>
                        </div>
                    </div>
                    <AccordionCustom options={page.faq.items} variant="light"/>
                </div>
            </section>
            <section className="bg-BG py-[88px] max-xl:py-[72px] max-lg:py-16 max-md:py-12">
                <div className="lg:container w-full">
                    <div className=" flex flex-col gap-4 items-center max-md:text-center">
                    <span className="text-label">
                    {page.reviews.label}
                </span>
                        <div className="max-xl:container flex flex-col gap-6 items-center">
                            <h2 className="text-site-title-2 text-white">{page.reviews.title}</h2>
                            <p className="text-site-text-2 text-center text-white/80 max-w-[600px]">{page.reviews.description}</p>
                        </div>
                        <SliderReview reviews={page.reviews.items}/>
                    </div>
                </div>
            </section>
            <LastNews last={page.latestPosts}/>
            <Sponsor store={page.stores}/>
        </main>
    </>
};

export default MainPage;
