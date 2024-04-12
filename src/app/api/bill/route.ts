
//api/bill

//create a new bill to the respective user
//Retrive all the bills for the particular user


import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import {Bill, BillType} from '@prisma/client'



interface CreateBillRequestBody {
    name: string;
    date: Date;
    amount: number;
    type: 'GST' | 'NON_GST';
    goodsSupplierId: string;
    userId: string;
}


export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const goodsSupplierId = url.searchParams.get('goodsSupplierId');
        const billType = url.searchParams.get('billType');
        const date = url.searchParams.get('date');
        const amount = url.searchParams.get('amount');

        if (!userId) {
            return NextResponse.json({
                error: "User ID is required as a query parameter",
                status: 400
            });
        }

        let queryConditions = {
            where: {
                userId: userId,
                ...(goodsSupplierId && { goodsSupplierId: goodsSupplierId }),
                ...(billType && { type: billType as BillType }),
                ...(date && { date: { equals: new Date(date) } }),
                ...(amount && {
                    amount: {
                        gte: Number(amount.split('-')[0]),
                        lte: Number(amount.split('-')[1])
                    }
                }),
            }
        };


        const bills = await prisma.bill.findMany(queryConditions);

        return NextResponse.json({ bills, status: 200 });
    } catch (error) {
        console.error("Error fetching bills", error);
        return NextResponse.json({
            error: `An error occurred while fetching bills: ${error}`,
            status: 500
        });
    }
}




export async function POST(req: NextRequest, res: NextResponse<Bill>) {
    try {
        const billBody = await req.json();
        const { name, date, amount, type, goodsSupplierId, userId }: CreateBillRequestBody = billBody;
        const bill = await prisma.bill.create({
            data: {
                name,
                date,
                amount,
                type,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                goodsSupplier: {
                    connect: {
                        id: goodsSupplierId,
                    },
                },
            },
        });
        return NextResponse.json(bill);
    } catch (error) {
        console.error('Error creating bill:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}