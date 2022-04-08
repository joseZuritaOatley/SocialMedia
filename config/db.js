const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')
//server.js runs this file to connect to the database (mongodb)
const connectDB = async () => {
	try {
		await mongoose.connect(db, { useNewUrlParser: true })
		console.log('MongoDB Connected')
	} catch (err) {
		console.log(err.message)
		//exit process with failure
		process.exit(1)
	}
}
module.exports = connectDB
