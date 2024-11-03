import React from 'react';
import BreadcrumbsCustom from "@/components/custom/Breadcrumbs/BreadcrumbsCustom";
import {__API__} from "@/lib";
import {PageBase} from "@/types/landing";
import {generateMeta, parseAndRenderContent, parseAndRenderStringTitle, stripHtmlTags} from "@/utils";

export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
	return generateMeta(locale, '/site/pages/how-it-works')
}

const Page = async ({params: {locale}}: {params: { locale: string }}) => {

	const response = await fetch(`${__API__}/site/pages/how-it-works`, {
		headers: {
			locale
		}
	})

	const { data } = await response.json()

	const page = data as PageBase

	return (
		<main className="flex flex-col  bg-white">
			<section
				className={` relative page-section-top`}>
				<div className="flex flex-col flex-1 gap-6 items-center z-10 relative container">
					<h1 className="text-site-title-5 text-white text-center " dangerouslySetInnerHTML={{
						__html: parseAndRenderStringTitle(page.title)
					}}>

					</h1>
					<h4 className="text-xl leading-[31px] text-white/80 max-w-[640px] text-center" dangerouslySetInnerHTML={{
						__html: page.description
					}}></h4>
					<BreadcrumbsCustom items={[
						{
							label: stripHtmlTags(page.title)
						}
					]} />
				</div>
			</section>
			<section className="pt-16 max-xl:pt-10  container ">
				<div className="flex flex-col gap-6 mx-auto max-w-[840px] w-full" dangerouslySetInnerHTML={{
					__html: parseAndRenderContent(page.content)
				}}>

				</div>
			</section>
		</main>
	);
};

export default Page;
