import { CarDTO } from '../../dtos/CarDTO'

export type StackParamList = {
  SignIn: undefined
  AppTabs: undefined
  SignUpFirstStep: undefined
  SignUpSecondStep: {
    user: {
      name: string
      email: string
      driverLicense: string
    }
  }
  Splash: undefined
  CarDetails: { car: CarDTO }
  Scheduling: { car: CarDTO }
  SchedulingDetails: {
    car: CarDTO
    dates: string[]
  }
  Confirmation: {
    title: string
    message: string
    nextScreenRoute: keyof StackParamList
  }
  MyCars: undefined
}

export type TabParamList = {
  Home: undefined
  Profile: undefined
  MyCars: undefined
}
