import { createContext, ReactNode, useState } from 'react'
import { api } from '../services/api'

interface User {
  id: string
  email: string
  name: string
  driver_license: string
  avatar: string
}

interface AuthState {
  token: string
  user: User
}

interface SignCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn: (credentials: SignCredentials) => Promise<void>
}

interface Props {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: Props) {
  const [data, setData] = useState<AuthState>({} as AuthState)

  async function signIn({ email, password }: SignCredentials) {
    const responseSignIn = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = responseSignIn.data

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setData({ token, user })
  }

  return (
    <AuthContext.Provider value={{ signIn, user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}
