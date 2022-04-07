import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import Logo from '../../assets/logo.svg'
import { Container, Header, HeaderContent, TotalCars } from './styles'

export function Home() {
  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  )
}
