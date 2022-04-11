import { AntDesign } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useTheme } from 'styled-components/native'
import { RootStackParamList } from '../../@types/navigation'
import { BackButton } from '../../components/BackButton'
import { Car } from '../../components/Car'
import { Load } from '../../components/Load'
import { CarDTO } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import {
  Appointments,
  AppointmentsQuantity,
  AppointmentsTitle,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper,
  Container,
  Content,
  Header,
  SubTitle,
  Title,
} from './styles'

type Props = NativeStackScreenProps<RootStackParamList, 'MyCars'>

interface ResponseCar {
  id: string
  user_id: string
  car: CarDTO
  start_date: string
  end_date: string
}

export function MyCars({ navigation }: Props) {
  const [cars, setCars] = useState<ResponseCar[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()

  async function fetchCars() {
    try {
      const response = await api.get<ResponseCar[]>(
        '/schedules_byuser?user_id=1'
      )

      const cars = response.data

      const carsFormatted = cars.map(car => ({
        ...car,
        start_date: format(new Date(car.start_date), 'dd/MM/yyyy'),
        end_date: format(new Date(car.end_date), 'dd/MM/yyyy'),
      }))

      setCars(carsFormatted)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  function handleBack() {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <View style={{ alignSelf: 'flex-start' }}>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
        </View>

        <Title>
          Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <SubTitle>Conforto, segurança e estabilidade.</SubTitle>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}
