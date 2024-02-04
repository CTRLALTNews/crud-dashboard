import { theme } from "antd";
import ICustomerFromDB from "../../../types/customerDB";
import { useEffect, useState } from "react";

interface IProps {
  customers: ICustomerFromDB[];
}

const AverageRevenue = (props: IProps) => {
  const [averageRevenue, setAverageRevenue] = useState<number>();
  const {
    token: {
      padding,
      colorBorder,
      borderRadius,
      fontSizeHeading1,
      fontWeightStrong,
    },
  } = theme.useToken();

  useEffect(() => {
    const handleAverageRevenue = () => {
      const total = props.customers.reduce((sum, customer) => {
        return sum + customer.contract_amount;
      }, 0);
      const avg = total / props.customers.length;
      setAverageRevenue(avg);
    };
    handleAverageRevenue();
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
      <h2>Average Revenue Per Customer</h2>
      <div
        style={{
          height: "90%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {averageRevenue && (
          <p
            style={{ fontSize: fontSizeHeading1, fontWeight: fontWeightStrong }}
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(averageRevenue)}
          </p>
        )}
      </div>
    </div>
  );
};

export default AverageRevenue;
