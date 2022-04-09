import React from 'react'
import { useWindowDimensions } from 'react-native'
import DoneIcon from '../../assets/done.svg'
import LogoIcon from '../../assets/logo_background_gray.svg'
import { ConfirmButton } from '../../components/ConfirmButton'
import { Container, Content, Footer, Message, Title } from './styles'

export function SchedulingComplete() {
  const { width } = useWindowDimensions()

  return (
    <Container>
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
        <ConfirmButton title="OK" />
      </Footer>
    </Container>
  )
}
