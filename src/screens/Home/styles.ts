import { FlatList, FlatListProps } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

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

const RectButtonAnimated = Animated.createAnimatedComponent(RectButton)

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: flex-end;

  padding: 32px 24px;
`
export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`

export const CarList = styled(
  FlatList as new (props: FlatListProps<CarType>) => FlatList<CarType>
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``

export const MyCarsButtonAnimated = styled(RectButtonAnimated)`
  width: 60px;
  height: 60px;

  background-color: ${({ theme }) => theme.colors.main};

  justify-content: center;
  align-items: center;

  border-radius: 30px;

  position: absolute;
  right: 22px;
  bottom: 22px;
`
