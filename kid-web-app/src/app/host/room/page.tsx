'use client'
import Image from "next/image";
import { STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiDeletePartyByID, ApiGetLatestParty } from "@/service/PartyService";
import { Party, Room, UserInfoCookie } from "@/types";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { FormatVND, GetLabelOfPartyType } from "@/util/TextUtil";
import PaginationBar from "@/component/PaginationBar";
import { ApiDeleteRoomByID, ApiGetLatestRoom } from "@/service/RoomService";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function Page (){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [rooms, setRooms] = React.useState<Room[] | null>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    React.useEffect(()=>{
        fetchAllRoomByHostId(1);
    },[]);

    async function handleClickDeleteById(id: string){
        const resultCf = confirm("Are you sure delete this room?")
        if(resultCf){
            const result = await ApiDeleteRoomByID(id);
            if(result && result.code == STATUS_CODE_OK){
                alert("Delete room successfully!");
                fetchAllRoomByHostId(currentPage);
            }else{
                alert("Delete room failed!");
            }
        }
    }

    async function fetchAllRoomByHostId(page: number){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetLatestRoom(page, TABLE_DATA_SIZE, userInfoCookie.userID);
            if(result && result.code == STATUS_CODE_OK){
                setRooms(result.data);
                const totalPage = result.totalPage ?? 1;
                setTotalPage(totalPage);
                window.scrollTo(0, 0);
            }
        }
    }

    const handleChangePage = (num : number) => {
        setCurrentPage(num);
        fetchAllRoomByHostId(num);
    }

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">ROOM <span className="text-dark">MANAGEMENT</span></h1>
                <Link href="/host/room/create"><Button variant="contained" color="primary" startIcon={<AddIcon />}>CREATE ROOM</Button></Link>
                
                {/* <!-- TABLE --> */}
                <div className="row p-0 m-0 my-3">
                    <div className="col-12 col-sm-12 col-md-12 p-0 m-0">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th className="w-20">Name</th>
                            <th className="w-20">Image</th>
                            <th className="w-10">Type</th>
                            <th className="w-20">Price</th>
                            <th className="w-10">People</th>
                            <th className="w-20">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { rooms && rooms.length > 0 && rooms.map((room, index)=>(
                                <tr key={index}>
                                    <td>{room.roomName}</td>
                                    <td>
                                        <Image alt={""} width={400} height={400} src={"/ImageUpload/"+room.image} className="image-fit" style={{width: '100%', height: 150}} />
                                    </td>
                                    <td>{GetLabelOfPartyType(room.type)}</td>
                                    <td>{FormatVND(room.price.toString())}</td>
                                    <td>{room.minPeople} - {room.maxPeople} people</td>
                                    <td>
                                        <Link href={"/host/room/edit/" + room.roomID} className="text-decoration-underline text-primary me-2"><Button variant="contained" color="primary" startIcon={<EditIcon />}>Edit</Button></Link>
                                        <Button variant="contained" className="bg-dark" startIcon={<DeleteIcon />} onClick={()=>handleClickDeleteById(room.roomID.toString())}>Delete</Button>
                                    </td>
                                </tr>
                            )) || (
                                <tr>
                                    <td colSpan={6}>Data is empty</td>
                                </tr>
                            )}
                        
                        </tbody>
                    </table>
                    {/* PAGINATION BAR */}
                    {totalPage != 0 && (
                        <PaginationBar totalPage={totalPage} currentPage={currentPage} handleChangePage={handleChangePage} />
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

