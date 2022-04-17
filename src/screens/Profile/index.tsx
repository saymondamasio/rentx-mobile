import { Feather } from '@expo/vector-icons'
import { useNetInfo } from '@react-native-community/netinfo'
import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Modal } from 'react-native'
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { useTheme } from 'styled-components/native'
import * as Yup from 'yup'
import { TabParamList } from '../../@types/navigation'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalOption,
  ModalOptions,
  ModalOptionTitle,
  ModalOverlay,
  ModalTitle,
  Option,
  Options,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section,
} from './styles'

type Props = BottomTabScreenProps<TabParamList, 'Profile'>

export function Profile({ navigation }: Props) {
  const theme = useTheme()

  const netInfo = useNetInfo()

  const { user, signOut, updateUser } = useAuth()

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)

  function handleBack() {
    navigation.goBack()
  }

  function handleChangeOption(option: 'dataEdit' | 'passwordEdit') {
    if (netInfo.isConnected === false && option === 'passwordEdit') {
      Alert.alert(
        'Sem conexão',
        'É necessário estar conectado para alterar a senha.'
      )

      return
    }
    setOption(option)
  }

  async function handleOpenCamera() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (result.cancelled) {
      setIsOpenModal(false)
      return
    }

    if (result.uri) {
      setAvatar(result.uri)
    }
  }

  async function handleOpenGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (result.cancelled) {
      setIsOpenModal(false)
      return
    }

    if (result.uri) {
      setAvatar(result.uri)
      setIsOpenModal(false)
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false)
  }

  function handleOpenModal() {
    setIsOpenModal(true)
  }

  function handleSignOut() {
    Alert.alert(
      'Tem certeza que deseja sair?',
      'Lembre-se, que se você sair, irá precisar de internet para entrar novamente.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: signOut,
          style: 'destructive',
        },
      ]
    )
  }

  async function handleUpdateProfile() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        driverLicense: Yup.string().required('CNH obrigatório'),
      })

      await schema.validate({ name, driverLicense })

      await updateUser({
        user_id: user.id,
        id: user.id,
        name,
        driver_license: driverLicense,
        avatar,
        email: user.email,
        token: user.token,
      })

      Alert.alert('Alterações salvas com sucesso!')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Erro', error.message)
      }

      Alert.alert('Não foi possível atualizar o perfil')
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" color={theme.colors.shape} size={24} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}

              <PhotoButton onPress={handleOpenModal}>
                <Feather name="camera" color={theme.colors.shape} size={24} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                onPress={() => handleChangeOption('dataEdit')}
                active={option === 'dataEdit'}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                onPress={() => handleChangeOption('passwordEdit')}
                active={option === 'passwordEdit'}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' && (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                  containerStyle={{ marginBottom: 8 }}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  value={user.email}
                  containerStyle={{ marginBottom: 8 }}
                />
                <Input
                  iconName="credit-card"
                  keyboardType="numeric"
                  placeholder="CNH"
                  onChangeText={setDriverLicense}
                  defaultValue={user.driver_license}
                />
              </Section>
            )}

            {option === 'passwordEdit' && (
              <Section>
                <Input
                  iconName="lock"
                  placeholder="Senha atual"
                  autoCorrect={false}
                  secure
                  containerStyle={{ marginBottom: 8 }}
                />

                <Input
                  iconName="lock"
                  placeholder="Nova senha"
                  autoCorrect={false}
                  secure
                  containerStyle={{ marginBottom: 8 }}
                />

                <Input
                  iconName="lock"
                  placeholder="Repetir senha"
                  autoCorrect={false}
                  secure
                />
              </Section>
            )}

            <Button title="Salvar alterações" onPress={handleUpdateProfile} />
          </Content>

          <Modal visible={isOpenModal} transparent>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ModalOverlay onPress={handleCloseModal}>
                <ModalContainer onPress={() => {}}>
                  <ModalHeader>
                    <ModalTitle>Selecionar foto</ModalTitle>
                  </ModalHeader>
                  <ModalContent>
                    <ModalOptions>
                      <ModalOption onPress={handleOpenCamera}>
                        <ModalOptionTitle>Câmera</ModalOptionTitle>
                        <Feather
                          name="camera"
                          size={30}
                          color={theme.colors.title}
                        />
                      </ModalOption>

                      <ModalOption onPress={handleOpenGallery}>
                        <ModalOptionTitle>Galeria</ModalOptionTitle>
                        <Feather
                          name="image"
                          size={30}
                          color={theme.colors.title}
                        />
                      </ModalOption>
                    </ModalOptions>
                  </ModalContent>
                </ModalContainer>
              </ModalOverlay>
            </GestureHandlerRootView>
          </Modal>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
