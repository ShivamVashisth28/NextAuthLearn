import mongoose from 'mongoose'

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected',() => {
            console.log('DB connected')
        })

        connection.on('error', (error) => {
            console.log('Error in connecting with DB' + error)
            process.exit()
        })

    } catch (error) {
        console.log('Something went wrong while connecting to Database')
        console.log(error)
    }
}