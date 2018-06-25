export const callApi = async (route) => {
    const response = await fetch(`http://localhost:3000/${route}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
};