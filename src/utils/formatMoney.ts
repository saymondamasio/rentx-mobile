import Intl from 'intl'
import 'intl/locale-data/jsonp/pt-BR'

export function formatMoney(amount: number) {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(amount)
}
