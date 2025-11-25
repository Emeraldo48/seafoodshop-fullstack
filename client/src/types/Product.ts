export interface IListProduct {
  id: number
  name: string
  price: number
  description: string
  img: string
  discount: number
  isAvailable: boolean
  categoryId: number
  weight: number
  slug: string
}

export interface IProduct extends IListProduct {

}