

import { API_ROOT } from "@/utils/config";
import { User, Bill } from "@prisma/client";


export const getUser = async (userId: string) => {
    const user = await fetch(`${API_ROOT}users/${userId}`, { cache: "no-cache" }).then((res) =>
        res.json()
    );
    return user;
};

export const updateUser = async (
    userId: string,
    updateBody: Partial<User>
): Promise<User> => {
    const user = await fetch(`${API_ROOT}users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(updateBody),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return user;
};





//Get all bills associated with the speicfic user and goodsSupplier
export const getAllBillsForUser = async (
    userId: string,
    supplierId?: string,
    billType?: string,
    date?: string
): Promise<Bill[]> => {
    let apiUrl = `${API_ROOT}bill?userId=${userId}`;

    if (supplierId) {
        apiUrl += `&supplierId=${supplierId}`;
    }

    if (billType) {
        apiUrl += `&billType=${billType}`;
    }

    if (date) {
        apiUrl += `&date=${date}`;
    }

    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.bills as Bill[];
};



export const addBillForUser = async (addBillBody: Bill) => {
    
    console.log(addBillBody);
    let apiUrl = `${API_ROOT}bill`;
    console.log(apiUrl);
    // console.log("JSON BODY", JSON.stringify(addBillBody));



    const addBill = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(addBillBody),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json());
    return addBill;
}










export const getAllGoodsSuppliers = async(userId: string) => {
    const apiUrl = `${API_ROOT}goodsSupplier?userId=${userId}`;
    console.log("THis is apiUrl", apiUrl);
    const goodsSuppliers = await fetch(apiUrl)
        .then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .catch((error) => {
            console.error(`Failed to fetch goods suppliers: ${error.message}`);
        });
        console.log("goodsSuppliers are");
        console.log(apiUrl);
        console.log(goodsSuppliers);
        return goodsSuppliers;

    // // Mock data
    // // Generate an array of 100 mock suppliers
    // const goodsSuppliers = Array.from({ length: 100 }, (_, i) => ({
    //     id: `${i + 1}`,
    //     name: `Supplier ${i + 1}`,
    // }));

    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(goodsSuppliers);
    //     }, 1000);
    // });
}