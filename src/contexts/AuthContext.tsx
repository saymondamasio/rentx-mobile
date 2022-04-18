import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { database } from '../database'
import { User as ModelUser } from '../database/model/User'
import { api } from '../services/api'

interface User {
  id: string
  user_id: string
  email: string
  name: string
  driver_license: string
  avatar: string
  token: string
}

interface SignCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn: (credentials: SignCredentials) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (user: User) => Promise<void>
  loading: boolean
}

interface Props {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: Props) {
  const [data, setData] = useState<User>({} as User)
  const [loading, setLoading] = useState(false)

  async function loadUserData() {
    setLoading(true)

    const userCollection = database.get<ModelUser>('users')
    const response = await userCollection.query().fetch()

    if (response.length > 0) {
      const userData = response[0]._raw as unknown as User
      setData(userData)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadUserData()
  }, [])

  async function signIn({ email, password }: SignCredentials) {
    try {
      const responseSignIn = await api.post('sessions', {
        email,
        password,
      })

      const { token, user } = responseSignIn.data

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        await userCollection.create(newUser => {
          newUser.userId = user.id
          newUser.name = user.name
          newUser.email = user.email
          newUser.driver_license = user.driver_license
          newUser.avatar = user.avatar
          newUser.token = token
        })
      })

      setData({ ...user, token })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id)
        await userSelected.destroyPermanently()
      })

      setData({} as User)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id)
        await userSelected.update(userData => {
          userData.name = user.name
          userData.driver_license = user.driver_license
          userData.avatar = user.avatar
        })
      })

      setData(user)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, updateUser, user: data, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
