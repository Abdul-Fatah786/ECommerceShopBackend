const dotenv = require("dotenv")
dotenv.config()

const http = require("http")

const Port = process.env.PORT || 3000
const app = require("./src/app")

const server = http.createServer(app)

server.listen(Port, (err) => {
    if (err) {
        console.error("Error starting server : ", err)
        return
    }
    console.log(`Server is running on ${Port}`)
})
