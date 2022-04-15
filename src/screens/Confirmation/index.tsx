import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { StackParamList } from '../../@types/navigation'
import DoneIcon from '../../assets/done.svg'
import LogoIcon from '../../assets/logo_background_gray.svg'
import { ConfirmButton } from '../../components/ConfirmButton'
import { Container, Content, Footer, Message, Title } from './styles'

type Props = NativeStackScreenProps<StackParamList, 'Confirmation'>

export function Confirmation({ navigation, route }: Props) {
  const { width } = useWindowDimensions()
  const { message, nextScreenRoute, title } = route.params

  function handleConfirm() {
    navigation.navigate(nextScreenRoute)
  }

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <LogoIcon width={width} />
      <Content>
        <DoneIcon width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  )
}
