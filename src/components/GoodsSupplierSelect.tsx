
import React, { useEffect, useState, CSSProperties, useLayoutEffect } from 'react';
import { Select, Spin, Button } from 'antd';
import { GoodsSupplier } from '@prisma/client';
import { getAllGoodsSuppliers } from '@/lib/api';
import { useRouter } from 'next/navigation';

const { Option } = Select;

interface GoodsSupplierSelectProps {
    userId: string;
    onSupplierSelect: (supplier: GoodsSupplier) => void;
    style?: CSSProperties;
}

export default function GoodsSupplierSelect({ userId, onSupplierSelect, style }: GoodsSupplierSelectProps) {
    const [goodsSuppliers, setGoodsSuppliers] = useState<GoodsSupplier[]>([]);
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        getAllGoodsSuppliers(userId)
            .then((suppliers) => {
                console.log("This is in useEffect, got all suppliers", suppliers, suppliers[0], suppliers[1]);
                setGoodsSuppliers(suppliers.goodsSuppliers);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [userId]);

    const handleAddUser = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push('/supplier');
    };

    return (
        <div style={style}>
            <Select
                placeholder="Select Supplier"
                loading={loading}
                notFoundContent={loading ? <Spin size="small" /> : "Loading..."} // Show "Loading..." if data is still being fetched
                onChange={onSupplierSelect}
                onDropdownVisibleChange={setDropdownOpen}
                style={{ width: '100%' }}
            >
                <Option key="add-user" onClick={handleAddUser}>
                    <Button
                        type="primary"
                        style={{ backgroundColor: 'blue' }}
                        onClick={handleAddUser}
                    >
                        Add a new supplier
                    </Button>
                </Option>
                { goodsSuppliers && goodsSuppliers.map((supplier) => (
                    <Option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
}
