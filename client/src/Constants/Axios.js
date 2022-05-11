import axios from "axios";
export const baseUrl="http://localhost:5000"
const instance = axios.create({
    baseURL:baseUrl,
  });

export default instance

export const headers=()=>{
    
}