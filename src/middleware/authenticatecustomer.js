
const { query, response } = require('express');
const dotenv =  require('dotenv');
const fetch  = require("node-fetch");
const axios =  require("axios");
const async = require('hbs/lib/async');

const root_url = 'http://192.168.0.121:9010'

const authcustomer = async (req, res, next) =>{
    console.log('i am inside authenticate')
    try {
        // console.log("auth is working");
        const token = req.cookies.jwtokencustomer;
        //const token = 'Ra3vzP42fnY7GPWr8SodDqaizAfx3sn';
    //    await axios(`http://localhost:8080/api/shop/authenticate/${token}`)
    //     .then(singleDocData =>{
    //         console.log("singleshop data:",singleDocData)
    //        // singleorder = singleorder.data[0]
    //        // let product =  singleorder[0].orderedproduct
    //         //console.log("singleorder",singleorder[0].orderedproduct)
    //         //res.render("admin/single-order",{singleorder})
    //     })
       
   await fetch(`http://localhost:8080/api/customer/authenticate/${token}`)
    .then(res =>res.json())
    .then( async(singleDocData)=>{
        
        if(!singleDocData){
            req.session.message={
                type:'alert-danger',
                intro:'Created!',
                message:'Login Please!!'
            }
            res.redirect("/customer/login") 
        }
        else{
            
            if(singleDocData.jwtoken == token){
              // for(var i=0;i< singleDocData.userData.length;i++){
            //     singleDocData.userData[i].PhotoPath = `${root_url}${singleDocData.userData[i].PhotoPath}`  
            // }
            
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
          
            }
            else{
                req.session.message={
                    type:'alert-danger',
                    intro:'Created!',
                    message:'Login Please!!'
                }
                res.redirect("/customer/login") 
            }   
        }
       
    });
    } catch (error){
        console.log(error)
        res.redirect("/customer/login")
        
    }
}


module.exports =  authcustomer;
