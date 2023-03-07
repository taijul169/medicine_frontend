
const { query, response } = require('express');
const dotenv =  require('dotenv');
const fetch  = require("node-fetch");
const axios =  require("axios");

const root_url = 'http://192.168.0.121:9010'

const authcourier = async (req, res, next) =>{
    console.log('i am inside authenticate')
    try {
        // console.log("auth is working");
        const token = req.cookies.jwtokencourier;
       
   await fetch(`http://localhost:8080/api/courier/authenticate/${token}`)
    .then(res =>res.json())
    .then(singleDocData =>{
        //console.log("shop data", singleDocData)
         console.log(singleDocData)
        if(!singleDocData){
            req.session.message={
                type:'alert-danger',
                intro:'Created!',
                message:'Login Please!!'
            }
            res.redirect("/courier/login") 
        }
        else{
            if(singleDocData.jwtokenforcourier == token){
              // for(var i=0;i< singleDocData.userData.length;i++){
            //     singleDocData.userData[i].PhotoPath = `${root_url}${singleDocData.userData[i].PhotoPath}`  
            // }
            req.userData = singleDocData;
    
            return next()
            }
            else{
                req.session.message={
                    type:'alert-danger',
                    intro:'Created!',
                    message:'Login Please!!'
                }
                res.redirect("/courier/login") 
            } 
            
            

        }
       
      
    });
    
    
 
    } catch (error){
        console.log(error)
        res.redirect("/shop/login")
        
    }
}


module.exports =  authcourier;
