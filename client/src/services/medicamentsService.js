const baseUrl = 'http://localhost:3030/data'

export const getAll = async () => {
    const response = await fetch(`${baseUrl}/medicaments`);
    const result = await response.json();
    const data = Object.values(result);

    return data;
}

