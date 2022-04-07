import { StatusBar } from 'expo-status-bar'
import React from 'react'
import Logo from '../../assets/logo.svg'
import { Container, Header } from './styles'

export function Home() {
  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <Header>
        <Logo />
      </Header>
    </Container>
  )
}
