'use client'
import React, {memo, useMemo} from 'react'
import Image from 'next/image'
import logo from '../../../../public/logo/logo.svg'
import {FacebookIcon, IconType, InstagramIcon, XIcon} from '@/assets'
import {menuFooter} from './model/footer'
import {Link, Link as NextLink} from "@/navigation"
import {useTranslationContext} from "@/context";
import {FooterData} from "@/types/layout";

const icons: Record<string, IconType> = {
    facebook: FacebookIcon,
    twitter: XIcon,
    instagram: InstagramIcon
}

const Footer = ({footer}: { footer: FooterData }) => {

    const {locales, menus} = useTranslationContext()

    const menuFooter1 = useMemo(() => menus.find(el => {

        return  el.code === 'site-footer'

    }), [menus])

    const menuFooter2 = useMemo(() => menus.find(el => {

        return  el.code === 'site-footer-cabinet'

    }), [menus])

    return (
        <footer className="xl:pt-24 bg-white pt-footer" >
            <div className=" space-y-8 bg-BG pt-24 pb-8  max-lg:pt-12">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8 container">
                    <div className="space-y-8">
                        <Link href={'/'}>
                            <Image
                                className="select-none pointer-events-none  w-[120px] h-[24px] lg:w-[130px] lg:h-[26px] xl:w-[173px] xl:h-[34px]"
                                src={logo}
                                alt={'logo'}
                                unoptimized
                                width={173}
                                height={34}
                            />
                        </Link>
                        <p className="text-white/80 text-small-2 max-w-[353px]">
                            {footer.description}
                        </p>
                        <div className="flex items-center gap-4">
                            {
                                footer.socialNetworks.map(social => {

                                    const Icon = icons[social.code as keyof typeof icons]

                                    return <a key={social.id} target="_blank" href={social.url}>
                                        <Icon
                                            className="size-6 text-white/50 hover:text-white transition-colors-opacity"/>
                                    </a>
                                })
                            }
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">{locales.components.Footer.WEBSITE}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {menuFooter1?.items?.slice(0, 4).map((item, key) => (
                                        <li key={key}>
                                            <Link
                                                // @ts-ignore
                                                href={item.slug}
                                                scroll
                                                className="text-sm leading-6 text-white/80 hover:text-white transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <div className="h-6"/>
                                <ul role="list" className="mt-6 space-y-4">
                                    {menuFooter1?.items?.slice(4).map((item, key) => (
                                        <li key={key}>
                                            <Link
                                                // @ts-ignore
                                                href={item.slug}
                                                scroll
                                                className="text-sm leading-6 text-white/80 hover:text-white transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">{locales.components.Footer.DASHBOARD}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {menuFooter2?.items?.map((item, key) => (
                                        <li key={key}>
                                            <Link
                                                // @ts-ignore
                                                href={item.slug}
                                                scroll
                                                className="text-sm leading-6 text-white/80 hover:text-white transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pt-6 border-t border-solid border-white/10 flex justify-between items-center">
                    <p className="text-white/50 hover:text-white text-small-1 transition-colors">{footer.copyright}</p>
                    <a href={footer.developed_by.url} target="_blank"
                       className="text-white/50 hover:text-white text-small-1 transition-colors">{footer.developed_by.name}</a>
                </div>
            </div>
        </footer>
    )
}

export default memo(Footer)