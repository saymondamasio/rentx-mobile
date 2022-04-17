import { synchronize } from '@nozbe/watermelondb/sync'
import { useNetInfo } from '@react-native-community/netinfo'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { StackParamList } from '../../@types/navigation'
import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'
import { database } from '../../database'
import { Car as ModelCar } from '../../database/model/Car'
import { api } from '../../services/api'
import { formatMoney } from '../../utils/formatMoney'
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles'

type Props = NativeStackScreenProps<StackParamList, 'Home'>

interface CarType {
  id: string
  brand: string
  name: string
  about: string
  period: string
  price: number
  priceFormatted: string
  fuel_type: string
  thumbnail: string
}

export function Home({ navigation }: Props) {
  const [cars, setCars] = useState<CarType[]>([])
  const [loading, setLoading] = useState(false)
  const netInfo = useNetInfo()

  let isMounted = true

  // Butão flutuante animado
  // const positionY = useSharedValue(0)
  // const positionX = useSharedValue(0)

  // const myCarsButtonStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     { translateX: positionX.value },
  //     { translateY: positionY.value },
  //   ],
  // }))

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionX.value
  //     ctx.positionY = positionY.value
  //   },
  //   onActive(event, ctx: any) {
  //     positionX.value = event.translationX + ctx.positionX
  //     positionY.value = event.translationY + ctx.positionY
  //   },
  //   onEnd() {
  //     positionX.value = withSpring(0)
  //     positionY.value = withSpring(0)
  //   },
  // })

  async function loadCars() {
    try {
      setLoading(true)

      const carCollection = database.get<ModelCar>('cars')
      const cars = await carCollection.query().fetch()

      const carsFormatted = cars.map(car => ({
        id: car.id,
        brand: car.brand,
        name: car.name,
        about: car.about,
        period: car.period,
        price: car.price,
        thumbnail: car.thumbnail,
        fuel_type: car.fuel_type,
        priceFormatted: formatMoney(car.price),
      }))

      if (isMounted) setCars(carsFormatted)
    } catch (error) {
      console.log('Home - ', error)
    } finally {
      if (isMounted) setLoading(false)
    }
  }

  useEffect(() => {
    loadCars()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize()
    }
  }, [netInfo.isConnected])

  // lock return in android
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => true
  //   )
  //   return () => backHandler.remove()
  // }, [])

  function handleGoCarDetails(car: CarType) {
    navigation.navigate('CarDetails', { car })
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      // mudanças no lado do servidor
      // lastPullAt: ultima atualização
      pullChanges: async ({ lastPulledAt }) => {
        // obtém as modificações do banco desde a ultima verificação
        console.log('recebendo mudanças do servidor')

        const response = await api.get(
          `/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        )

        const { changes, latestVersion } = response.data

        return { changes, timestamp: latestVersion }
      },
      // mudanças no lado do cliente
      // changes: mudanças que aconteceram
      pushChanges: async ({ changes }) => {
        // console.log('enviando mudanças para o servidor')
        // const user = changes.users
        // await api.post('/users/sync', user)
      },
    })
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

      {/* Botão flutuante animado */}
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarsButtonStyle]}>
          <MyCarsButtonAnimated onPress={handleGoMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </MyCarsButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  )
}
