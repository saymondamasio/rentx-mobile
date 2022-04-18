import { AntDesign } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { format } from 'date-fns'
import React, { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useTheme } from 'styled-components/native'
import { StackParamList } from '../../@types/navigation'
import { BackButton } from '../../components/BackButton'
import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'
import { CarDTO } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import { formatMoney } from '../../utils/formatMoney'
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

type Props = NativeStackScreenProps<StackParamList, 'MyCars'>

interface ResponseRental {
  id: string
  user_id: string
  car: CarDTO
  start_date: string
  startDateFormatted: string
  end_date: string
  endDateFormatted: string
}

export function MyCars({ navigation }: Props) {
  const [rentals, setRentals] = useState<ResponseRental[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()

  async function fetchRentals() {
    try {
      const response = await api.get<ResponseRental[]>('rentals')

      const rentals = response.data

      const rentalsFormatted = rentals.map(rental => ({
        ...rental,
        car: {
          ...rental.car,
          priceFormatted: formatMoney(rental.car.price),
        },
        startDateFormatted: format(new Date(rental.start_date), 'dd/MM/yyyy'),
        endDateFormatted: format(new Date(rental.end_date), 'dd/MM/yyyy'),
      }))

      setRentals(rentalsFormatted)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect')

      fetchRentals()
    }, [])
  )

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
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{rentals.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={rentals}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDateFormatted}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDateFormatted}</CarFooterDate>
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
