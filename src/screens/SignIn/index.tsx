import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import { useTheme } from 'styled-components/native'
import * as Yup from 'yup'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Container, Footer, Form, Header, SubTitle, Title } from './styles'

export function SignIn() {
  const theme = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Digite um email válido')
        .required('Email é obrigatório'),
      password: Yup.string().required('Senha é obrigatória'),
    })

    try {
      await schema.validate({ email, password })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Erro ', error.message)
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique suas credenciais.'
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar backgroundColor="transparent" translucent style="dark" />
          <Header>
            <Title>Estamos{'\n'}quase lá</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiencia incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
              containerStyle={{ marginBottom: 8 }}
            />
            <Input
              iconName="lock"
              placeholder="Senha"
              secure
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              loading={false}
              style={{ marginBottom: 8 }}
              onPress={handleSignIn}
            />
            <Button
              title="Criar conta gratuita"
              enabled={false}
              loading={false}
              color={theme.colors.background_secondary}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
