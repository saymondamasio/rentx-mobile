export interface CarDTO {
  id: string
  brand: string
  name: string
  about: string
  period: number
  price: number
  priceFormatted: string
  fuel_type: string
  thumbnail: string
  accessories: Array<{
    id: string
    type: string
    name: string
  }>
  photos: Array<{
    id: string
    photo: string
  }>
}
