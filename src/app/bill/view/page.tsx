
"use client";


// pages/bills.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Table, Space, Select, DatePicker, Button } from 'antd';
import GoodsSupplierSelect from '@/components/GoodsSupplierSelect';
import { Bill, GoodsSupplier } from '@prisma/client';
import {getAllBillsForUser} from '@/lib/api'
import moment from 'moment';

// Assuming getBills function and Props type are defined elsewhere
export const getBills = async () => {
    return [];
};

type Props = {
    bills: Bill[];
};

const Bills: React.FC<Props> = ({ bills }) => {
    const searchparams = useSearchParams();
    const userId = searchparams.get('userId') as string;
    const [billTypeFilter, setBillTypeFilter] = useState<string | undefined>();
    const [dateFilter, setDateFilter] = useState<string | undefined>();
    const [supplier, setSupplier] = useState<GoodsSupplier | undefined>();
    const [filteredBills, setFilteredBills] = useState<Bill[]>([]);

    const handleSupplierSelect = (supplier: GoodsSupplier) => {
        setSupplier(supplier);
    }

    // Function to reset all filters
    const resetFilters = () => {
        setBillTypeFilter(undefined);
        setDateFilter(undefined);
        setSupplier(undefined);
        // Any other filter reset logic can go here
    };

    useEffect(() => {
        const fetchData = async () => {
            const data: Bill[] = await getAllBillsForUser(userId, supplier?.id, billTypeFilter, dateFilter);
            setFilteredBills(data);
        };

        fetchData();
    }, [userId, supplier, billTypeFilter, dateFilter]);


    return (
        <div style={{ padding: '1rem', margin: '1rem' }}>
            <Space style={{ marginBottom: 16 }}>
                <GoodsSupplierSelect userId={userId} onSupplierSelect={handleSupplierSelect} />
                <Select
                    placeholder="Bill Type"
                    value={billTypeFilter}
                    onChange={value => setBillTypeFilter(value)}
                    allowClear // This adds a clear icon to Select component
                >
                    <Select.Option value="GST">GST</Select.Option>
                    <Select.Option value="NON_GST">Non-GST</Select.Option>
                </Select>

                <DatePicker
                    onChange={date => setDateFilter(date ? date.format('YYYY-MM-DD') : undefined)}
                    value={dateFilter ? moment(dateFilter) : null} // Ensure the value is properly controlled
                    allowClear
                />

                <Button onClick={resetFilters}>Reset Filters</Button>
            </Space>

            <Table dataSource={filteredBills} style={{ margin: '1rem' }}>

            </Table>
        </div>
    );
};

export default Bills;
