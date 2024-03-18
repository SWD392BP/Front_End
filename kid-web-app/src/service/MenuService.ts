import * as Constant from "@/common/Constant";
import { JsonBody } from "@/types";

export async function ApiCreateMenu(HostUserId: number,MenuName: string, Price: number, Description: string, Image: File | null, token: string){
    var data = new FormData();    
    data.append("HostUserId", HostUserId.toString());
    data.append("MenuName", MenuName);
    data.append("Price", Price.toString());
    data.append("Description", Description);
    if (Image) {
        data.append("Image", Image);
    }
    const response = await fetch(Constant.API_CREATE_MENU, {
        method: "POST",
        body: data,
        headers: {
            [Constant.HEADER_TOKEN] : token
        }
    });
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null
}
export async function ApiGetMenuByPartyID(partyId: number){
    const response = await fetch(Constant.API_GET_MENU_BY_PARTY_ID + partyId);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
<<<<<<< HEAD

export async function ApiGetMenuByHostID(hostID: number){
=======
export async function ApiGetMenuByHostID(hostID: number, page?: number, size?:number){
>>>>>>> 39a5a2697f0778cfae4c409e5510362bbf309617
    const response = await fetch(Constant.API_GET_MENU_BY_HOST_ID + hostID);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}

<<<<<<< HEAD
export async function ApiGetMenuByHostIDPaging(hostID: number, page: number, size:number){
    const response = await fetch(Constant.API_GET_MENU_BY_HOST_ID_PAGING + hostID + "/" + page + "/" + size);
    if(response.ok){
        const result = await response.json();
        return result as JsonBody;
    }
    return null;
}
=======

>>>>>>> 39a5a2697f0778cfae4c409e5510362bbf309617
