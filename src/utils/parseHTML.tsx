import {
    CallingIcon,
    CubeScanIcon, DeviceMessageIcon,
    IconType, LocationIcon,
    NoteFavoriteIcon,
    PeopleIcon,
    RadarIcon,
    Routing2Icon,
    SMSEditIcon, SMSNotificationIcon
} from "@/assets";
import {Link} from "@/navigation";

const parseAndRenderStringTitle = (input: string): string => {
    const spanRegex = /<span>(.*?)<\/span>/g;

    if (spanRegex.test(input)) {
        return input.replace(spanRegex, '<span class="text-amber-400">$1</span>');
    }

    return input;
}

const parseAndRenderContent = (
    input: string,
    classes?: {
        paragraph?: string;
        heading?: string;
        heading2?: string;
        blockquote?: string;
        image?: string;
    }
): string => {
    const paragraphRegex = /<p([^>]*?)>(.*?)<\/p>/g;
    const headingRegex = /<h2>(.*?)<\/h2>/g;
    const heading2Regex = /<h3>(.*?)<\/h3>/g;
    const blockquoteRegex = /<blockquote>(.*?)<\/blockquote>/g;
    const imageRegex = /<img([^>]*?)>/g;
    const listRegex = /<ul>(.*?)<\/ul>/g;

    const paragraphClass = `text-generate-page-text text-blog-base ${classes?.paragraph || ''}`.trim();
    const headingClass = `text-generate-page-title text-gray-900 ${classes?.heading || ''}`.trim();
    const heading2Class = `text-generate-page-title text-gray-900 ${classes?.heading2 || ''}`.trim();
    const blockquoteClass = `text-generate-page-blockquote pl-10 border-l-[3px] border-amber-400 ${classes?.blockquote || ''}`.trim();
    const imageClass = `rounded-3xl ${classes?.image || ''}`.trim();

    return input
        .replace(listRegex, `<ul class="page-list">$1</ul>`)
        .replace(paragraphRegex, (match, p1, p2) => {
            if (p1.includes('text-base-1')) {
                return `<p${p1.replace('text-base-1', 'text-generate-page-text')}>${p2}</p>`;
            } else if (p1.includes('text-base-2')) {
                return `<p${p1.replace('text-base-2', 'text-generate-page-text-2')}>${p2}</p>`;
            } else {
                return `<p class="${paragraphClass}">${p2}</p>`;
            }
        })
        .replace(headingRegex, `<h2 class="${headingClass}">$1</h2>`)
        .replace(heading2Regex, `<h3 class="${heading2Class}">$1</h3>`)
        .replace(imageRegex, `<img class="${imageClass}"$1>`)
        .replace(blockquoteRegex, `<blockquote class="${blockquoteClass}">$1</blockquote>`);
};

const listIcons: Record<string, IconType> = {
    'sms-edit': SMSEditIcon,
    'people': PeopleIcon,
    'radar': RadarIcon,
    'routing-2': Routing2Icon,
    '3d-cube-scan': CubeScanIcon,
    'truck-tick': NoteFavoriteIcon,
    'key': NoteFavoriteIcon,
    'device-message': DeviceMessageIcon,
    'location-tick': LocationIcon,
    'call-calling': CallingIcon,
    'sms-notification': SMSNotificationIcon,
}

function parseStringToNextLink(input: string): React.ReactNode {
    const linkRegex = /<a href="([^"]+)">([^<]+)<\/a>/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    let match;
    while ((match = linkRegex.exec(input)) !== null) {
        const [fullMatch, href, linkText] = match;
        const index = match.index;

        if (index > lastIndex) {
            parts.push(input.slice(lastIndex, index));
        }

        parts.push(
            <Link key={index} target="_blank"
                // @ts-ignore
                  href={href} className="text-indigo-600">
                {linkText}
            </Link>
        );

        lastIndex = index + fullMatch.length;
    }

    if (lastIndex < input.length) {
        parts.push(input.slice(lastIndex));
    }

    return <>{parts}</>;
}

function stripHtmlTags(input: string): string {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}

export {parseAndRenderStringTitle, parseAndRenderContent, listIcons, parseStringToNextLink, stripHtmlTags}