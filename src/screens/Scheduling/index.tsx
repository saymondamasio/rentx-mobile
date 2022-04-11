import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View } from 'react-native'
import { DateData } from 'react-native-calendars'
import { useTheme } from 'styled-components/native'
import { RootStackParamList } from '../../@types/navigation'
import ArrowIcon from '../../assets/arrow.svg'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Calendar, MarkedDatesType } from '../../components/Calendar'
import { generateInterval } from '../../components/Calendar/generateInterval'
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

type Props = NativeStackScreenProps<RootStackParamList, 'Scheduling'>

export function Scheduling({ navigation }: Props) {
  const theme = useTheme()

  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData
  )
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>(
    {} as MarkedDatesType
  )

  function handleConfirmScheduling() {
    navigation.navigate('SchedulingDetails')
  }

  function handleBack() {
    navigation.goBack()
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectedDate(end)

    const interval = generateInterval(start, end)

    setMarkedDates(interval)
  }

  return (
    <Container>
      <StatusBar translucent style="light" backgroundColor="transparent" />
      <Header>
        <View style={{ alignSelf: 'flex-start' }}>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
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
        <Calendar onDayPress={handleChangeDate} markedDates={markedDates} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmScheduling} />
      </Footer>
    </Container>
  )
}
