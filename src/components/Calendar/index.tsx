import { Feather } from '@expo/vector-icons'
import React from 'react'
import {
  Calendar as CalendarApp,
  CalendarProps,
  LocaleConfig,
} from 'react-native-calendars'
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking'
import { useTheme } from 'styled-components/native'
import { ptBR } from './localeConfig'
import { Container } from './styles'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

interface Props extends CalendarProps {}

export type MarkedDatesType = {
  [date: string]: MarkingProps
}

export function Calendar({ ...rest }: Props) {
  const theme = useTheme()
  return (
    <Container>
      <CalendarApp
        firstDay={1}
        renderArrow={direction => (
          <Feather
            size={24}
            color={theme.colors.shape_dark}
            name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          />
        )}
        headerStyle={{
          backgroundColor: theme.colors.background_secondary,
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.text_details,
          paddingBottom: 10,
          marginBottom: 10,
        }}
        theme={{
          textDayFontFamily: theme.fonts.primary_400,
          textDayHeaderFontFamily: theme.fonts.primary_500,
          textMonthFontFamily: theme.fonts.secondary_600,
          textDayHeaderFontSize: 10,
          textMonthFontSize: 20,
          monthTextColor: theme.colors.title,
          arrowStyle: {
            marginHorizontal: -15,
          },
        }}
        minDate={new Date().toString()}
        markingType="period"
        {...rest}
      />
    </Container>
  )
}
