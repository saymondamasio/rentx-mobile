import { Feather } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useTheme } from 'styled-components/native'
import { RootStackParamList } from '../../@types/navigation'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
import { api } from '../../services/api'
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

type Props = NativeStackScreenProps<RootStackParamList, 'SchedulingDetails'>

interface IRentalPeriod {
  startFormatted: string
  endFormatted: string
}

export function SchedulingDetails({ navigation, route }: Props) {
  const theme = useTheme()

  const { car, dates } = route.params

  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod
  )
  const [loading, setLoading] = useState(false)

  const rentTotal = Number(dates.length * car.rent.price)

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(new Date(dates[0]), 'dd/MM/yyyy'),
      endFormatted: format(new Date(dates[dates.length - 1]), 'dd/MM/yyyy'),
    })
  }, [])

  async function handleConfirmScheduling() {
    try {
      setLoading(true)

      const schedulesByCar = await api.get(`schedules_bycars/${car.id}`)

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ]

      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        start_date: dates[0],
        end_date: dates[dates.length - 1],
      })

      await api.put(`schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })

      navigation.navigate('SchedulingComplete')
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
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{car.rent.price}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              icon={getAccessoryIcon(accessory.type)}
              name={accessory.name}
            />
          ))}
        </Accessories>

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
            <RentalPriceQuota>{`${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
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
