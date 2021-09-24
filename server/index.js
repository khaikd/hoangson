require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const cruiseRouter = require('./routes/cruise')
const roomRouter = require('./routes/rooms')
const categoryRouter = require('./routes/category')
const materialRouter = require('./routes/material')
const constructionRouter = require('./routes/construction')
const warehouseRouter = require('./routes/warehouse')
const unitRouter = require('./routes/unit')
const depotRouter = require('./routes/depot')
const supplierRouter = require('./routes/supplier')
const exportRouter = require('./routes/export')


const connectDB = async() => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.qsvbu.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/cruises', cruiseRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/materials', materialRouter);
app.use('/api/constructions', constructionRouter);
app.use('/api/warehouses', warehouseRouter);
app.use('/api/units', unitRouter);
app.use('/api/depots', depotRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/exports', exportRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});