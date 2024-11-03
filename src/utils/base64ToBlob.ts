const base64ToBlob = (base64: string) => {
    const [header, data] = base64.split(',');
    // Определяем MIME-тип из заголовка
    const contentType = header.match(/:(.*?);/)?.[1] || '';
    // Декодируем строку base64
    const byteCharacters = atob(data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
}
export {base64ToBlob}