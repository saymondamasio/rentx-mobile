import { Feather } from '@expo/vector-icons'
import React, { ComponentProps, useState } from 'react'
import { StyleProp, TextInputProps, ViewStyle } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components/native'
import { Container, IconContainer, InputText, Separator } from './styles'

interface Props extends TextInputProps {
  iconName: ComponentProps<typeof Feather>['name']
  containerStyle?: StyleProp<ViewStyle>
  secure?: boolean
}

export function Input({
  iconName,
  containerStyle,
  secure = false,
  ...rest
}: Props) {
  const theme = useTheme()
  const [isPasswordVisible, setIsPasswordVisible] = useState(secure)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!rest.value)
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <Container style={containerStyle}>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled
              ? theme.colors.main
              : theme.colors.text_details
          }
        />
      </IconContainer>
      <Separator isFocused={isFocused} />
      <InputText
        secure={secure}
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />

      {secure && (
        <IconContainer isFocused={isFocused}>
          <BorderlessButton onPress={handlePasswordVisibilityChange}>
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color={theme.colors.text_details}
            />
          </BorderlessButton>
        </IconContainer>
      )}
    </Container>
  )
}
