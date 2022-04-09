import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import Gasoline from '../../assets/gasoline.svg'
import {
  About,
  Brand,
  CarImage,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type,
} from './styles'

interface CarData {
  brand: string
  name: string
  thumbnail: string
  rent: {
    period: string
    price: number
  }
}

interface Props extends RectButtonProps {
  data: CarData
}

export function Car({ data, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{data.rent.price}</Price>
          </Rent>

          <Type>
            <Gasoline />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  )
}
