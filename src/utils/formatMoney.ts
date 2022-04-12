export function formatMoney(amount: number) {
  return amount.toLocaleString('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })
}
