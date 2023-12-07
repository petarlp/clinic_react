import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/alists'

export const getAll = async () => {

    const query = new URLSearchParams({
        load: `_patientId=_patientId:patients,_doctorId=_doctorId:doctors,_mkbId=_mkbId:mkbs`,
    });

    const result = await request.get(`${baseUrl}?${query}`);

    const data = Object.values(result);

    return data;
};

export const del = async (id) => {
    const result = await request.remove(`${baseUrl}/${id}`);

    const data = Object.values(result);

    return data;
};

export const update = async (id,formData) => {
    const result = await request.put(`${baseUrl}/${id}`,formData);

    const data = Object.values(result);

    return data;
};

export const create = async (formData) => {
    const result = await request.post(baseUrl,formData);

    const data = Object.values(result);

    return data;
};


