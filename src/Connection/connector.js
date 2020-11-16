
export const fetchApi = (path, options = {}) => {
    return fetch(path, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status, response.statusText);
            }
            return response.json();
        })
        .catch((err) => {
            throw new Error(err);
    });
}