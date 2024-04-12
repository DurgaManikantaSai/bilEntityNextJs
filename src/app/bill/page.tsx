"use client";

import React, { useState, useEffect } from 'react';
import GoodsSupplierSelect from '@/components/GoodsSupplierSelect';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Spin, Card } from 'antd';
import { GoodsSupplier } from '@prisma/client';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';

const BillPage: React.FC = () => {
    const [supplier, setSupplier] = useState<GoodsSupplier>();
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            setUserId(session?.user?.id ?? '');
        } else if (status === "unauthenticated") {
            router.push('/signin');
        }
    }, [session, status, router]);

    const handleSupplierSelect = (supplier: GoodsSupplier) => {
        setSupplier(supplier);
        console.log("Selected Supplier",supplier);
        // message.success(supplier);
        // message.success('Supplier selected successfully!');
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // border: "1px solid skyblue",
        borderRadius: 25,
    };

    const elementStyle: React.CSSProperties = {
        margin: '10px auto',
        width: '100%',
        maxWidth: '500px',
        borderRadius: 25,
    };

    const loaderStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(-50%,-50%)'

    };

    const wrapperStyle: React.CSSProperties =  {
        margin: '17px auto'
    }

    if (status === "loading") {
        return <div style={loaderStyle}><Spin size="large" tip="Loading..." /></div>;
    }

    return (
        <div style={wrapperStyle}>
            <div style={containerStyle}>
                <Card title="Get all your bills instantly" style={elementStyle}>
                    <GoodsSupplierSelect
                        style={elementStyle}
                        userId={userId}
                        onSupplierSelect={handleSupplierSelect}
                    />
                    <Link href={{ pathname: "/bill/new"  }} passHref>
                        <Button type="primary" icon={<PlusOutlined />} style={elementStyle}>Add a Bill</Button>
                    </Link>
                    <Link href={{ pathname: "/bill/view", query: { userId } }} passHref>
                        <Button icon={<EyeOutlined />} style={elementStyle}>View Bills</Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default BillPage;
