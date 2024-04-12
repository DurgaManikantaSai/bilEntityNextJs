"use client"
import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { BillType, GoodsSupplier } from '@prisma/client';
import {addBillForUser} from '@/lib/api';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation';

interface NewBillFormProps {
    supplier: GoodsSupplier; 
}


const NewBillForm: React.FC<NewBillFormProps> = ({ supplier }) => {
    const [form] = useForm();

    const {data: session, status} = useSession();
    const router = useRouter();

    if (status !=='authenticated'){
        router.push('/signin');
        return ;
    }

    const userId = session?.user?.id;
    if(!userId){
        router.push('/signin');
        return ;
    }


    const onFinish = async (formData:any) => {
        console.log("On finish is not executing");
        console.log(formData);
        const { name, amount, type } = formData;
        console.log(name, amount, type);
        try {
            await addBillForUser({
                id: '',
                name: formData.name,
                date: new Date(formData.date),
                amount: parseFloat(formData.amount),
                type: formData.type,
                goodsSupplierId: supplier.id,
                userId: userId
            })
            //show bill added successfully message
            router.push('/bill');
        }
        catch(error){
            console.log('Error adding bill:', error);
            //Handle the error
        }

      
        
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item label="Supplier Name">
                        <Input disabled value={supplier.name} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the bill name' }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the bill date' }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please enter the bill amount' }]}>
                        <Input type="number" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24}>
                    <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the bill type' }]}>
                        <Select style={{ width: '100%' }}>
                            {Object.values(BillType).map(type => (
                                <Select.Option key={type} value={type}>
                                    {type}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default NewBillForm;
