import supabase from "../config";

interface ICustomer {
  companyName: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contractAmount: number;
  contractLength: number;
  contractStartedAt: Date;
}

const createCustomer = async(customer:ICustomer) => {
  const dataToInsert = {
    company_name: customer.companyName,
    contact_name: customer.contactName,
    contact_phone: customer.contactPhone,
    contact_email: customer.contactEmail,
    contract_amount: customer.contractAmount,
    contract_length_m: customer.contractLength,
    contract_started_at: customer.contractStartedAt
  }

  const { data, error } = await supabase.from("customers").insert(
    dataToInsert
  );
  return data;
}

export default createCustomer