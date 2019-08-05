
const prod = {
    BASE_URL: "https://flexify-server.herokuapp.com/",
}

const dev = {
    BASE_URL: "http://127.0.0.1:8000/"
}

export const config = process.env.NODE_ENV === "development" ? dev : prod;