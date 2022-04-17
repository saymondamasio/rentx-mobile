import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface OptionProps {
  active?: boolean
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
  height: ${RFValue(227)}px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.header};

  padding: 0 24px;

  align-items: center;
`

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 32}px;
`

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.background_secondary};
`

export const LogoutButton = styled(BorderlessButton)`` as any

export const PhotoContainer = styled.View`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: 90px;

  position: absolute;
  bottom: -${RFValue(90)}px;

  background-color: ${({ theme }) => theme.colors.shape};
`

export const Photo = styled.Image`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: 90px;
`

export const PhotoButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.main};

  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;

  border-radius: 20px;

  position: absolute;
  bottom: 10px;
  right: 10px;
` as any

export const Content = styled.View`
  padding: 0 24px;
  margin-top: ${RFValue(122)}px;
`

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};

  flex-direction: row;
  justify-content: space-around;

  margin-bottom: 24px;
`

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;

  ${({ active }) =>
    active &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${({ theme }) => theme.colors.main};
    `}
`

export const OptionTitle = styled.Text<OptionProps>`
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, active }) =>
    active ? theme.colors.header : theme.colors.text_details};
`

export const Section = styled.View``

// Modal

export const ModalContainer = styled.Pressable`
  width: 90%;

  border-radius: 5px;

  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const ModalContent = styled.View`
  margin-top: 20px;
`

export const ModalHeader = styled.View``

export const ModalTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.title};

  text-align: center;
`

export const ModalOption = styled(RectButton)`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  width: 42%;

  align-items: center;
  justify-content: center;

  border-radius: 5px;
` as any

export const ModalOptions = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

export const ModalOptionTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};

  margin-bottom: 10px;
`

export const ModalOverlay = styled.Pressable`
  flex: 1;

  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.85);
`
