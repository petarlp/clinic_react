const baseUrl = 'http://localhost:3030/data'

export const getAll = async () => {

    const query = new URLSearchParams({
        load: `patient=_patientId:patients,doctor=_doctorId:doctors`,
    });

    const response = await fetch(`${baseUrl}/alists?${query}`);
    const result = await response.json();
    const data = Object.values(result);

    return data;
}

