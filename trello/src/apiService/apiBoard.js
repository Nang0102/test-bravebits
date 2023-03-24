import * as httpRequest from '../utils/httpRequest'

export const board = async(q,type = 'board') =>{
    try {
        const res = await httpRequest.get(`/board`,{
            params:{q,type},
        })
        return res.data

    } catch (error) {
        console.log(error);
    }
}