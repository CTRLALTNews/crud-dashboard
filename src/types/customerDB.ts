export default interface ICustomerFromDB {
  company_name: string,
  contact_name: string,
  contact_phone: string,
  contact_email: string,
  contract_amount: number,
  contract_length_m: number,
  contract_started_at: Date,
  id: number
}
