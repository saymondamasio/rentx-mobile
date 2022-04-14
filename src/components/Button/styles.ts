import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ContainerProps {
  loading?: boolean
  color?: string
}

interface TitleProps {
  light?: boolean
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;

  padding: 20px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) => color || theme.colors.main};

  opacity: ${({ enabled, loading }) => (!enabled || loading ? 0.5 : 1)};
`

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`
