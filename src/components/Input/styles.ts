import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface TextInputProps {
  secure: boolean
}

interface Props {
  isFocused: boolean
}

export const Container = styled.View`
  flex-direction: row;
`

export const IconContainer = styled.View<Props>`
  height: 55px;
  width: 55px;

  justify-content: center;
  align-items: center;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}

  background-color: ${({ theme }) => theme.colors.background_secondary};
`

export const InputText = styled.TextInput<TextInputProps & Props>`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  ${({ secure }) =>
    secure &&
    css`
      padding-right: 0;
    `}

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`

export const Separator = styled.View<Props>`
  background-color: transparent;

  width: 2px;
  height: 100%;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`
