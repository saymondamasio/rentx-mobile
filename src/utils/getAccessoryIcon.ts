import { SvgProps } from 'react-native-svg'
import AccelerationIcon from '../assets/acceleration.svg'
import CarIcon from '../assets/car.svg'
import EnergyIcon from '../assets/energy.svg'
import ExchangeIcon from '../assets/exchange.svg'
import ForceIcon from '../assets/force.svg'
import GasolineIcon from '../assets/gasoline.svg'
import HybridIcon from '../assets/hybrid.svg'
import PeopleIcon from '../assets/people.svg'
import SpeedIcon from '../assets/speed.svg'

type Icons = {
  [key: string]: React.FC<SvgProps>
}

const icons: Icons = {
  acceleration: AccelerationIcon,
  speed: SpeedIcon,
  turning_diameter: ForceIcon,
  gasoline_motor: GasolineIcon,
  exchange: ExchangeIcon,
  seats: PeopleIcon,
  electric_motor: EnergyIcon,
  hybrid_motor: HybridIcon,
}

export function getAccessoryIcon(type: string) {
  return icons[type] || CarIcon
}
