const express=require("express");
const User = require("./usersModel");
const Activity = require("./auctionModel");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const mongo = require("mongodb");

const oneDay = 1000 * 60 * 60 * 24;

const mongoose = require('mongoose');
const { redirect } = require("statuses");
const Auction = require("./auctionModel");
const dbo = mongoose.connect('mongodb://localhost:27017/OBS');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express();

//session middleware
app.use(sessions({
   secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
   saveUninitialized:true,
   cookie: { maxAge: oneDay },
   resave: false
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
   extended: true
}));
app.set('views', './views');
app.set('view engine', 'ejs');
var session;

function getNowDate(){
   var date = new Date();
/*var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var currentDate = `${year}-${month}-${day}`;*/
//return currentDate;
   date=date.toLocaleString();
   return date;
}
function getDateOf(d){
   //var datee = str.slice(0,10);
   d=d.toLocaleString();
   return(d);
}

app.post('/sign_up', async(req,res)=>{
   var fname = req.body.fname;
   var lname = req.body.lname;
   var username = req.body.username;
   var email =req.body.email;
   var pass = req.body.password;

   var data = {
      "fname": fname,
      "lname": lname,
      "username": username,
      "email":email,
      "password":pass,
      "date":new Date(),
      "last_accessed": new Date(),
      "balance":0
   }
   db.collection('Users').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   session=req.session;
   session.userid=req.body.email;
   console.log(req.session)
   Auction.find({}).then(function(auction){
      console.log(auction);
      /*auction.forEach(element=>{
         var d = getNowDate();
         var b = getDateOf(element.endDate);
         if(b <= d){
            db.collection('Auctions').deleteOne({"_id":element._id})
         }
      })*/
      auction.sort(function(a, b){
         return a.endDate - b.endDate;
     });
      res.render("mainpage",{
         auction:auction,
         errmsg:""
      });
   });
})

app.post('/log_in',async(req,res)=>{
   if(req.body.loginEmail===undefined){
      return res.redirect('mainpage.html');
   }
   User.find({"email":req.body.loginEmail}).then(function(person){
      console.log(person);
      if(person[0].password==req.body.loginPassword){
         session=req.session;
         session.userid=req.body.loginEmail;
         console.log(req.session)
         db.collection('Users').updateOne({"email":session.userid},{
            $set:{
               "last_accessed": new Date()
            }
         },function(err,res){
            if(err) throw err;
            console.log("Details Updated");
         })
         Auction.find({}).then(function(auction){
            /*auction.forEach(element=>{
               var d = getNowDate();
               var b = getDateOf(element.endDate);
               if(b <= d){
                  db.collection('Auctions').deleteOne({"_id":element._id})
               }
            })*/
            auction.sort(function(a, b){
               return a.endDate - b.endDate;
           });
            res.render("mainpage",{
               auction:auction,
               errmsg:""
            })
         });
      }else{
         return res.redirect("index.html");
      }
   })
})

app.post('/create_auction', async(req,res)=>{
   var auctionName = req.body.auctionName;
   var sellerName = req.body.sellerName;
   var description = req.body.description;
   var startAmount = parseInt(req.body.startAmount);
   var stepValue = parseInt(req.body.stepValue);
   var endDate = req.body.endDate;
   var lastBidder = req.session.userid;

   var data = {
      "email":req.session.userid,
      "auctionName":auctionName,
      "sellerName":sellerName,
      "description":description,
      "startAmount":startAmount,
      "stepValue":stepValue,
      "endDate":endDate,
      "lastBidder":lastBidder
   }
   db.collection('Auctions').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   Auction.find({}).then(function(auction){
      console.log(auction);
      /*auction.forEach(element=>{
         var d = getNowDate();
         var b = getDateOf(element.endDate);
         if(b <= d){
            //db.collection('Auctions').deleteOne({"_id":element._id})
         }
      })*/
      auction.sort(function(a, b){
         return a.endDate - b.endDate;
     });
      res.render("mainpage",{
         auction:auction,
         errmsg:""
      });
   });
})

app.post('/profile',async(req,res)=>{
   User.find({"email":req.session.userid}).then(function(person){
      var d1 = new Date(person[0].last_accessed);
      var d2 = new Date(person[0].date);
      var firstName = person[0].fname;
      var lastName = person[0].lname;
      var email = person[0].email;
      var amount = parseInt(person[0].balance);
      var last_accessed = d1.toLocaleString();
      var account_created = d2.toLocaleString();
      res.render("profile",{
         fname:firstName,
         lname:lastName,
         email:email,
         balance: amount,
         last_accessed: last_accessed,
         account_created: account_created
      })
   })
})

