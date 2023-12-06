import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/patients'

export const getAll = async () => {
    const result = await request.get(baseUrl);

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

