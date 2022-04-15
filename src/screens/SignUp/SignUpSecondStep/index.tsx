import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import { useTheme } from 'styled-components/native'
import * as Yup from 'yup'
import { StackParamList } from '../../../@types/navigation'
import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { api } from '../../../services/api'
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  SubTitle,
  Title,
} from './styles'

type Props = NativeStackScreenProps<StackParamList, 'SignUpSecondStep'>

export function SignUpSecondStep({ navigation, route }: Props) {
  const theme = useTheme()
  const { user } = route.params

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleBack() {
    navigation.goBack()
  }

  async function handleRegister() {
    const schema = Yup.object().shape({
      password: Yup.string().required('Senha é obrigatória'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
        .required('Confirmação de senha é obrigatória'),
    })

    try {
      const data = {
        password,
        confirmPassword,
      }

      await schema.validate(data)

      await api.post('users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })

      navigation.navigate('Confirmation', {
        message: 'Agora é só fazer login\ne aproveitar',
        nextScreenRoute: 'SignIn',
        title: 'Conta criada!',
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Erro ', error.message)

        return
      }

      console.log('SignUpSecondStep -> handleRegister -> error', error)
      Alert.alert('Erro', 'Não foi possível criar sua conta')
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
            <FormTitle>2. Senha</FormTitle>
            <Input
              placeholder="Senha"
              iconName="lock"
              secure
              value={password}
              onChangeText={setPassword}
              containerStyle={{ marginBottom: 8 }}
            />
            <Input
              placeholder="Repetir senha"
              iconName="lock"
              secure
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
