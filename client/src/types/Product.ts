export interface IListProduct {
    id: number
    name: string
    price: number
    description: string
    img: string
    discount: number
    isAvailable: boolean
    categoryId: number
    weight: Number
}

export interface IProduct extends IListProduct {

}