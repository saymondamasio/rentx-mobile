import { CarDTO } from '../../dtos/CarDTO'

export type RootStackParamList = {
  SignIn: undefined
  SignUpFirstStep: undefined
  SignUpSecondStep: {
    user: {
      name: string
      email: string
      driverLicense: string
    }
  }
  Splash: undefined
  Home: undefined
  CarDetails: { car: CarDTO }
  Scheduling: { car: CarDTO }
  SchedulingDetails: {
    car: CarDTO
    dates: string[]
  }
  Confirmation: {
    title: string
    message: string
    nextScreenRoute: keyof RootStackParamList
  }
  MyCars: undefined
}
