import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useTheme } from 'styled-components/native'
import ArrowIcon from '../../assets/arrow.svg'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Calendar } from '../../components/Calendar'
import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueContainer,
  Footer,
  Header,
  RentalPeriod,
  Title,
} from './styles'

export function Scheduling() {
  const theme = useTheme()
  return (
    <Container>
      <StatusBar translucent style="light" backgroundColor="transparent" />
      <Header>
        <View style={{ alignSelf: 'flex-start' }}>
          <BackButton
            color={theme.colors.shape}
            onPress={() => console.log('aqio')}
          />
        </View>

        <Title>
          Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueContainer selected>
              <DateValue>18/06/2022</DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowIcon />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer>
              <DateValue>18/06/2022</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" style={{ paddingBottom: getBottomSpace() }} />
      </Footer>
    </Container>
  )
}
