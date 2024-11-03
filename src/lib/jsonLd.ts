
const publisher = {
    "@type": "Organization",
    "name": "Postexpert",
    "logo": {
        "@type": "ImageObject",
        "url": "URL_логотипа_вашей_организации"
    }
}

const mainEntity = {
    "@type": "Organization",
    "name": "Название вашей компании",
    "sameAs": [
        "https://www.facebook.com/yourcompany",
        "https://twitter.com/yourcompany",
        "https://www.linkedin.com/company/yourcompany"
    ]
}

export {publisher, mainEntity}