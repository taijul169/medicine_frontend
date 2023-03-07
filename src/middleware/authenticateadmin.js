
const { query, response } = require('express');
const dotenv =  require('dotenv');
const fetch  = require("node-fetch");
const axios =  require("axios");

const root_url = 'http://192.168.0.121:9010'

const authadmin = async (req, res, next) =>{
    console.log('i am inside authenticate')
    try {
        // console.log("auth is working");
        const token = req.cookies.jwtokenadmin;
        //const token = 'Ra3vzP42fnY7GPWr8SodDqaizAfx3sn';
    //    await axios(`http://localhost:8080/api/shop/authenticate/${token}`)
    //     .then(singleDocData =>{
    //         console.log("singleshop data:",singleDocData)
    //        // singleorder = singleorder.data[0]
    //        // let product =  singleorder[0].orderedproduct
    //         //console.log("singleorder",singleorder[0].orderedproduct)
    //         //res.render("admin/single-order",{singleorder})
    //     })
       
   await fetch(`http://localhost:8080/api/admin/authenticate/${token}`)
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
            res.redirect("/admin/login") 
        }
        else{
            if(singleDocData.jwtoken == token){
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
                res.redirect("/admin/login") 
            } 
            
            

        }
       
      
    });
    
    
 
    } catch (error){
        console.log(error)
        res.redirect("/admin/login")
        
    }
}


module.exports =  authadmin;
