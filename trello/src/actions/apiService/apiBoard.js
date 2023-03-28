// import * as httpRequest from '../httpRequest'
import * as httpRequest from '../httpRequest'

export const board = async(q,type = 'board') =>{
    try {
        const res = await httpRequest.get(`/board/fullboard`,{
            params:{q,type},
        })
        return res.data

    } catch (error) {
        console.log(error);
    }
}