app.post('/update_profile',async(req,res)=>{
   var first_name = req.body.fname;
   var last_name = req.body.lname;
   db.collection('Users').updateOne({"email":req.session.userid},{
      $set:{
         "fname": first_name,
         "lname": last_name
      }
   },function(err,res){
      if(err) throw err;
      console.log("Details Updated");
   })
   Auction.find({}).then(function(auction){
      console.log(auction);
      /*auction.forEach(element=>{
         var d = getNowDate();
         var b = getDateOf(element.endDate);
         if(b <= d){
            db.collection('Auctions').deleteOne({"_id":element._id})
         }
      })*/
      auction.sort(function(a, b){
         return a.endDate - b.endDate;
     });
      res.render("mainpage",{
         auction:auction,
         errmsg:""
      });
   });
})

app.post('/recharge',async(req,res)=>{
   var amount = parseInt(req.body.amount);
   db.collection('Users').updateOne({"email":req.session.userid},{
      $inc:{
         "balance":amount
      }
   },function(err,res){
      if(err) throw err;
      console.log("Details Updated");
   })
   Auction.find({}).then(function(auction){
      console.log(auction);
      /*auction.forEach(element=>{
         var d = getNowDate();
         var b = getDateOf(element.endDate);
         if(b <= d){
            db.collection('Auctions').deleteOne({"_id":element._id})
         }
      })*/
      auction.sort(function(a, b){
         return a.endDate - b.endDate;
     });
      res.render("mainpage",{
         auction:auction,
         errmsg:""
      });
   });
})

app.post('/place_bid',async(req,res)=>{
   User.find({"email":req.session.userid}).then((person)=>{
      var aucId = req.body.idname;
      var obj = new mongo.ObjectId(aucId.split('"')[1]);
      Auction.find({"_id":obj}).then((auction)=>{
         if(auction[0].email == person[0].email){
            Auction.find({}).then(function(auction){
               /*auction.forEach(element=>{
                  var d = getNowDate();
                  var b = getDateOf(element.endDate);
                  if(b <= d){
                     db.collection('Auctions').deleteOne({"_id":element._id})
                  }
               })*/
               auction.sort(function(a, b){
                  return a.endDate - b.endDate;
              });
               res.render("mainpage",{
                  auction:auction,
                  errmsg:"The owner cannot Bid"
               });
            });
         }
         else if(auction[0].stepValue > person[0].balance){
            Auction.find({}).then(function(auction){
               console.log(auction);
               /*auction.forEach(element=>{
                  var d = getNowDate();
                  var b = getDateOf(element.endDate);
                  if(b <= d){
                     db.collection('Auctions').deleteOne({"_id":element._id})
                  }
               })*/
               auction.sort(function(a, b){
                  return a.endDate - b.endDate;
              });
               res.render("mainpage",{
                  auction:auction,
                  errmsg:"Insufficient Balance"
               });
            });
         }
         else{
            db.collection('Users').updateOne({"email":req.session.userid},{
               $inc:{
                  "balance":-parseInt(auction[0].stepValue)
               }
            },function(err,res){
               if(err) throw err;
               console.log("Details Updated");
            })
            db.collection('Auctions').updateOne({"_id":auction[0]._id},{
               $set:{
                  "lastBidder":req.session.userid
               }
            },function(err,res){
               if(err) throw err;
               console.log("Details Updated");
            })
            db.collection('Auctions').updateOne({"_id":auction[0]._id},{
               $inc:{
                  "startAmount":parseInt(auction[0].stepValue)
               }
            },function(err,res){
               if(err) throw err;
               console.log("Details Updated");
            })
           Auction.find({}).then(function(auction){
            /*auction.forEach(element=>{
               var d = getNowDate();
               var b = getDateOf(element.endDate);
               if(b <= d){
                  db.collection('Auctions').deleteOne({"_id":element._id})
               }
            })*/
            auction.sort(function(a, b){
               return a.endDate - b.endDate;
           });
            res.render("mainpage",{
               auction:auction,
               errmsg:""
            })
         });
         }
      })
   })
})

app.post('/mainpage',async(req,res)=>{
   Auction.find({}).then(function(auction){
      console.log(auction);
      /*auction.forEach(element=>{
         var d = getNowDate();
         var b = getDateOf(element.endDate);
         if(b <= d){
            db.collection('Auctions').deleteOne({"_id":element._id})
         }
      })*/
      auction.sort(function(a, b){
         return a.endDate - b.endDate;
     });
      res.render("mainpage",{
         auction:auction,
         errmsg:""
      });
   });
})


app.get('/logout',(req,res) => {
   req.session.destroy();
   return res.redirect('index.html');
});

app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.redirect('index.html');
}).listen(3000)

console.log("server listening at port 3000");