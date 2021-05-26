const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  'mongodb://fullstackopen:heystepbro@cluster0-shard-00-00.suius.mongodb.net:27017,cluster0-shard-00-01.suius.mongodb.net:27017,cluster0-shard-00-02.suius.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-izs497-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => console.log("success"))
.catch(error => console.log(error))

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
.catch(error => console.log(error));