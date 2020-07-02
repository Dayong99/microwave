/* eslint-disable */
import axios from 'axios'
if(process.env.NODE_ENV === 'development'){}else{
    axios.defaults.timeout = 5000 // 请求超时produ
    axios.defaults.baseURL = 'http://192.168.1.2:8301/convection/api/'//produ
}

export default axios