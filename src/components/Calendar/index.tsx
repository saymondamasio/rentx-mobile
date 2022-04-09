import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Calendar as CalendarApp, LocaleConfig } from 'react-native-calendars'
import { useTheme } from 'styled-components/native'
import { Container } from './styles'

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje',
}
LocaleConfig.defaultLocale = 'pt-br'

export function Calendar() {
  const theme = useTheme()
  return (
    <Container>
      <CalendarApp
        firstDay={1}
        renderArrow={direction => (
          <Feather
            size={24}
            color={theme.colors.line}
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
      />
    </Container>
  )
}
