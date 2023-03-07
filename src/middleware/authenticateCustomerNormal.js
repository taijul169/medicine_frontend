
const { query, response } = require('express');
const dotenv =  require('dotenv');
const fetch  = require("node-fetch");
const axios =  require("axios");
const async = require('hbs/lib/async');

const root_url = 'http://192.168.0.121:9010'

const authcustomerNormal = async (req, res, next) =>{
    console.log('i am inside authenticate normal')
    try {
        // console.log("auth is working");
        const token = req.cookies.jwtokencustomer;

       
   await fetch(`http://localhost:8080/api/customer/authenticate/${token}`)
    .then(res =>res.json())
    .then(async(singleDocData) =>{
  
            if(singleDocData.jwtoken == token){
            singleDocData.usertype = 'customer'
            await fetch(`http://localhost:8080/api/notification/getallnotificationbyuseridnusertype/${singleDocData.id}/customer/false`)
            .then(res =>res.json())
            .then(notificationData=>{
                singleDocData.notification = notificationData
                req.userData = singleDocData;
               // console.log("data form authentication",req.userData)
                console.log("data form notificationData",notificationData)
        
                return next()
            })
           
           
            }else{
                return next() 
            }   
      
    });

    } catch (error){
        console.log("error",error)
        return next()
        
    }
}


module.exports =  authcustomerNormal;
