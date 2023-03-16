
const { query, response } = require('express');
const dotenv =  require('dotenv');
const fetch  = require("node-fetch");
const axios =  require("axios");

const root_url = 'http://192.168.0.51:9010'

const authadmin = async (req, res, next) =>{
    console.log('i am inside authenticate')
    try {
        // console.log("auth is working");
        const token = req.cookies.accesstoken;
        console.log("token:",token)
        let data ={
            token:req.cookies.accesstoken
        }
        //const token = 'Ra3vzP42fnY7GPWr8SodDqaizAfx3sn';
    //    await axios(`http://localhost:8080/api/shop/authenticate/${token}`)
    //     .then(singleDocData =>{
    //         console.log("singleshop data:",singleDocData)
    //        // singleorder = singleorder.data[0]
    //        // let product =  singleorder[0].orderedproduct
    //         //console.log("singleorder",singleorder[0].orderedproduct)
    //         //res.render("admin/single-order",{singleorder})
    //     })
       
   await fetch(`http://localhost:5000/api/admin/adminauthenticate`,{
    method: "POST", // or 'PUT'
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
       
   })
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
            res.redirect("/login") 
        }
        else{
            if(singleDocData.jwtoken == token){
            req.userData = singleDocData;
    
            return next()
            }
            else{
                req.session.message={
                    type:'alert-danger',
                    intro:'Created!',
                    message:'Login Please!!'
                }
                res.redirect("/login") 
            } 
            
            

        }
       
      
    });
    
    
 
    } catch (error){
        console.log(error)
        res.redirect("/login")
        
    }
}


module.exports =  authadmin;
