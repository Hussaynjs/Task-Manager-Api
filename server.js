require('express-async-errors')
require('dotenv').config()
const express = require('express')
const app = express()

// const helmet = require('helmet')
// const cors = require('cors')
// const limiter = require('express-rate-limit')

const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')
const authUser = require('./routes/auth')


const NotFoundError = require('./middleware/notFound')
const ErrorHandlerError = require('./middleware/errorHandler')
const connectDB = require('./db/connect')
const authMiddleware = require('./middleware/authMiddleware')



app.use(express.json())

// extra security packeages
// app.set('trust proxy', 1)
// app.use(limiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
// }))
// app.use(helmet())
// app.use(cors())
// routes




app.use('/api/v1/user', authMiddleware ,userRouter)
app.use('/api/v1/task',authMiddleware ,taskRouter)
app.use('/api/v1/auth', authUser)


// middleware

app.use(NotFoundError)
app.use(ErrorHandlerError)



const port = process.env.PORT || 5000 



const connect = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`app is running on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

connect()
