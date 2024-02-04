import { Layout, theme, Menu } from "antd";
import { useState } from "react";
import type { MenuProps } from "antd";
import { AreaChartOutlined, EditOutlined } from "@ant-design/icons";
import DataEntryView from "./components/DataEntryView/DataEntryView";
import ChartsView from "./components/ChartsView/ChartsView";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Data Entry", "dataEntry", <EditOutlined />),
  getItem("Data View", "charts", <AreaChartOutlined />),
]; 

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState("dataEntry");
  const {
    token: { padding, paddingXS },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["dataEntry"]}
          mode="inline"
          items={items}
          style={{ padding: paddingXS }}
          onClick={(e) => {
            setView(e.key);
          }}
        />
      </Sider>
      <Layout style={{padding: padding}}>
        {view == "dataEntry" && <DataEntryView />}

        {view == "charts" && <ChartsView />}
      </Layout>
    </Layout>
  );
}

export default App;
