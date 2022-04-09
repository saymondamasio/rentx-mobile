import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { RootStackParamList } from '../../@types/navigation'
import DoneIcon from '../../assets/done.svg'
import LogoIcon from '../../assets/logo_background_gray.svg'
import { ConfirmButton } from '../../components/ConfirmButton'
import { Container, Content, Footer, Message, Title } from './styles'

type Props = NativeStackScreenProps<RootStackParamList, 'SchedulingComplete'>

export function SchedulingComplete({ navigation }: Props) {
  const { width } = useWindowDimensions()

  function handleConfirm() {
    navigation.navigate('Home')
  }

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <LogoIcon width={width} />
      <Content>
        <DoneIcon width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir{'\n'}até a concessionaria da RENTX{'\n'}pegar
          seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  )
}
