

import NewBillForm from "@/components/NewBillForm";
import {GoodsSupplier} from '@prisma/client';



export default async function createBill(supplier: GoodsSupplier){
    return (
        <NewBillForm supplier={supplier} />
    )
}

