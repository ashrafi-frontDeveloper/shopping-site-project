import axios from "axios";

const api = axios.create({
    baseURL: "https://shopino.iran.liara.run/v1",
    withCredentials: true,
    headers: {
        "Content-Type" : "application/josn"
    }
})

export default api