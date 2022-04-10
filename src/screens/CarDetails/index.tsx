import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { RootStackParamList } from '../../@types/navigation'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
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

type Props = NativeStackScreenProps<RootStackParamList, 'CarDetails'>

export function CarDetails({ navigation, route }: Props) {
  const { car } = route.params

  function handleConfirmRental() {
    navigation.navigate('Scheduling')
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
          {car.accessories.map(item => (
            <Accessory
              key={item.type}
              icon={getAccessoryIcon(item.type)}
              name={item.name}
            />
          ))}
        </Accessories>
        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  )
}
