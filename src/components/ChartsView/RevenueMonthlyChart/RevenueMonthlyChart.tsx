import { useEffect, useState } from "react";
import ICustomerFromDB from "../../../types/customerDB";
import { theme } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface IGroupedCustomer {
  month: string;
  revenue: number;
}

interface IProps {
  customers: ICustomerFromDB[];
}

const RevenueMonthlyChart = (props: IProps) => {
  const [groupedCustomers, setGroupedCustomers] = useState<IGroupedCustomer[]>(
    []
  );

  const {
    token: { padding, colorBorder, borderRadius },
  } = theme.useToken();

  useEffect(() => {
    const handleGroupCustomers = () => {
      const months: { [key: string]: number } = {};

      props.customers.forEach((c) => {
        const date = new Date(c.contract_started_at);
        const month = date.getFullYear() + "-" + (date.getMonth() + 1);

        if (!months[month]) {
          months[month] = 0;
        }

        months[month] += c.contract_amount;
      });

      const revenue = Object.keys(months).map((month) => {
        return {
          month,
          revenue: months[month],
        };
      });

      revenue.sort((a, b) => {
        const dateA = new Date(a.month).getTime();
        const dateB = new Date(b.month).getTime();

        return dateA - dateB;
      });

      setGroupedCustomers(revenue);
    };

    handleGroupCustomers();
  }, [props.customers]);

  console.log(groupedCustomers);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: padding,
        border: `1px solid ${colorBorder}`,
        borderRadius: borderRadius,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Revenue Each Month</h2>
      <div style={{ height: "90%", width: "100%" }}>
        <ResponsiveContainer>
          <BarChart data={groupedCustomers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  notation: "compact",
                  compactDisplay: "short"
                }).format(value)
              }
            />
            <Bar dataKey="revenue" fill="#1677FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueMonthlyChart;
