import { tableSchema } from '@nozbe/watermelondb/Schema'

export const carSchema = tableSchema({
  name: 'cars',
  columns: [
    { name: 'car_id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'brand', type: 'string' },
    { name: 'about', type: 'string' },
    { name: 'price', type: 'number' },
    { name: 'fuel_type', type: 'string' },
    { name: 'period', type: 'string' },
    { name: 'thumbnail', type: 'string' },
  ],
})
