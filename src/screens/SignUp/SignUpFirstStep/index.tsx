import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import * as Yup from 'yup'
import { StackParamList } from '../../../@types/navigation'
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

type Props = NativeStackScreenProps<StackParamList, 'SignUpFirstStep'>

export function SignUpFirstStep({ navigation }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [driverLicense, setDriverLicense] = useState('')

  function handleBack() {
    navigation.goBack()
  }

  async function handleNextStep() {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('E-mail é obrigatório'),
      driverLicense: Yup.string().required('CNH é obrigatório'),
    })

    try {
      const data = { name, email, driverLicense }

      await schema.validate(data)

      navigation.navigate('SignUpSecondStep', {
        user: data,
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Erro ', error.message)
      }
    }
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
              value={name}
              onChangeText={setName}
              containerStyle={{ marginBottom: 8 }}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              containerStyle={{ marginBottom: 8 }}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
              containerStyle={{ marginBottom: 8 }}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
