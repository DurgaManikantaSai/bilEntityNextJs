"use client";
import React, { useEffect, useState } from "react";
import { appLogo, appName } from "@/utils/config";
import {
  Badge,
  Col,
  Dropdown,
  Flex,
  Grid,
  Image,
  Row,
  Space,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import {
  ShoppingCartOutlined,
  ShoppingFilled,
  UserOutlined,
  BankOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { signOut, useSession } from "next-auth/react";


import { useUserStore } from "@/lib/userStore";
import { redirect, useRouter } from "next/navigation";


const { useToken } = theme;

const profileMenuItems: MenuProps["items"] = [
  {
    key: "account",
    label: (
      <Link rel="noopener noreferrer" href="/account">
        <BankOutlined /> Account
      </Link>
    ),
  },
  {
    key: "orders",
    label: (
      <Link rel="noopener noreferrer" href="/orders">
        <ShoppingFilled /> My Orders
      </Link>
    ),
  },
  {
    key: "signout",
    label: (
      <Space onClick={()=>signOut({ callbackUrl: '/signin' })}>
        <PoweroffOutlined /> Sign out
      </Space>
    ),
  },
];

const HeaderMenu: React.FC = () => {
  const { xs } = Grid.useBreakpoint();

  const { data: session, status } = useSession();
  
  const isLoggedIn = session?.user.id;

  const { user } = useUserStore((s) => s);
  const { setUser } = useUserStore((s) => s);
  const { reset } = useUserStore((s) => s);


  useEffect(() => {
    if (status === "loading") return;
    if (session?.user.id && (!user || user.id !== session?.user.id)) {
      setUser(session?.user.id);
    } else {
      reset();
    }
  }, [session?.user.id, status]);

  /**
   * Workaround for React Minified Error #418
   * https://github.com/vercel/next.js/discussions/43921#discussioncomment-5614536
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const items: MenuProps["items"] = [
    {
      key: "profile",
      icon: xs && <UserOutlined />,
      label: (
        <Space>
          {isLoggedIn ? (
            <Dropdown menu={{ items: profileMenuItems }}>
              {xs ? (
                <Typography>{session?.user.firmname}</Typography>
              ) : (
                <UserOutlined />
              )}
            </Dropdown>
          ) : (
            <Link href="/signin">Signin</Link>
          )}
        </Space>
      ),
    },
   
  ];

  return (
    <Menu
      mode="horizontal"
      items={items}
      style={{
        display: "flex",
        flex: xs ? 1 : 1,
        justifyContent: "end",
        // border: "solid 1px skyblue",
        borderRadius: 20,
        marginTop: 7,
        
      }}
      disabledOverflow
    />
  );
};

const Header: React.FC = () => {
  const {
    token: { padding, colorBgContainer },
  } = useToken();
  const { md } = Grid.useBreakpoint();

  return (
    <Layout.Header
      style={{
        display: "flex",
        width: "100%",
        background: colorBgContainer,
        flexDirection: "column",
        minHeight: 144,
        paddingLeft: padding,
        paddingRight: padding,
      }}
    
    >
      <Flex align="center" gap={padding}>
        <Link href="/" style={{ color: "inherit" }}>
          {md ? (
            <Typography.Title level={3} style={{ fontWeight: 700, margin: 0 }}>
              {appName}
            </Typography.Title>
          ) : (
            <>
            </>
            // <Image
            //   src={appLogo}
            //   alt={appName}
            //   width={48}
            //   height={48}
            //   preview={false}
            // />
          )}
        </Link>
        
        <HeaderMenu />
      </Flex>
      <Row gutter={padding} align="middle">
        <Col xs={24} lg={24} >

          
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
