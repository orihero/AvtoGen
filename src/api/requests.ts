import axios from 'axios';

export let URL = 'http://api.avtogen.qwertygroup.uz' /* 'https://3841f7e4.ngrok.io' */;

let store;

export let configureAxios = (storeInstance) => {
    axios.interceptors.request.use((req) => {
        req.headers = { Authorization: `Bearer ${storeInstance.getState().user.token}` }
        return req;
    })
}

let formData = rawData => {
    let form = new FormData();
    Object.keys(rawData).forEach(key => {
        form.append(key, rawData[key]);
    });
    return form;
};

let requests = {
    auth: {
        login: (credentials) => axios.post(`${URL}/auth/login`, formData(credentials)),
        verifyCode: (id, credentials) => axios.put(`${URL}/auth/login-verify/${id}`, credentials),
    },
    main: {
        companies: (id = 1) => axios.get(`${URL}/hand/companies?category_id=${id}`),
        services: () => axios.get(`${URL}/hand/services`)
    },
    user: {
        show: () => axios.get(`${URL}/profile/show`),
        update: (credentials) => axios.post(`${URL}/profile/update`, formData(credentials))
    }
}

export default requests;