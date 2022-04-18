import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { LoadAnimation } from '../components/LoadAnimation'
import { useAuth } from '../hooks/auth'
import { AppStackRoutes } from './app.stack.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, loading } = useAuth()

  return loading ? (
    <LoadAnimation />
  ) : (
    <NavigationContainer>
      {user.id ? <AppStackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
