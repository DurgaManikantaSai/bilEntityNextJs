"use client";
import React, { useEffect } from "react";
import {
  LineHeightOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  UsergroupAddOutlined,
  EnvironmentOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Skeleton,
  Typography,
  theme,
} from "antd";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { message } from "@/lib/notify";
import { useRouter } from "next/navigation";
import { error } from "console";

const Signup: React.FC = () => {
  const {
    token: { padding },
  } = theme.useToken();
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [session, status]);

  const onFinish = async (values: any) => {
    const { error: err } = (await signIn("credentials", {
      redirect: false,
      ...values,
    })) ?? { error: true };
    if (err) {
     console.log(err);
      message.error("Failed to create account, email/phone already exists.");
    } else {
      // TODO: based on role
      router.replace("/");
    }
  };

  return (
    <Skeleton loading={status === "loading"}>
      <Row>
        <Col lg={9} xs={24}>
        
      <Flex justify="center" align="center" style={{ padding }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true, isRegister: true }}
          onFinish={onFinish}
          style={{ minWidth: 320,height:65 }}
        >
          <Typography.Title style={{display:"flex",justifyContent:"center"}} level={2}>Signup</Typography.Title>

          <Form.Item
            name="firmname"
            rules={[
              { required: true, message: "Please enter Firm Name" },
            ]}
          >
            <Input
              prefix={<UsergroupAddOutlined className="site-form-item-icon" />}
              placeholder="Firm Name"
            />
          </Form.Item>

          <Form.Item
            name="owner"
            rules={[
              { required: true, message: "Please enter Owner Name" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Owner Name"
            />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[
              { required: true, message: "Please enter Address" },
            ]}
          >
            <Input
              prefix={<EnvironmentOutlined className="site-form-item-icon" />}
              placeholder="Address"
            />
          </Form.Item>
          <Form.Item
            name="gstNo"
            rules={[
              { required: true, message: "Please enter GST No" },
            ]}
          >
            <Input
              prefix={<AccountBookOutlined className="site-form-item-icon" />}
              placeholder="GST No"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your Phone number!" },
            ]}
          >
            <Input
              type="number"
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="number"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: false, message: "Please input your Email!" }]}
          >
            <Input
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="isRegister" hidden noStyle></Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="login-form-check">Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" href="/signin" style={{color:"blue"}}>
              Have account?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{background:"#101540",borderRadius:20,width:"100%"}}
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
      </Flex>
      </Col>
      <Col lg={1}></Col>
      <Col lg={14} xs={0}>
        <Flex style={{height:600,padding:"0 50px 20px"}}><img src="image 3.png" height="100%"/>
        </Flex>
      </Col>
      </Row>
    </Skeleton>
  );
};

export default Signup;
