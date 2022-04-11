import { Feather } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { useTheme } from 'styled-components/native'
import { RootStackParamList } from '../../@types/navigation'
import AccelerationIcon from '../../assets/acceleration.svg'
import ExchangeIcon from '../../assets/exchange.svg'
import ForceIcon from '../../assets/force.svg'
import GasolineIcon from '../../assets/gasoline.svg'
import PeopleIcon from '../../assets/people.svg'
import SpeedIcon from '../../assets/speed.svg'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
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

export function SchedulingDetails({ navigation }: Props) {
  const theme = useTheme()

  function handleConfirmScheduling() {
    navigation.navigate('SchedulingComplete')
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
          imagesUrl={[
            'https://w7.pngwing.com/pngs/246/357/png-transparent-audi-sportback-concept-car-2018-audi-a5-coupe-audi-coupe-audi-compact-car-sedan-convertible-thumbnail.png',
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory icon={SpeedIcon} name="380Km/h" />
          <Accessory icon={AccelerationIcon} name="3.2s" />
          <Accessory icon={ForceIcon} name="800hp" />
          <Accessory icon={GasolineIcon} name="Gasolina" />
          <Accessory icon={ExchangeIcon} name="Auto" />
          <Accessory icon={PeopleIcon} name="2 pessoas" />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={24} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>10/10/2001</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={24} color={theme.colors.shape} />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>10/10/2001</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 500 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2000,00</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmScheduling}
        />
      </Footer>
    </Container>
  )
}
