import axios from "axios"
const Api = "http://localhost:3000/users"


export const getusers = () =>{
    return axios.get(Api)
}

export const adduser = (userdata) =>{
    return axios.post(Api,userdata)
}