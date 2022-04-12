export interface CarDTO {
  id: string
  brand: string
  name: string
  about: string
  rent: {
    period: number
    price: number
    priceFormatted: string
  }
  fuel_type: string
  thumbnail: string
  accessories: Array<{
    type: string
    name: string
  }>
  photos: string[]
}
