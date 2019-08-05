
const prod = {
    BASE_URL: "http://127.0.0.1:1337/",
}

const dev = {
    BASE_URL: "http://127.0.0.1:1337/"
}

export const config = process.env.NODE_ENV === "development" ? dev : prod;