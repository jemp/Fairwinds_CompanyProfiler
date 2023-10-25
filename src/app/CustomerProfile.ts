export interface CustomerProfile {
  customer_number: number
  first_name: string
  last_name: string
  date_birth: string
  ssn: string
  email: string
  primary_address: PrimaryAddress
  mobile_phone_number: string
  join_date: Date
}

export interface PrimaryAddress {
  address_line_1: string
  city: string
  state: string
  zip_code: number
}

}}
