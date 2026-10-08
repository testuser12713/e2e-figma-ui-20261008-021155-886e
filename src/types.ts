export type CustomerStatus = 'active' | 'inactive'

export type OrderStatus = 'open' | 'completed' | 'cancelled'

export type StatusFilter = 'all' | 'active' | 'inactive'

export interface Customer {
  id: string
  name: string
  company: string
  city: string
  email: string
  phone: string
  status: CustomerStatus
  revenue: number
  since: string
}

export interface Order {
  id: string
  customerId: string
  date: string
  description: string
  amount: number
  status: OrderStatus
}

export interface Activity {
  id: string
  date: string
  customerId: string
  customerName: string
  text: string
}

export interface RevenuePoint {
  month: string
  revenue: number
}
