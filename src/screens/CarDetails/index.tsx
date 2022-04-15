import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { StackParamList } from '../../@types/navigation'
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
  HeaderAnimated,
  Name,
  Period,
  Price,
  Rent,
} from './styles'

type Props = NativeStackScreenProps<StackParamList, 'CarDetails'>

export function CarDetails({ navigation, route }: Props) {
  const { car } = route.params

  const statusBarHeight = getStatusBarHeight()

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, 220],
      [220, statusBarHeight + 60],
      Extrapolate.CLAMP
    ),
  }))

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {
      car,
    })
  }

  function handleBack() {
    navigation.goBack()
  }

  const sliderCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 200], [1, 0], Extrapolate.CLAMP),
  }))

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" style="dark" />

      <HeaderAnimated style={[headerStyleAnimation]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <CarImages style={sliderCarsStyleAnimation}>
          <ImageSlider imagesUrl={car.photos} />
        </CarImages>
      </HeaderAnimated>

      <Content
        onScroll={scrollHandler}
        scrollEventThrottle={16} // 1000ms/60fps = 16
      >
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
