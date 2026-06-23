
export const PRODUCTS: Array<IProduct> = [
    {
        id: 1,
        photo: "https://e7.pngegg.com/pngimages/887/86/png-clipart-silver-dell-laptop-dell-xps-13-9350-laptop-computer-laptop-electronics-netbook.png",
        categoryID: 1,
        name: "Notebook 12'",
        description: "Descrição 01",
        sellerID: 1,
        price: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
        rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1
    },
    {
        id: 2,
        categoryID: 2,
        photo: "https://novomundo.vtexassets.com/arquivos/ids/28237422-800-800?v=638998539089730000&width=800&height=800&aspect=true",
        name: "Smart TV 50' ",
        description: "Transforme sua sala em um cinema. Acesse seus apps favoritos como Netflix, YouTube e Prime Video diretamente pela tela. Conta com Wi-Fi integrado, entradas HDMI/USB e imagens de alta qualidade com cores vivas. A escolha perfeita para o seu entretenimento diário!",
        sellerID: 2,
        price: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
        rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1
    },
    {
        id: 3,
        photo: "https://e7.pngegg.com/pngimages/887/86/png-clipart-silver-dell-laptop-dell-xps-13-9350-laptop-computer-laptop-electronics-netbook.png",
        categoryID: 1,
        name: "Notebook 12'",
        description: "Descrição 01",
        sellerID: 2,
        price: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
        rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1
    },
]