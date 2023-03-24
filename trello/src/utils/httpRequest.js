import axios  from "axios"
console.log(process.env.REACT_APP_URL);

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_URL
})
export const get = async (path, options = [] ) =>{
    const respond = await httpRequest.get(path, options);
    return respond.data
}

export default httpRequest