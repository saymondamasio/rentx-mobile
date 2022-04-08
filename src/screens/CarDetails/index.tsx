import React from 'react'
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
  About,
  Accessories,
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
} from './styles'

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton />
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
        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  )
}
