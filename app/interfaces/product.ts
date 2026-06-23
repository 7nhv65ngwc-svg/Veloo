interface IProduct {
    rating: number;
    readonly id: number,
    name: string,
    categoryID: number,
    description: string,
    photo?: string,
    price: number,
    readonly sellerID: number
}