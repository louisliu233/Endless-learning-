import {CHANG_INPUT, ADDLIST, DELLIST, GETLIST, GET_MY_LIST} from './actionTypes'
import axios from 'axios'

export const changInputAction = (value) => ({
    type:CHANG_INPUT,
    value
})

export const addListAction = () => ({
    type:ADDLIST   
})

export const delListAction = (index) => ({
    type:DELLIST,
    index
})

export const getListAction = (data) => ({
    type:GETLIST,
    data
})

export const getTodoList = () => {
    return (dispatch) => {
        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
        .then((res) => {
            const data = res.data
            const action = getListAction(data)
            dispatch(action)
    })
}
}

export const getMyList = () => ({
    type: GET_MY_LIST
})

