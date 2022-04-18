import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
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
import { StackParamList, TabParamList } from '../../@types/navigation'
import BrandIcon from '../../assets/brand.svg'
import LogoIcon from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth'
import { Container } from './styles'

type Props = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'Splash'>,
  BottomTabScreenProps<TabParamList>
>

export function Splash({ navigation }: Props) {
  const { user } = useAuth()

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
    navigation.navigate(user.id ? 'AppTabs' : 'SignIn')
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
