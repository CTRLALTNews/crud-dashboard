import {
  Card,
  Divider,
  Input,
  theme,
  InputNumber,
  Form,
  Button,
  message,
  DatePicker,
} from "antd";
import createCustomer from "../../../db/queries/createCustomer";

type FieldType = {
  companyName?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contractAmount?: number;
  contractLength?: number;
  contractStartedAt?: Date;
};

const DataEntry = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    token: { margin },
  } = theme.useToken();

  const onFinish = async (rawFieldValues:any) => {
    const values = {
      ...rawFieldValues,
      "contractStartedAt": new Date(rawFieldValues["contractStartedAt"].format("YYYY-MM-DD"))
    }
    await createCustomer(values);
    console.log(values)
    messageApi.success("Customer created!");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Card size="small" title="Create New Customer" style={{ width: "100%" }}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout={"vertical"}
        >
          <div
            style={{
              width: "100%",
              height: "fit",
              display: "flex",
              gap: margin,
            }}
          >
            <div
              style={{
                width: "33%",
                height: "fit",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Form.Item<FieldType>
                  label="Company Name"
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the company name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <Divider />
              <div>
                <Form.Item<FieldType>
                  label="Contract Signed"
                  name="contractStartedAt"
                  rules={[
                    {
                      required: true,
                      message: "Please select a valid date",
                    },
                  ]}
                >
                  <DatePicker style={{width: "100%"}} format={"YYYY-MM-DD"}/>
                </Form.Item>
              </div>
            </div>
            <div
              style={{
                width: "33%",
                height: "fit",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Form.Item<FieldType>
                  label="Contact Name"
                  name="contactName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contact name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <Divider />

              <div>
                <Form.Item<FieldType>
                  label="Contact Phone"
                  name="contactPhone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contact phone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <Divider />

              <div>
                <Form.Item<FieldType>
                  label="Contact Email"
                  name="contactEmail"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contact email!",
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div
              style={{
                width: "33%",
                height: "fit",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Form.Item<FieldType>
                  label="Contract Amount"
                  name="contractAmount"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contract amount!",
                    },
                  ]}
                >
                  <InputNumber addonBefore="$" style={{ width: "100%" }} />
                </Form.Item>
              </div>
              <Divider />
              <div>
                <Form.Item<FieldType>
                  label="Contract Length"
                  name="contractLength"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contract length!",
                    },
                  ]}
                >
                  <InputNumber
                    addonBefore="Month(s)"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <Button type="primary" htmlType="submit">
            Create Customer
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default DataEntry;
