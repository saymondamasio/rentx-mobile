import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import { RootStackParamList } from '../../../@types/navigation'
import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  SubTitle,
  Title,
} from './styles'

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpFirstStep'>

export function SignUpFirstStep({ navigation }: Props) {
  function handleBack() {
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              containerStyle={{ marginBottom: 8 }}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              containerStyle={{ marginBottom: 8 }}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              containerStyle={{ marginBottom: 8 }}
            />
          </Form>

          <Button title="Próximo" />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
