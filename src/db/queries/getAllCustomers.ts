import supabase from "../config";

const getAllCustomers = async() => {
  const { data } = await supabase.from("customers").select();
  return data;
}

export default getAllCustomers