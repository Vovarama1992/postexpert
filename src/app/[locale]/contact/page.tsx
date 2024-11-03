import React from 'react';
import BreadcrumbsCustom from "@/components/custom/Breadcrumbs/BreadcrumbsCustom";
import ContactForm from "@/app/[locale]/contact/components/ContactForm";
import PromptList from "@/app/[locale]/components/PromptList";
import {__API__} from "@/lib";
import {ContactData} from "@/types/contact";
import {generateMeta, listIcons, stripHtmlTags} from "@/utils";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
	return generateMeta(locale, '/site/pages/contacts')
}

const Page = async ({params: {locale}}: {params: { locale: string }}) => {

	const response = await fetch(`${__API__}/site/pages/contacts`, {
		headers: {
			locale
		}
	})

	const { data } = await response.json()

	const page = data as ContactData

	const LocationIcon = listIcons[page.feedback.address.icon]
	const CallingIcon = listIcons[page.feedback.phone.icon]
	const SMSNotificationIcon = listIcons[page.feedback.email.icon]

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		"mainEntity": {
			"@type": "Organization",
			"name": page.feedback.name.text,
			"url": "https://www.example.com", // Замените на URL вашего сайта
			"logo": "https://www.example.com/logo.png", // Замените на URL логотипа вашей компании
			"contactPoint": {
				"@type": "ContactPoint",
				"telephone": page.feedback.phone.text,
				"contactType": "Customer Service",
				"areaServed": "RU", // Замените на регион, в котором вы предоставляете услуги
				"availableLanguage": "Russian"
			},
			"address": {
				"@type": "PostalAddress",
				"streetAddress": page.feedback.address.text,
				"addressCountry": "RU" // Замените на страну вашего бизнеса
			}
		}
	};

    return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<main className="flex flex-col  page-gap  bg-white">
				<section
					className={`pt-[72px] relative after:content-['*'] h-[350px] after:absolute after:top-0
                space-y-24    
             after:left-0 after:w-full after:bg-BG-2 after:h-[350px] after:z-[0] after:rounded-b-[32px]`}>
				{/*	<div className="flex flex-col gap-6 items-center z-10 relative container">
						<h1 className="text-site-title-5 text-white text-center max-w-[840px]">
							{page.title}
						</h1>
						<h4 className="text-xl leading-[31px] text-white/80 max-w-[640px] text-center">
							{page.description}
						</h4>
						<BreadcrumbsCustom items={[
							{
								label: stripHtmlTags(page.title)
							}
						]} className={"mt-8 self-start"}/>
					</div>*/}
				</section>
				<section className="grid grid-cols-[1fr_1.5fr] max-md:grid-cols-1 gap-16 items-center container">
					<div className="space-y-10">
						<div className="space-y-4">
							<span className="text-label">{page.feedback.label}</span>
							<h2 className="text-site-title-4 text-gray-950 max-w-[740px] ">{page.feedback.name.text}</h2>
						</div>
						<ul className="flex flex-col gap-4 ">
							<li className="flex items-center gap-3">
								<LocationIcon className="text-gray-800"/>
								<span className="text-gray-800 text-[18px] font-medium leading-[108.4%]">{page.feedback.address.text}</span>
							</li>
							<li className="flex items-center gap-3">
								<CallingIcon className="text-gray-800"/>
								<span className="text-gray-800 text-[18px] font-medium leading-[108.4%]">{page.feedback.phone.text}</span>
							</li>
							<li className="flex items-center gap-3">
								<SMSNotificationIcon className="text-gray-800 size-6"/>
								<span className="text-gray-800 text-[18px] font-medium leading-[108.4%]">{page.feedback.email.text}</span>
							</li>
						</ul>
					</div>
					<ContactForm fields={page.form.fields}/>
				</section>
				<PromptList blocks={page.blocks} variant={2}/>
			</main>
		</>
    );
};

export default Page;
