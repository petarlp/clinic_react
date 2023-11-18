const baseUrl = 'http://localhost:3030/jsonstore'

export const getAll = async () => {
    const response = await fetch(`${baseUrl}/alists`);
    const result = await response.json();
    const data = Object.values(result);

    return data;
}

