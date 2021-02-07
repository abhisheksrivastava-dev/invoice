// REST API or Restful API :- Representational State Transfer - Application Programming interface 

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/customer', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})