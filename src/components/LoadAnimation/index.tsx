import LottieView from 'lottie-react-native'
import React from 'react'
import loadingCar from '../../assets/loading_car.json'
import { Container } from './styles'

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        autoPlay
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  )
}
