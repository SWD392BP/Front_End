'use client';
import { PARTY_TYPE_LIST, PUBLIC_IMAGE_UPLOAD, STATUS_CODE_OK, TABLE_DATA_SIZE, USER_COOKIE } from "@/common/Constant";
import { ApiGetPartyById } from "@/service/PartyService";
<<<<<<< HEAD
import { Party, Room, Slot, UserInfoCookie } from "@/types";
=======
import { Party, Room, UserInfoCookie } from "@/types";
>>>>>>> 734b58f25bcec279c57eb64be0095b8b98ffb793
import React from "react";
import Image from "next/image";
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
<<<<<<< HEAD
import { Field, Form, Formik, FormikValues } from "formik";
import PaginationBar from "@/component/PaginationBar";
import { useCookies } from "react-cookie";
import { ApiGetLatestRoom } from "@/service/RoomService";
import { FormatVND, GetLabelOfPartyType, TimeToString } from "@/util/TextUtil";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ApiGetSlotByRoomID } from "@/service/SlotService";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

=======
import { Field, Form, Formik } from "formik";
import PaginationBar from "@/component/PaginationBar";
import { useCookies } from "react-cookie";
import { ApiGetLatestRoom } from "@/service/RoomService";
import { FormatVND, GetLabelOfPartyType } from "@/util/TextUtil";
>>>>>>> 734b58f25bcec279c57eb64be0095b8b98ffb793
type Params = {
    params: {
        id: number;
    }
}
export default function Page({ params } : Params){
    const [party, setParty] = React.useState<Party | null>(null);
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const [rooms, setRooms] = React.useState<Room[] | null>(null);
    const [totalPage, setTotalPage] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
<<<<<<< HEAD
    const [roomView, setRoomView] = React.useState<Room | null>(null);
    const [roomViewSlot, setRoomViewSlot] = React.useState<Slot[] | null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
=======
>>>>>>> 734b58f25bcec279c57eb64be0095b8b98ffb793

    React.useEffect(()=>{
        fetchGetPartyById(params.id);
    }, []);

    async function fetchGetPartyById(id: number){
        const result = await ApiGetPartyById(id);
        if(result && result.code == STATUS_CODE_OK){
            setParty(result.data);
            fetchAllRoomByHostId(1, result.data.hostUserID);
        }
    }

<<<<<<< HEAD
    async function fetchGetSlotByRoomID(id: number){
        const result = await ApiGetSlotByRoomID(id);
        if(result && result.code == STATUS_CODE_OK){
            setRoomViewSlot(result.data);
            return;
        }
        setRoomViewSlot(null);
    }

    // async function fetchAllMenuInPartyId(id: number){
    //     const result = await ApiGetAllMenuInPartyId(id);
    //     if(result && result.code == STATUS_CODE_OK){
    //         setRoomViewSlot(result.data);
    //         return;
    //     }
    //     setRoomViewSlot(null);
    // }

=======
>>>>>>> 734b58f25bcec279c57eb64be0095b8b98ffb793
    async function fetchAllRoomByHostId(page: number, hostId: number){
        const result = await ApiGetLatestRoom(page, TABLE_DATA_SIZE, hostId);
        if(result && result.code == STATUS_CODE_OK){
            setRooms(result.data);
            const totalPage = result.totalPage ?? 1;
            setTotalPage(totalPage);
            //window.scrollTo(0, 0);
        }
    }

    function handleSubmitSearch(values: { PartyName: string; Address: string; Type: string; Description: string; }): any {
<<<<<<< HEAD
=======
        throw new Error("Function not implemented.");
>>>>>>> 734b58f25bcec279c57eb64be0095b8b98ffb793
    }

    const handleChangePage = (num : number) => {
        if(party){
            setCurrentPage(num);
            console.log(party);
            fetchAllRoomByHostId(num, party.hostUserID);
        }
    }

<<<<<<< HEAD
    const handleClickViewRoom = async (room: Room) => {
        setRoomView(room);
        await fetchGetSlotByRoomID(room.roomID);
        setSelectedIndex(0);
        handleOpen();
    }

    function handleSubmitNothing(values: FormikValues): void | Promise<any> {
        
    }

    const handleRadioChange = (selectedIndex: number) => {
        // Cập nhật trạng thái của ứng dụng hoặc lưu trữ giá trị của radio được chọn ở đây
        setSelectedIndex(selectedIndex); // Ví dụ: setSelectedIndex là một hàm để cập nhật trạng thái của radio được chọn
    };

=======
>>>>>>> 734b58f25bcec279c57eb64be0095b8b98ffb793
    return (
        <div className="row d-flex justify-content-center bg-white">
            <div className="col-12 col-sm-12 col-md-9 my-2">
                {/* CONTENT BODY */}
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-3">
                        <div className="bg-primary p-0 p-sm-0 p-md-4 h-100" style={{borderRadius:15}}>
                            <h5 className="text-light">BOOKING SEARCH</h5>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="Type" className="text-light my-2">Type: </label>
                                    <input className="form-control" name="Type" placeholder="Sinh nhật" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="People" className="text-light my-2">People: </label>
                                    <input type="number" className="form-control" name="Peole" placeholder="Số người" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="BookingDate" className="text-light my-2">Booking date: </label>
                                    <input type="date" className="form-control" name="BookingDate"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="BookingTime" className="text-light my-2">Booking time: </label>
                                    <input type="time" className="form-control" name="BookingTime" />
                                </div>
                                <button className="btn btn-light mt-4 w-100">BOOKING NOW</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9">
                        <h3 className="fw-bold">{party?.partyName}</h3>
                        <div className="d-flex align-items-center my-2">
                            <PlaceIcon className="text-primary"/> <b className="me-2">{party?.address}</b> - Vị trí hiển thị trên bản đồ
                            <div className="flex-grow-1"></div>
                            <div className="cursor-pointer d-flex align-items-center">
                                <FavoriteBorderIcon className="text-primary" /> <b className="ms-2">LIKE</b>
                            </div>
                            <div className="cursor-pointer d-flex align-items-center ms-3">
                                <ShareIcon className="text-primary" /> <b className="ms-2">SHARE</b>
                            </div>
                        </div>
<<<<<<< HEAD
                        <Image alt={party?.partyName??''} src={PUBLIC_IMAGE_UPLOAD + party?.image} width={1000} height={1000} className="image-fit" style={{width:'100%',height:500,borderRadius:15}}/>
=======
                        <Image alt={party?.partyName??''} src={PUBLIC_IMAGE_UPLOAD + party?.image} width={1000} height={1000} style={{width:'100%',height:500,borderRadius:15}}/>
>>>>>>> 734b58f25bcec279c57eb64be0095b8b98ffb793
                    </div>
                </div>

                {/* DESCRIPTION */}
                <h4 className="mt-3">DESCRIPTION</h4>
                <p style={{textAlign:'justify'}}>
                    {party?.description}
                </p>

                {/* ROOM AVAILABLE FOR RENT*/}
                <h4 className="mt-3">ROOM AVAILABLE FOR RENT</h4>
                {/* BOOKING SEARCH */}
                <Formik 
                    initialValues={{
                        PartyName: 'Tiệc sinh nhật LUXURY',
                        Address: 'Hồ Chí Minh',
                        Type: PARTY_TYPE_LIST[0].value,
                        Description: "Một sinh nhật thật ý nghĩa và đặc biệt để đánh dấu cột mốc quan trọng của các thiên thần nhỏ luôn là điều bố mẹ băn khoăn? Với sự đa dạng trong các gói tiệc sinh nhật, tiNi hứa hẹn sẽ mang đến cho các thiên thần nhỏ một bữa tiệc đầy bất ngờ và tràn ngập những khoảnh khắc đáng nhớ.",
                    }}
                    onSubmit={values=>handleSubmitSearch(values)}>
                        {({ errors, setFieldValue, touched }) => (
                <Form>
                <div className="row">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-10 row">
                            <div className="col-12 col-sm-12 col-md-4 form-group p-0 pt-2">
                                <Field type="date" className="form-control" placeholder="Ngày book" />
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 form-group p-0 pt-2">
                                <Field type="time" className="form-control" placeholder="Giờ Book" />
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 form-group p-0 pt-2">
                                <Field type="number" className="form-control" placeholder="Số người" />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-2 row pt-2">
                            <button className="btn btn-primary w-100 h-100 ms-0 ms-sm-0 ms-md-2">SEARCH</button>
                        </div>
                    </div>

                    {/* TABLE ROOM  */}
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
<<<<<<< HEAD
                                            <span className="text-decoration-underline text-primary cursor-pointer" onClick={()=>handleClickViewRoom(room)}>View Room</span>
=======
                                            <span className="text-decoration-underline text-primary cursor-pointer">View Room</span>
>>>>>>> 734b58f25bcec279c57eb64be0095b8b98ffb793
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
                </Form>
                )}
            </Formik>


<<<<<<< HEAD
            {/* MODAL BOOKING  */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h4" className="fw-bold">
                            <span className="text-primary">ROOM</span> INFORMATION
                        </Typography>
                        <div className="row mt-2">
                            <div className="col-12 col-sm-12 col-md-6">
                                <Image alt={roomView?.roomName??''} src={PUBLIC_IMAGE_UPLOAD + roomView?.image} width={1000} height={1000} className="image-fit" style={{width:'100%',height:300,borderRadius:15}}/>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <p><b>Room Name: </b><span>{roomView?.roomName}</span></p>
                                <p><b>People: </b><span>{roomView?.minPeople}-{roomView?.maxPeople}</span></p>
                                <p><b>Price: </b><span>{FormatVND(roomView?.price + "")}</span></p>
                                <p><b>Time serve:</b></p>
                                <div role="group" aria-labelledby="my-radio-group">
                                    {roomViewSlot && roomViewSlot.map((row, index) => (
                                        <div className="mb-2" key={index}>
                                            <label key={index}>
                                                <input 
                                                    type="radio" 
                                                    className="form-check-input me-2" 
                                                    name="SlotRadio" 
                                                    value={row.slotID} 
                                                    checked={index === selectedIndex}
                                                    onChange={() => handleRadioChange(index)}
                                                /> 
                                                {TimeToString(row.startTime)}-{TimeToString(row.endTime)}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p style={{textAlign:'justify'}} className="mt-2">
                            {roomView?.description}
                        </p>
                        <div className="d-flex justify-content-center">
                                <button className="btn btn-primary">BOOKING THIS ROOM</button>
                        </div>
                    </Box>
                </Modal>
            </div>


=======
>>>>>>> 734b58f25bcec279c57eb64be0095b8b98ffb793
            </div>
        </div>
    );
}