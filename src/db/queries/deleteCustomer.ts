import supabase from "../config";

const deleteCusomter = async(id:number) => {
  const { data, error } = await supabase.from("customers").delete().eq("id", id);
  return data;
}

export default deleteCusomter