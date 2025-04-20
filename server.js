const dotenv = require("dotenv")
dotenv.config()

const http = require("http")

const Port = process.env.PORT || 3000
const app = require("./app")

const server = http.createServer(app)

app.get("/", (_, res) => {
    res.json({ message: "Welcome to ECommerceShop Backend." })
})

server.listen(Port, (err) => {
    if (err) {
        console.error("Error starting server : ", err)
        return
    }
    console.log(`Server is running on ${Port}`)
})
