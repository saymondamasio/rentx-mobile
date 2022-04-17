import { useNetInfo } from '@react-native-community/netinfo'
import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components/native'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
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

interface CarType {
  brand: string
  name: string
  period: string
  price: number
  priceFormatted: string
  fuel_type: string
  thumbnail: string
}

interface Props extends RectButtonProps {
  data: CarType
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type)

  const theme = useTheme()

  const netInfo = useNetInfo()

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>
              {netInfo.isConnected === true ? data.priceFormatted : '...'}
            </Price>
          </Rent>

          <Type>
            <MotorIcon color={theme.colors.header} />
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
