import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { RootStackParamList } from '../../@types/navigation'
import BrandIcon from '../../assets/brand.svg'
import LogoIcon from '../../assets/logo.svg'
import { Container } from './styles'

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>

export function Splash({ navigation }: Props) {
  const splashAnimation = useSharedValue(0)

  const brandStyle = useAnimatedStyle(() => ({
    opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [0, -100],
          Extrapolate.CLAMP
        ),
      },
    ],
  }))

  const logoStyle = useAnimatedStyle(() => ({
    opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [100, 0],
          Extrapolate.CLAMP
        ),
      },
    ],
  }))

  function startApp() {
    navigation.navigate('Home')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      'worklet'
      runOnJS(startApp)()
    })
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandIcon width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoIcon width={180} height={20} />
      </Animated.View>
    </Container>
  )
}
