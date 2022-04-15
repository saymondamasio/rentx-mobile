import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { format } from 'date-fns'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View } from 'react-native'
import { DateData } from 'react-native-calendars'
import { useTheme } from 'styled-components/native'
import { StackParamList } from '../../@types/navigation'
import ArrowIcon from '../../assets/arrow.svg'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Calendar, MarkedDatesType } from '../../components/Calendar'
import { generateInterval } from '../../components/Calendar/generateInterval'
import { getPlatformDate } from '../../utils/getPlatformDate'
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

type Props = NativeStackScreenProps<StackParamList, 'Scheduling'>

interface IRentalPeriod {
  start: number
  startFormatted: string
  end: number
  endFormatted: string
}

export function Scheduling({ navigation, route }: Props) {
  const theme = useTheme()

  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData
  )
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>(
    {} as MarkedDatesType
  )
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod
  )
  const { car } = route.params

  function handleConfirmScheduling() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    })
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

    const intervalKeys = Object.keys(interval)

    const firstDate = intervalKeys[0]
    const lastDate = intervalKeys[intervalKeys.length - 1]

    setRentalPeriod({
      start: start.timestamp,
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      end: end.timestamp,
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    })
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
            <DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowIcon />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar onDayPress={handleChangeDate} markedDates={markedDates} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmScheduling}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  )
}
