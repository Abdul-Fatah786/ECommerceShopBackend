const mongoose = require("mongoose")

const connection = {
    dbStatus: 0
}

function connectToDB() {
    if (connection.dbStatus == 0) {
        mongoose
            .connect(process.env.DB_CONNECT)
            .then((res) => {
                connection.dbStatus = res.connection.readyState
                console.log("Connect to DB")
            })

            .catch((err) => console.log(err))
    } else {
        console.log("DB already connected")
    }
}

module.exports = connectToDB