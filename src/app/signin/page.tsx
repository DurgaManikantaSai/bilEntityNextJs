"use client";
import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
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
import { useRouter, useSearchParams } from "next/navigation";

const Signin: React.FC = () => {
  const router = useRouter();
  const {
    token: { padding },
  } = theme.useToken();

  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(searchParams.get("redirect") ?? "/");
    }
  }, [session, status]);

  const onFinish = async (values: any) => {
    const { error: err, status } = (await signIn("credentials", {
      redirect: false,
      ...values,
    })) ?? { error: true };
    if (err || status === 401) {
      message.error("Email or password incorrect.");
    } else {
      router.replace(searchParams.get("redirect") ?? "/");
    }
  };

  return (
    <main style={{maxHeight:"100vh"}}>
    <Skeleton loading={status === "loading"}>
      <Row>
        <Col lg={3} xs={0}></Col>
        <Col lg={4} xs={24}>
        
      <Flex justify="center" align="center" style={{ padding }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ minWidth: 320 }}
          layout="vertical"
        >
          <Typography.Title level={2} style={{display:'flex',justifyContent:'center'}}>Signin</Typography.Title>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Phone"
              height="40px"
              style={{borderRadius:20,height:40}}
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
              style={{borderRadius:20,height:40}}

            />
          </Form.Item>
          <Form.Item style={{ justifyContent: "space-between" }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="login-form-check">Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="#">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{width:"100%",borderRadius:20,background:"#101540"}}
            >
              Signin
            </Button>
           <Typography style={{display:"flex",justifyContent:"center",gap:5,margin:10}}>Don't have an account ? <Link href="/signup">  Signup</Link></Typography> 
          </Form.Item>
        </Form>
      </Flex>
      </Col>
      <Col lg={4}></Col>
      <Col lg={13} xs={0}>
        <Flex style={{height:600,padding:"0 50px 20px"}}><img src="image 3.png" height="60%"/>
        </Flex>
      </Col>
      </Row>
    </Skeleton>
    </main>
  );
};

export default Signin;
