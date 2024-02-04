import { Flex } from "antd"
import DataTable from "./DataTable/DataTable"
import DataEntry from "./DataEntry/DataEntry"

const DataEntryView = () => {
  return (
    <Flex vertical gap={"middle"}>
      <DataEntry/>
      <DataTable />
    </Flex>
  )
}

export default DataEntryView