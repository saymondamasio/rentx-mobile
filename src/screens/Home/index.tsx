import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components/native'
import { RootStackParamList } from '../../@types/navigation'
import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'
import { CarDTO } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import { formatMoney } from '../../utils/formatMoney'
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  MyCarsButtonAnimated,
  TotalCars,
} from './styles'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export function Home({ navigation }: Props) {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  const positionY = useSharedValue(0)
  const positionX = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ],
  }))

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX
      positionY.value = event.translationY + ctx.positionY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    },
  })

  async function loadCars() {
    try {
      setLoading(true)

      const responseCars = await api.get<CarDTO[]>('/cars')

      const carsFormatted = responseCars.data.map(car => ({
        ...car,
        rent: { ...car.rent, priceFormatted: formatMoney(car.rent.price) },
      }))

      setCars(carsFormatted)
    } catch (error) {
      console.log('Home - ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    )
    return () => backHandler.remove()
  }, [])

  function handleGoCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  function handleGoMyCars() {
    navigation.navigate('MyCars')
  }

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)} />

          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleGoCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarsButtonStyle]}>
          <MyCarsButtonAnimated onPress={handleGoMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </MyCarsButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}
