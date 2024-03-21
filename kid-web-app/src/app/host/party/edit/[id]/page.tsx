'use client'
import Image from "next/image";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Button, TextField, ThemeProvider } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as ColorUtil from "@/common/ColorUtil";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { UserInfoCookie, Option, Menu, Party } from "@/types";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import {PARTY_TYPE_LIST, PUBLIC_IMAGE_UPLOAD, STATUS_CODE_ERROR, STATUS_CODE_OK, USER_COOKIE } from "@/common/Constant";
import { ChangeEvent } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React from "react";
import { ApiCreateParty, ApiGetPartyById, ApiGetPartyByIdInHost } from "@/service/PartyService";
import { ApiGetMenuByHostID, ApiGetMenuByPartyID } from "@/service/MenuService";
import { RemoveDuplicateString } from "@/util/TextUtil";

type Params = {
    params: {
        id: number;
    }
}

export default function Page ({ params } : Params){
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies([USER_COOKIE])
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [thumbnailImage, setThumbnailImage] = React.useState<File | null>(null);
    const [thumbnailLink, setThumbnailLink] = React.useState<string | null>(null);
    const [thumbnailImageSrc, setThumbnailImageSrc] = React.useState<string | undefined>(undefined);
    const [optionMenu,setOptionMenu] = React.useState<Option[] | null>(null);
    const [listMenu, setListMenu] = React.useState<string[] | null>(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [optionMenuSelected,setOptionMenuSelected] = React.useState<Option[] | null>(null);
    const [party, setParty] = React.useState<Party | null>(null);
    const [optionDefaultSelected,setOptionDefaultSelected] = React.useState<Option[] | null>(null);

    React.useEffect(()=>{
        fetchPartyByID(params.id);
    }, []);

    async function fetchPartyByID(id: number){
        const result = await ApiGetPartyByIdInHost(id);
        if(result && result.code == STATUS_CODE_OK){
            const partyData = result.data as Party;
            setParty(partyData);
            setThumbnailLink(partyData.image);
            fetchMenuByPartyID(partyData.partyID, partyData);
        }
    }

    async function fetchMenuByPartyID(id: number, partyData: Party){
        const result = await ApiGetMenuByPartyID(id);
        if(result && result.code == STATUS_CODE_OK){
            fetchGetMenuByHostId(result.data);
        }
    }

    async function fetchGetMenuByHostId(menuSeleced: Menu[]){
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            const result = await ApiGetMenuByHostID(userInfoCookie.userID);
            const arrayOptions = [] as Option[];
            const arrayOptionsDefault = [] as Option[];
            const listMenuString = [] as string[];
            const firstValue = [] as string[];
            if(result && result.code == STATUS_CODE_OK){
                const arrayMenu = result.data as Menu[];
                for(let i = 0; i < arrayMenu.length; i++){
                    if(i == 0){
                        firstValue.push(arrayMenu[i].menuID.toString());
                        setListMenu(firstValue);
                    }
                    const item = {
                        value: arrayMenu[i].menuID.toString(),
                        label: arrayMenu[i].menuName,
                    } as Option;
                    for(let j = 0; j < menuSeleced.length; j++){
                        if(menuSeleced[j].menuID.toString() == item.value){
                            arrayOptionsDefault.push(item);
                            listMenuString.push(item.value);
                            break;
                        }
                    }
                    arrayOptions.push(item);
                }
                setListMenu(listMenuString);
                setOptionMenu(arrayOptions);
                setOptionDefaultSelected(arrayOptionsDefault);
                if(arrayOptions.length > 0){
                    setOptionMenuSelected([arrayOptions[0]]);
                }
            }
        }
        setIsLoaded(true);
    }

    const handleAddPhotoClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setThumbnailImage(files[0]);
            const imageUrl = URL.createObjectURL(files[0]);
            setThumbnailImageSrc(imageUrl);
        }
    };

    const handleSubmitParty = async (values : PartyFormValues) => {
        const userInfoCookie = cookieUser.userInfoCookie as UserInfoCookie;
        if(userInfoCookie){
            var result = await ApiCreateParty(userInfoCookie.userID,values.PartyName, values.Address, values.Type, values.Description, RemoveDuplicateString(listMenu??[]), thumbnailImage, userInfoCookie.token, party?.partyID.toString());
            if(result?.code==STATUS_CODE_OK){
                alert("Edit party successfully!");
            }else if(result?.code==STATUS_CODE_ERROR){
                alert(result?.message);
            }else{
                alert("Edit party failed!");
            }
        }
    }

    const handleChangeMenu = (
        event: ChangeEvent<{}>, // Adjust the event type based on Autocomplete's expected type
        value: Option[], 
        reason: AutocompleteChangeReason, 
        details?: AutocompleteChangeDetails<Option> | undefined
      ) => {
        // Handle the change here
        const arrayId = [];
        for(let i = 0 ; i < value.length; i++){
            arrayId.push(value[i].value);
        }
        setListMenu(arrayId);
        setOptionMenuSelected(value);
    };

    return(
        <div className="row d-flex justify-content-center bg-graylight">
            <div className="col-12 col-sm-12 col-md-9 my-2 pt-3">
                <h1 className="fw-bold text-primary">PARTY <span className="text-dark">EDIT</span></h1>
                {isLoaded && party && (
                    <Formik 
                        initialValues={{
                            PartyName: party.partyName,
                            Address:  party.address,
                            Type: party.type,
                            MenuList: 0,
                            Description: party.description,
                        }}
                        validationSchema={PartyValidateSchema}
                        onSubmit={values=>handleSubmitParty(values)}>
                            {({ errors, setFieldValue, touched }) => (
                            <Form>
                                <div className="row">
                                    {/* LEFT FORM */}
                                    <div className="col-12 col-sm-12 col-md-6">
                                        <div className="form-group mt-2">
                                            <label className="fw-bold" htmlFor="PartyName">Party Name: </label>
                                            <Field type="text" name="PartyName" className="form-control" required/>
                                            {errors.PartyName && touched.PartyName ? (
                                                <div className="fw-bold text-danger">{errors.PartyName}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className="fw-bold" htmlFor="Address">Address: </label>
                                            <Field type="text" name="Address" className="form-control" required/>
                                            {errors.Address && touched.Address ? (
                                                <div className="fw-bold text-danger">{errors.Address}</div>
                                            ) : null}
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className="fw-bold" htmlFor="Type">Type: </label>
                                            <Field as="select" className="form-select" name="Type">
                                                {PARTY_TYPE_LIST.map((row, index)=>(
                                                    <option key={index} value={row.value}>{row.label}</option>
                                                ))}
                                            </Field>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="MenuList" className="form-label fw-bold">Menu List: </label>
                                            {optionMenu && optionDefaultSelected && (
                                                <Autocomplete
                                                    multiple
                                                    className="bg-light"
                                                    id="tags-outlined"
                                                    options={optionMenu}
                                                    getOptionLabel={(option) => option && option.label}
                                                    onChange={handleChangeMenu}
                                                    defaultValue={optionDefaultSelected}
                                                    filterSelectedOptions
                                                    renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="List serve menu"
                                                    />
                                                    )}
                                                />
                                            )}
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className="fw-bold" htmlFor="Description">Description: </label>
                                            <Field as="textarea" name="Description" className="form-control" rows={8}></Field>
                                            {errors.Description && touched.Description ? (
                                                <div className="fw-bold text-danger">{errors.Description}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    {/* RIGHT AVATAR IMAGE */}
                                    <div className="col-12 col-sm-12 col-md-6">
                                        {
                                            thumbnailImageSrc && (
                                                <div className="d-flex justify-content-center align-items-center w-100 border-radius-black h-100" style={{maxHeight:445}} onClick={handleAddPhotoClick}>
                                                    <Image alt={""} width={600} height={600} src={thumbnailImageSrc} className="border-radius-black image-fit w-100"  style={{maxHeight:445}} />
                                                </div>
                                            )|| thumbnailLink && (
                                                <div className="d-flex justify-content-center align-items-center w-100 border-radius-black h-100" style={{maxHeight:445}} onClick={handleAddPhotoClick}>
                                                    <Image alt={""} width={600} height={600} src={PUBLIC_IMAGE_UPLOAD + thumbnailLink} className="border-radius-black image-fit w-100"  style={{maxHeight:445}} />
                                                </div>
                                            ) || (
                                                <div className="d-flex justify-content-center align-items-center w-100 border-radius-black h-100" style={{maxHeight:445}} onClick={handleAddPhotoClick}>
                                                    <AddAPhotoIcon style={{fontSize:56}} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="d-none">
                                        <Field type="file" name="thumbnail_image" className="form-control" onChange={handleFileChange} innerRef={inputRef} />
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <Button type="submit" variant="contained" startIcon={<AddIcon />} color="primary">
                                        Save
                                    </Button>
                                    <Link href="/host/party" className="ms-2">
                                        <ThemeProvider theme={ColorUtil.ColorGray}>
                                            <Button variant="contained" color="primary">back</Button>
                                        </ThemeProvider>
                                    </Link>
                                </div>
                            </Form>
                            )}
                </Formik>
                )}
                
            </div>
        </div>
    );
}



const PartyValidateSchema = Yup.object().shape({
    PartyName: Yup.string()
      .min(10,'PartyName name must be at least 10 characters')  
      .max(255, 'PartyName maximum 255 characters')
      .required('Please enter PartyName.'),
    Address: Yup.string()
      .min(10,'Address must be at least 3 characters')  
      .max(255, 'Address maximum 255 characters')
      .required('Please enter Address.'),
});

interface PartyFormValues {
    PartyName: string;
    Address: string;
    Type: string;
    Description: string;
}