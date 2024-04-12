
import prisma from "./prisma";
import { GoodsSupplier } from "@prisma/client";

// export const getAllGoodsSuppliersForUser = async (givenUserId:string) : Promise<GoodsSupplier[]> => {

//     console.log("In getAllGOodsSuppliseForUser file");
//     console.log("This is userId", givenUserId);
//     const res =  await prisma.goodsSupplier.findMany({
//         where: {
//             userId: givenUserId,
//         },
//         // include: { goodsSuppliers:true}
//     })

//     console.log("Fetched user with goods suppliers", res);

//     // const goodsSuppliers: GoodsSupplier[]  = res?.goodsSuppliers || [];


//     // console.log("This is goods Suppliers array", goodsSuppliers);



//     console.log("services/getAllGoodsSuppliersForUser, here is the result fetched from res");
//     console.log(res);
//     return res;
//     // return goodsSuppliers;
// }

// getAllGoodsSuppliersForUser('66157ab57e982a933b878595');