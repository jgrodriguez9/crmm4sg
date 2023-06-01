import * as url from "./url";


const postLogin = data => fetch(url.POST_LOGIN, {
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "Authorization": "Basic Y3JtX3Jlc2VydmFjaW9uZXM6NGFhZGI0NzljYzc5ZmY4ODBjY2YxMThmZmQxNzk3ZmM=",
    },
    body: JSON.stringify(data)
});

export {
    postLogin
};