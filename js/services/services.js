const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-type': 'application/json'
        }
    }, );


    return res.json();
};

const getResource = async (url) => {
    const f = await fetch(url);
    if (!f.ok) {
        throw new Error(`Ошибка ${f.status}`);
    }
    return await f.json();
};

export {postData, getResource};