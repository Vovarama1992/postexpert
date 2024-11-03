import React from 'react';
import BreadcrumbsCustom from "@/components/custom/Breadcrumbs/BreadcrumbsCustom";
import DeliveryCalculator from "@/app/[locale]/components/DeliveryCalculator";
import { __API__} from "@/lib";
import {ServicesAndRatesData} from "@/types/service";
import {generateMeta, listIcons, parseAndRenderContent, parseAndRenderStringTitle, stripHtmlTags} from "@/utils";
import Image from "next/image";
import AccordionCustom from "@/components/custom/Accordion/AccordionCustom";
import PromptList from "@/app/[locale]/components/PromptList";
import Sponsor from "@/app/[locale]/components/Sponsor";
import {Link} from "@/navigation";
import {ChevronIcon} from "@/assets";
import ButtonVideo from "@/components/common/Tutorial/ButtonVideo";
import ServicesList from "@/app/[locale]/services/components/ServicesList";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
    return generateMeta(locale, '/site/pages/services')
}

const Page = async ({params: {locale}}: {params: { locale: string }}) => {

    const response = await fetch(`${__API__}/site/pages/services`, {
        headers: {
            locale
        },
    })

    const { data } = await response.json()

    const page = data as ServicesAndRatesData

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": page.title,
        "provider": {
            "@type": "Organization",
            "name": "Название вашей компании",
            "url": "https://www.example.com",
            "logo": "https://www.example.com/logo.png"
        },
        "description": page.description,
        "offers": Object.values(page.delivery_information.tariffs).map(tariff => ({
            "@type": "Offer",
            "name": tariff.name,
            "priceCurrency": "EUR",
            "price": tariff.price,
            "url": tariff.button?.link
        }))
    };

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                />
            )}
            <main className="flex flex-col bg-white page-gap">
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
                <DeliveryCalculator info={page.delivery_information}/>
                <section className="flex flex-col gap-10  ">
                    <ServicesList tarrifs={page.delivery_information.tariffs}/>
                    <div className="flex items-center justify-between container max-sm:flex-col gap-y-6">
                        <blockquote className="text-generate-page-blockquote max-w-[760px] max-lg:max-w-[60%] max-sm:max-w-full max-sm:w-full pl-10 border-l-[3px] border-amber-400">
                            {page.delivery_information.tariffs.annotation}
                        </blockquote>
                        <ButtonVideo variant="black" source={page.delivery_information.tariffs.video}/>
                    </div>
                </section>
                <section className="bg-BG pt-[88px]  max-lg:pt-16 max-md:pt-12 max-lg:pb-16 max-md:pb-12  pb-[112px]">
                    <div className="container w-full">
                        <div className="w-full  gap-4 flex flex-col items-center">
                            <span className="text-label">{page.other_services.label}</span>
                            <div className="flex flex-col gap-6 items-center">
                                <h2 className="text-site-title-2 text-white max-w-[800px] text-center">
                                    {page.other_services.title}
                                </h2>
                                <p className="text-site-text-2 text-white max-w-[600px] text-center">
                                    {page.other_services.description}
                                </p>
                            </div>
                        </div>
                        <div className={`w-full flex items-center gap-14 mt-[88px]  max-lg:mt-16 max-md:mt-12
                     max-sm:gap-12 max-2xl:gap-14 max-xl:flex-col max-xl:max-w-[800px] max-xl:mx-auto
                    `}>
                            <div className="basis-1/2 flex justify-center items-center">
                                <Image quality={100} width={551} height={779} className={`basis-1/2 rounded-3xl max-sm:w-[309px] max-sm:h-[505px]
                         pointer-events-none select-none object-cover
                         max-w-[551px] 
                         max-lg:h-[580px] max-lg:w-[356px]`} src={page.other_services.image} alt={'image'}/>
                            </div>
                            <AccordionCustom className="max-xl:basis-auto basis-1/2" options={page.other_services.services.map(service => ({answer: service.description, question: service.title}))}/>
                        </div>
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
                <Sponsor store={page.stores}/>
                <section className=" items-center gap-6 z-10 relative container grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1">
                    {
                        page.blocks2.map((block, index) => {

                            const Icon = listIcons[block.icon]

                            return <figure key={block.id} className={`rounded-3xl p-12 flex flex-col items-center gap-8 h-[426px] w-full  
                            ${index !== 0 ? 'bg-gray-100' : 'bg-BG'}
                        `}>
                                <button
                                    className={`size-[72px] flex items-center justify-center ${index !== 0 ? 'bg-white' : 'bg-BG-3'}  rounded-xl `}>
                                    <Icon className={`${index !== 0 ? 'text-gray-900 ' : `text-white `} h-12 w-12`}/>
                                </button>
                                <h6 className={`text-site-sub-title-1 ${index !== 0 ? 'text-gray-900' : 'text-white'} text-center`}>{block.title}</h6>
                                <p className={`text-site-text-1 ${index !== 0 ? 'text-gray-900' : 'text-white'} text-center`}>
                                    {block.description}
                                </p>
                                <Link
                                    // @ts-ignore
                                    href={block.link.url}
                                    className={`flex items-center gap-1.5 ${index !== 0 ? 'text-indigo-600' : 'text-white'} `}>
                                    <span className="text-[17px] leading-normal font-medium ">{block.link.label}</span>
                                    <ChevronIcon className="size-4 "/>
                                </Link>
                            </figure>
                        })
                    }
                </section>
            </main>
        </>
    );
};

export default Page;
