const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/OBS');
var db=mongoose.connection;

const sch = new mongoose.Schema({
    "_id": {
      "$oid": {
        "type": "ObjectId"
      }
    },
    "email": {
      "type": "String"
    },
    "auctionName": {
      "type": "String"
    },
    "sellerName": {
      "type": "String"
    },
    "description": {
      "type": "String"
    },
    "startAmount":{
      "type":"Number"
    },
    "stepValue": {
      "type": "Number"
    },
    "endDate": {
      "type": "Date"
    },
    "lastBidder":{
      "type":"String"
    }
});
var Auction = mongoose.model('Auctions',sch,'Auctions');
module.exports = Auction;