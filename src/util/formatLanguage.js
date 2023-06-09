export const formatLanguage = (lang) => {
    const objLang = {
        "es_MX": "MX"
    }
    return objLang[lang] || lang
}