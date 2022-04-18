import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components/native'
import { TabParamList } from '../@types/navigation'
import CarIcon from '../assets/car.svg'
import HomeIcon from '../assets/home.svg'
import ProfileIcon from '../assets/profile.svg'
import { Home } from '../screens/Home'
import { MyCars } from '../screens/MyCars'
import { Profile } from '../screens/Profile'

const { Navigator, Screen } = createBottomTabNavigator<TabParamList>()

export function AppTabRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_details,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 60,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => <CarIcon color={color} />,
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Navigator>
  )
}
