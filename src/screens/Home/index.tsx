import { Ionicons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components/native'
import { RootStackParamList } from '../../@types/navigation'
import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { Load } from '../../components/Load'
import { CarDTO } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  MyCarsButton,
  TotalCars,
} from './styles'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export function Home({ navigation }: Props) {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  async function loadCars() {
    try {
      setLoading(true)

      const responseCars = await api.get('/cars')

      setCars(responseCars.data)
    } catch (error) {
      console.log('Home - ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCars()
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

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleGoCarDetails(item)} />
          )}
        />
      )}

      <MyCarsButton onPress={handleGoMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  )
}
