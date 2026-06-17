interface IProductCart extends IProduct {
    amount: number
}

interface ICart {
    products: Array<IProductCart>,
    total: number
}