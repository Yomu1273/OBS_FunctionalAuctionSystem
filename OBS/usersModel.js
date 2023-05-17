const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/OBS');
var db=mongoose.connection;

const sch = new mongoose.Schema({
  "fname": {
    "type": "String"
  },
  "lname": {
    "type": "String"
  },
  "username": {
    "type": "String"
  },
  "email": {
    "type": "String"
  },
  "password": {
    "type": "String"
  },
  "date": {
    "$date": {
      "type": "Date"
    }
  },
  "last_accessed": {
    "$date": {
      "type": "Date"
    }
  },
  "balance":{
    "type":"Number"
  }
}
);
var User = mongoose.model('Users',sch,'Users');
module.exports = User;