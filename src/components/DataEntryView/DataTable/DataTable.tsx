import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import getAllCustomers from "../../../db/queries/getAllCustomers";
import ICustomerFromDB from "../../../types/customerDB";
import supabase from "../../../db/config";
import deleteCusomter from "../../../db/queries/deleteCustomer";

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    sorter: (a: ICustomerFromDB, b: ICustomerFromDB) => a.id - b.id,
  },
  {
    title: "Company",
    dataIndex: "company_name",
    key: "company_name",
    sorter: (a: ICustomerFromDB, b: ICustomerFromDB) =>
      a.company_name.localeCompare(b.company_name),
  },
  {
    title: "Contact Name",
    dataIndex: "contact_name",
    key: "contact_name",
    sorter: (a: ICustomerFromDB, b: ICustomerFromDB) =>
      a.contact_name.localeCompare(b.contact_name),
  },
  {
    title: "Contact Phone",
    dataIndex: "contact_phone",
    key: "contact_phone",
  },
  {
    title: "Contact Email",
    dataIndex: "contact_email",
    key: "contact_email",
  },
  {
    title: "Contract Amount",
    dataIndex: "contract_amount",
    key: "contract_amount",
    render: (amount: number) => (
      <>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          compactDisplay: "short",
        }).format(amount)}
      </>
    ),
    sorter: (a: ICustomerFromDB, b: ICustomerFromDB) =>
      a.contract_amount - b.contract_amount,
  },
  {
    title: "Contract Length (M)",
    dataIndex: "contract_length_m",
    key: "contract_length_m",
    sorter: (a: ICustomerFromDB, b: ICustomerFromDB) =>
      a.contract_length_m - b.contract_length_m,
  },
  {
    title: "Contract Started At",
    dataIndex: "contract_started_at",
    key: "contract_started_at",
    sorter: (a: ICustomerFromDB, b: ICustomerFromDB) => {
      const dateA = new Date(a.contract_started_at).getTime();
      const dateB = new Date(b.contract_started_at).getTime();

      return dateA - dateB;
    },
  },
  {
    title: "Delete",
    dataIndex: "id",
    key: "contract_started_at",
    render: ((id:number) => (
      <Button onClick={() => deleteCusomter(id)} danger>X</Button>
    ))
  },
];

const DataTable = () => {
  const [data, setData] = useState<ICustomerFromDB[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateCustomers = async () => {
    setIsLoading(true);
    const customers = await getAllCustomers();
    if (customers) {
      setData(customers);
    } else {
      setData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    supabase
      .channel("customers")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "customers" },
        updateCustomers
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "customers" },
        updateCustomers
      )
      .subscribe();
    updateCustomers();
  }, []);

  return (
    <Table
      style={{ width: "100%" }}
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={{ pageSize: 25 }}
    />
  );
};

export default DataTable;
