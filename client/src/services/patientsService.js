const baseUrl = 'http://localhost:3030/jsonstore'

export const getAll = async () => {
    const response = await fetch(`${baseUrl}/patients`);
    const result = await response.json();
    const data = Object.values(result);

    // console.log(data);

    return data;
}

