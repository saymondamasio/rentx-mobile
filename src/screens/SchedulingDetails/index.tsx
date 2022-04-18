import { Feather } from '@expo/vector-icons'
import { useNetInfo } from '@react-native-community/netinfo'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { format } from 'date-fns'
import React, { useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-native'
import { useTheme } from 'styled-components/native'
import { StackParamList } from '../../@types/navigation'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
import { CarDTO } from '../../dtos/CarDTO'
import { api } from '../../services/api'
import { formatMoney } from '../../utils/formatMoney'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import {
  Accessories,
  Brand,
  CalendarIcon,
  CarImages,
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'

type Props = NativeStackScreenProps<StackParamList, 'SchedulingDetails'>

interface IRentalPeriod {
  startFormatted: string
  endFormatted: string
}

export function SchedulingDetails({ navigation, route }: Props) {
  const theme = useTheme()

  const { car: carParam, dates } = route.params

  const [car, setCar] = useState<CarDTO>(carParam)

  const netInfo = useNetInfo()

  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod
  )
  const [loading, setLoading] = useState(false)

  const rentTotal = useMemo(
    () => formatMoney(Number(dates.length * car.price)),
    []
  )

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(new Date(dates[0]), 'dd/MM/yyyy'),
      endFormatted: format(new Date(dates[dates.length - 1]), 'dd/MM/yyyy'),
    })
  }, [])

  async function fetchOnlineData() {
    const response = await api.get<CarDTO>(`cars/${car.id}`)
    const carsFormatted = {
      ...response.data,
      priceFormatted: formatMoney(response.data.price),
    }

    setCar(carsFormatted)
  }

  useEffect(() => {
    if (netInfo.isConnected === true) {
      fetchOnlineData()
    }
  }, [netInfo.isConnected])

  async function handleConfirmScheduling() {
    try {
      setLoading(true)

      await api.post('rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: dates[0],
        end_date: dates[dates.length - 1],
        total: rentTotal,
      })

      navigation.navigate('Confirmation', {
        message: 'Agora você só precisa ir\naté a concessionária da RENTX',
        nextScreenRoute: 'AppTabs',
        title: 'Carro alugado!',
      })
    } catch (error) {
      setLoading(false)

      Alert.alert('Não foi possível confirmar o agendamento')

      console.log('SchedulingDetails error: ', error)
    }
  }

  function handleBack() {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={
            car.photos
              ? car.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{car.priceFormatted}</Price>
          </Rent>
        </Details>
        {car.accessories && (
          <Accessories>
            {car.accessories.map(item => (
              <Accessory
                key={item.type}
                icon={getAccessoryIcon(item.type)}
                name={item.name}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={24} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={24} color={theme.colors.shape} />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`${car.priceFormatted} x ${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmScheduling}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  )
}
