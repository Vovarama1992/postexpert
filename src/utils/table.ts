const replaceStringIdsWithNumbers = (products: any[]): any[] => {

    if (!products?.length) return []

    let maxId = products?.reduce((max, product) => {
        return typeof product.id === 'number' && product.id > max ? product.id : max;
    }, 0);

    return products.map(product => {
        if (typeof product.id === 'string') {
            maxId += 1; // Увеличиваем максимальный числовой ID на 1
            return {...product, id: maxId}; // Возвращаем новый объект с замененным ID
        }
        return product; // Если ID числовой, просто возвращаем объект без изменений
    });
}


export {replaceStringIdsWithNumbers}