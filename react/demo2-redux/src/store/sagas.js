import { takeEvery, put } from 'redux-saga/effects'
import { GET_MY_LIST } from './actionTypes'
import axios from 'axios'
import {getListAction} from './actionCreators'


function* mySagas(){
    yield takeEvery(GET_MY_LIST,getmylist)
}


function* getmylist(){
    const res = yield axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
    const action = getListAction(res.data)
    yield put(action)
}
export default mySagas