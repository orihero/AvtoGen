import axios from 'axios';

export let URL = 'https://api.avtogen.uz' /* 'https://3841f7e4.ngrok.io' */;

let store;

export let configureAxios = (storeInstance) => {
    axios.interceptors.request.use((req) => {
        console.warn(storeInstance.getState().user.settings.language);

        req.headers = { Authorization: `Bearer ${storeInstance.getState().user.token}`, "Accept-Language": storeInstance.getState().user.settings.language }
        return req;
    })
}

let formData = rawData => {
    let form = new FormData();
    Object.keys(rawData).forEach(key => {
        if (Array.isArray(rawData[key])) {
            let obj = rawData[key];
            for (let index in obj) {
                form.append(`${key}[${index}]`, obj[index])
            }
            return;
        }
        if (typeof rawData[key] === 'object') {
            let obj = rawData[key];
            let i = 0;
            Object.keys(obj).forEach((id, index) => {
                if (obj[id])
                    form.append(`${key}[${i++}]`, parseInt(id))
            })
            return;
        }
        form.append(key, rawData[key]);
    });
    console.warn(form);
    return form;
};

let requests = {
    auth: {
        login: (credentials) => axios.post(`${URL}/auth/login`, credentials),
        verifyCode: (id, credentials) => axios.put(`${URL}/auth/login-verify/${id}`, credentials),
    },
    main: {
        companies: (id = 1) => axios.get(`${URL}/hand/companies?category_id=${id}`),
        services: () => axios.get(`${URL}/hand/services`),
        carTypes: () => axios.get(`${URL}/hand/car-types`),
        searchCompanies: (data) => axios.post(`${URL}/hand/search-company`, formData(data)),
        book: (credentials) => axios.post(`${URL}/booking/book`, formData(credentials)),
        books: (status) => axios.get(`${URL}/booking/client-books?status=${status}`),
        cancel: (id) => axios.get(`${URL}/booking/reject-book/${id}`),
        setBookingState: (id, status) => axios.post(`${URL}/booking/set-status-book`, formData({ booking_id: id, status }))
    },
    user: {
        show: () => axios.get(`${URL}/profile/show`),
        update: (credentials) => axios.post(`${URL}/profile/update`, formData(credentials))
    },
    profile: {
        setToken: (credentials) => axios.post(`${URL}/profile/setFcmToken`, formData(credentials))
    }
}

export default requests;