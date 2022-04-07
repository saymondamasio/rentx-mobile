import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles'

export function Home() {
  const carData = {
    brand: 'Audi',
    name: 'RS Coupe',
    rent: {
      period: 'Ao Dia',
      price: 120,
    },
    thumbnail:
      'https://w7.pngwing.com/pngs/246/357/png-transparent-audi-sportback-concept-car-2018-audi-a5-coupe-audi-coupe-audi-compact-car-sedan-convertible-thumbnail.png',
  }

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 3, 2, 6, 22, 45]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={carData} />}
      />
    </Container>
  )
}
