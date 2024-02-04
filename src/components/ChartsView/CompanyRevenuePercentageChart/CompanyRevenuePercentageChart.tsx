import { useEffect, useState } from "react";
import ICustomerFromDB from "../../../types/customerDB";
import { theme } from "antd";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

interface IProps {
  customers: ICustomerFromDB[];
}

interface Revenue {
  companyName: string;
  revenue: number;
}

const CompanyRevenuePercentageChart = (props: IProps) => {
  const [revenue, setRevenue] = useState<Revenue[]>([]);

  const {
    token: { padding, colorBorder, borderRadius },
  } = theme.useToken();

  useEffect(() => {
    const groupRevenue = () => {
      const revenueByCompany: { [key: string]: number } = {};

      props.customers.forEach((c) => {
        if (!revenueByCompany[c.company_name]) {
          revenueByCompany[c.company_name] = 0;
        }
        revenueByCompany[c.company_name] += c.contract_amount;
      });

      const groupedRevenue = Object.keys(revenueByCompany).map((company) => {
        return {
          companyName: company,
          revenue: revenueByCompany[company],
        };
      });

      setRevenue(groupedRevenue);
    };

    groupRevenue();
  }, [props.customers]);

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
      <h2>Comapny Revenue Percentage</h2>
      <div style={{ height: "90%", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={revenue}
              dataKey="revenue"
              nameKey="companyName"
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={90}
              fill="#722ed1"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
                percent,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#722ed1"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {revenue[index].companyName}
                    &nbsp;
                    (
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(value)}- 
                    {(percent * 100).toFixed(0) + "%"}
                    )
                    
                  </text>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompanyRevenuePercentageChart;
