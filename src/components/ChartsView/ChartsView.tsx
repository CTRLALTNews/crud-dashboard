import { useEffect, useState } from "react";
import { Col, Row, theme } from "antd";
import ICustomerFromDB from "../../types/customerDB";
import getAllCustomers from "../../db/queries/getAllCustomers";
import supabase from "../../db/config";
import RevenueMonthlyChart from "./RevenueMonthlyChart/RevenueMonthlyChart";
import AverageRevenue from "./AverageRevenue/AverageRevenue";
import CompanyRevenuePercentageChart from "./CompanyRevenuePercentageChart/CompanyRevenuePercentageChart";

const ChartsView = () => {
  const [customers, setCustomers] = useState<ICustomerFromDB[]>([]);
  const {
    token: { padding },
  } = theme.useToken();

  const updateCustomers = async () => {
    const customers = await getAllCustomers();
    if (customers) {
      setCustomers(customers);
    } else {
      setCustomers([]);
    }
  };

  useEffect(() => {
    updateCustomers();

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
  }, []);

  const rowStyle = {
    height: "50%",
    width: "100%",
    padding: padding,
    "@media (max-width: 992px)": {
      height: "100%",
    },
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Row style={rowStyle}>
        <Col md={24} lg={12} style={{ padding: padding }}>
          <CompanyRevenuePercentageChart customers={customers} />
        </Col>
        <Col md={24} lg={12} style={{ padding: padding }}>
          <AverageRevenue customers={customers} />
        </Col>
      </Row>
      <Row style={{ height: "50%", width: "100%", padding: padding }}>
        <Col span={24} style={{ padding: padding }}>
          <RevenueMonthlyChart customers={customers} />
        </Col>
      </Row>
    </div>
  );
};

export default ChartsView;
