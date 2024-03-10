export interface JsonBody {
    code: string,
    message: string,
    data: any,
    totalItem: number,
    totalPage: number,
}

export interface User {
    UserID: number,
    FullName: string,
    Email: string,
    Password: string,
    Role: string,
    Status: string,
    Token: string,
}

export interface Party {
    partyID: number,
    partyName: string,
    address: string,
    type: string,
    description: string,
    image: string,
    hostUserId: number,
}


export interface UserInfoCookie{
    userID: number;
    email: string;
    token: string;
    role: string;
}

export interface PartyType{
    label: string;
    value: string;
}

export interface ButtonPagination {
    page: number;
    isActive: boolean;
<<<<<<< HEAD
}

export type Option = {
    value: string,
    label: string
=======
>>>>>>> d83ced5cc11c325d5f9a7e9fcf07254957b32b36
}