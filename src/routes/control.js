
const express =  require('express');
const crypto = require("crypto");
const bodyParser =  require("body-parser");
const flash =  require('connect-flash')
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv =  require('dotenv');
dotenv.config({path:'../config.env'});
const fetch  = require("node-fetch");
var FormData = require('form-data');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const axios =  require("axios");
// middleware
const authshop = require('../middleware/authenticateshop')
const authcourier = require('../middleware/authenticatecourier')
const authadmin = require('../middleware/authenticateadmin')
const authcustomer = require('../middleware/authenticatecustomer')


// localStorage
// var LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch');

// const { rawListeners, schema } = require("../models/model");
const { handlebars } = require("hbs");
const router = express.Router();
const { query } = require('express');
const { json } = require('body-parser');
const auth = require("../middleware/auth");


const authcustomerNormal = require('../middleware/authenticateCustomerNormal');

// ---------------------------------------------------------------------------------medicine start -----------------------------------
router.get('/admin/',authadmin, (req,res,next)=>{
    try {
        fetch(`http://localhost:5000/api/products/allproducts`)
        .then(res => res.json())
        .then(productlist =>{
            fetch(`http://localhost:5000/api/order/getallorders`)
            .then(res => res.json())
            .then(orderlist =>{
               
                fetch(`http://localhost:5000/api/order/getallcustomers`)
                    .then(res => res.json())
                    .then(customerlist =>{
                        let totalSale =0;
                        orderlist.map((item,idx)=>{
                            totalSale = totalSale + parseInt(item.total) 
                            return item
                        })
                        console.log("cookie:",req.cookies.token)
                        res.render("admin/index",{productlist,userData:req.userData,customerlist,customerlist,totalSale,orderlist,userData:req.userData})
                    })
            })
            
        })
        
    } catch (error) {
        console.log(error)
    }
      
 });
// create product route
 router.get('/admin/createproduct',authadmin, (req,res)=>{
    try {
        res.render("admin/createproduct")
    } catch (error) {
        console.log(error)
    }
      
 });

//  product list
 router.get('/admin/productlist',authadmin, (req,res)=>{
    try {
        fetch(`http://localhost:5000/api/products/allproducts`)
        .then(res => res.json())
        .then(productlist =>{
            console.log("productlist:",productlist)
            res.render("admin/productlist",{productlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
      
 });


 
 //  get single product
 router.get('/admin/viewsingleproduct/:id',authadmin, (req,res)=>{
    try {
        fetch(`http://localhost:5000/api/products/singleproduct/${req.params.id}`)
        .then(res => res.json())
        .then(singleproduct =>{
            console.log("singleproduct:",singleproduct)
            res.render("admin/singleproduct",{singleproduct,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
      
 });

  //  get order list
  router.get('/admin/allorderlist',authadmin, (req,res)=>{
    try {
        fetch(`http://localhost:5000/api/order/getallorders`)
        .then(res => res.json())
        .then(orderlist =>{
            res.render("admin/orderlist",{orderlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
      
 });

   //  new order lsit
   router.get('/admin/neworderlist',authadmin, (req,res)=>{
    try {
        fetch(`http://localhost:5000/api/order/getallordersbystatus/pending`)
        .then(res => res.json())
        .then(orderlist =>{
            res.render("admin/neworderlist",{orderlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
      
 });
   //  get single order
   router.get('/admin/viewsingleorder/:id',authadmin, (req,res)=>{
    try {
        let total = 0;
        fetch(`http://localhost:5000/api/order/order/${req.params.id}`)
        .then(res => res.json())
        .then(singleorder =>{
            singleorder.order.orderitem = singleorder.order.orderitem.map((item,idx)=>{
                item.subtotal = item.price * item.quantity
                total = total + item.subtotal
                return item
            })
            res.render("admin/singleorder",{singleorder,userData:req.userData,total})
        })
    } catch (error) {
        console.log(error);
    } 
      
 });

//  order status update
  router.get('/admin/updateorderstatus/:status/:id',authadmin, async(req,res)=>{
    try {
        const response =  await (fetch(`http://localhost:5000/api/order/orderstatusupdate/${req.params.status}/${req.params.id}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/admin/viewsingleorder/${req.params.id}`)
    } 
    console.log("response",response)  
    } catch (error) {
        console.log(error);
    } 
      
 });


 
//    all clients
   router.get('/admin/clientlist',authadmin, (req,res)=>{
    try {
        fetch(`http://localhost:5000/api/order/getallcustomers`)
        .then(res => res.json())
        .then(clientlist =>{
            res.render("admin/clientlist",{clientlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
      
 });

//  single client
router.get('/admin/viewsingleclient/:id',authadmin, (req,res)=>{
    try {
        fetch(`http://localhost:5000/api/order/getsinglecustomerorderhistory/${req.params.id}`)
        .then(res => res.json())
        .then(clientData =>{
            res.render("admin/singleclient",{clientData,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    }   
 });

//  find best client
router.get('/admin/findbestclient',authadmin, (req,res)=>{
    try {
        res.render("admin/findbestclients",{userData:req.userData})
    } catch (error) {
        console.log(error);
    }   
 });


 router.post('/admin/bestcustomer',authadmin, (req,res)=>{
    try {
        
        axios.post("http://localhost:5000/api/order/findbestclient",req.body)
           .then(response =>{
               res.render("admin/findbestclients",{CustomerData:response.data,userData:req.userData,bodyData:req.body,userData:req.userData})
           })
           .catch(err => console.log(err))
    } catch (error) {
       console.log("error",error)
    }
});

// admin login
router.get('/login', (req,res)=>{
    try {
        res.render('admin/login')
    } catch (error) {
       console.log("error",error)
    }
});


// admin login post
router.post('/admin/login', (req,res)=>{
    try {
        
        axios.post("http://localhost:5000/api/admin/login",req.body)
           .then(response =>{
               console.log("response for login",response)
               if(response.status === 200){
                res.render("admin/index",{loginData:response.data,bodyData:req.body})
               }  
           })
           .catch(err =>{
            res.render("admin/login",{bodyData:req.body,msg:'Invalid Credentials'})
           })
    } catch (error) {
     res.render("admin/login",{bodyData:req.body,msg:'Invalid Credentials'})
       console.log("error",error)
    }
});

//admin login
router.get('/admin/profile', authadmin, (req,res)=>{
   res.render("admin/adminprofile",{userData:req.userData})
});


//get discount list 
router.get('/admin/offerlist', authadmin, (req,res)=>{
    
    try {
        fetch(`http://localhost:5000/api/discount/getalldiscount`)
        .then(res => res.json())
        .then(offerlist =>{
            res.render("admin/discountlist",{userData:req.userData,offerlist})
        })
    } catch (error) {
        console.log(error);
    } 
    
 });


 // admin/createoffer
router.post('/admin/offerlist', authadmin, (req,res)=>{
    try {
        
        axios.post("http://localhost:5000/api/discount/adddiscount",req.body)
           .then(response =>{
               console.log("response for login",response)
               if(response.status === 200){
                fetch(`http://localhost:5000/api/discount/getalldiscount`)
                .then(res => res.json())
                .then(offerlist =>{
                    res.render("admin/discountlist",{userData:req.userData,offerlist,msg:'Success! New Offer Created',type:'success'})
                })
                
               }  
           })
           .catch(err =>{
            fetch(`http://localhost:5000/api/discount/getalldiscount`)
            .then(res => res.json())
            .then(offerlist =>{
                res.render("admin/discountlist",{userData:req.userData,offerlist,msg:"Invalid Data!!",type:'danger'})
            })
            
           })
    } catch (error) {
     res.render("admin/discountlist",{userData:req.userData,offerlist})
       console.log("error",error)
    }
});


// admin/updateoffer
router.post('/admin/updateoffer', authadmin, (req,res)=>{
    try {
        
        axios.put(`http://localhost:5000/api/discount/updatesinglediscount/${req.body.discount_id}`,req.body)
           .then(response =>{
               console.log("response for login",response)
               if(response.status === 200){
                fetch(`http://localhost:5000/api/discount/getalldiscount`)
                .then(res => res.json())
                .then(offerlist =>{
                    res.render("admin/discountlist",{userData:req.userData,offerlist,msg:'Success! Data Updated',type:'success'})
                })
               }  
           })
           .catch(err =>{
            fetch(`http://localhost:5000/api/discount/getalldiscount`)
            .then(res => res.json())
            .then(offerlist =>{
                res.render("admin/discountlist",{userData:req.userData,offerlist,msg:"Invalid Data!!",type:'danger'})
            })
            
           })
    } catch (error) {
     res.render("admin/discountlist",{userData:req.userData,offerlist})
       console.log("error",error)
    }
});

 //get discount list 
router.get('/admin/updateoffer', authadmin, (req,res)=>{
    
    try {
        fetch(`http://localhost:5000/api/discount/getalldiscount`)
        .then(res => res.json())
        .then(offerlist =>{
            res.render("admin/discountlist",{userData:req.userData,offerlist})
        })
    } catch (error) {
        console.log(error);
    } 
    
 });

 //  single offer with product list
router.get('/admin/viewsingleoffer/:id',authadmin, (req,res)=>{
    try {
        fetch(`http://localhost:5000/api/discount/getitemsbydiscountid/${req.params.id}`)
        .then(res => res.json())
        .then(prodcuctlist =>{
            //console.log("single discunt product list:",prodcuctlist)
            fetch(`http://localhost:5000/api/products/allproducts`)
            .then(res => res.json())
            .then(productlistAll =>{
                let discountedProduct = prodcuctlist.items.map((item,idx)=>{
                    return item.product.id
                })
                console.log("discounted product:",discountedProduct) 
                productlistAll = productlistAll.filter((item,idx)=>{
                    for( var i=0;i<discountedProduct.length;i++){
                         item.id !== discountedProduct[i]
                        
                    }
                   
                })
               console.log("productlistAll:",productlistAll)
                res.render("admin/singleoffer-productlist",{prodcuctlist:prodcuctlist.items,discount:prodcuctlist.discount,userData:req.userData,productlistAll})
            })
           
        })
    } catch (error) {
        console.log(error);
    }   
 });


 router.post('/admin/additemtooffer', async(req,res)=>{
    try {
        console.log("req.body",req.body)
        req.body.product_id.map((item,idx)=>{
            axios.post("http://localhost:5000/api/discount/additemtodiscount/1",{
                discount_id:req.body.discount_id,
                product_id:item
            
           })
           .then(response =>{
            if(response.status === 200){
                req.session.message={
                    type:'alert-success',
                    intro:'Created!',
                    message:'city with area updated'
                }
                res.redirect(`/admin/viewsingleoffer/${req.body.discount_id}`)
            }
               //console.log("response for add user",response)
              
           })
           .catch(err =>{
            req.session.message={
                type:'alert-warning',
                intro:'Created!',
                message:'AlReady Exist!!'
            }
            res.redirect(`/admin/viewsingleoffer/${req.body.discount_id}`)
             //console.log("error",err)
           })
        })

      
    } catch (error) {
        console.log(error);
    }   
 });


//--------------------------------------------------------------------------------- medicine end--------------------------------------- 




// -------------------------------------------------------------------------- doorlaundry start-----------------------------------------------
// index page




 
 // get result shops
 router.get('/findshop',authcustomerNormal,(req,res)=>{

    console.log("user data from findshop:",req.userData)
     try {
        res.render("customer/shops-result",{userData:req.userData})
     } catch (error) {
         console.log("error:",error)
     }
   
 })

 router.post('/findshop', authcustomerNormal,(req,res)=>{
    const { city, area } = req.body
    try {
        axios(`http://localhost:8080/api/shop/shops/${city}/${area}`)
        .then(a=>{
            // console.log(a.data)
            // let data = JSON.stringify(a.data)
            let UpdatedData =  a.data.map((item,index)=>{
                let review =  item.review.map((data,idx)=>{
                    return data.rating
                 })
                 
                 const average = review.reduce((a, b) => a + b, 0) / review.length;
                 item.average_rating = average || 0
                 return item;
             })
           if(req.userData){
            axios(`http://localhost:8080/api/discount/getalldiscountbycustomerid/${req.userData.id}`)
            .then(data =>{
                //console.log("userDiscountData:",data.data)
                res.render("customer/shops-result",{data:a.data,userData:req.userData,UpdatedData,userDiscountData:data.data})
            })}else{
                res.render("customer/shops-result",{data:a.data,userData:req.userData,UpdatedData,userDiscountData:[]})
            }  
           
        })
    } catch (error) {
        console.log(error)
    }
     
 })
 
//  shop search by location
 router.post('/searchbylocation', authcustomerNormal,(req,res)=>{
    const { lat, lng } = req.body
    try {
        axios(`http://localhost:8080/api/shop/shopsbylocation/${lat}/${lng}`)
        .then(a=>{
            // console.log(a.data)
            // let data = JSON.stringify(a.data)
            let UpdatedData =  a.data.map((item,index)=>{
                let review =  item.review.map((data,idx)=>{
                    return data.rating
                 })
                 
                 const average = review.reduce((a, b) => a + b, 0) / review.length;
                 item.average_rating = average || 0
                 return item;
             })

           if(req.userData){
            axios(`http://localhost:8080/api/discount/getalldiscountbycustomerid/${req.userData.id}`)
            .then(data =>{
                //console.log("userDiscountData:",data.data)
                res.render("customer/shops-result-bylocation",{data:a.data,userData:req.userData,UpdatedData,userDiscountData:data.data})
            })
           }else{
            res.render("customer/shops-result-bylocation",{data:a.data,userData:req.userData,UpdatedData,userDiscountData:[]})
           }  
           
        })
    } catch (error) {
        console.log(error)
    }
     
 })
 
 // get single shop details with price
 router.get('/singleshop/:shopid',authcustomerNormal, (req,res)=>{

       try {
         axios(`http://localhost:8080/api/products/published/${req.params.shopid}`)
         .then(a=>{
             let data = JSON.stringify(a.data.products)
             let houseHoldData = a.data.products.filter((item,index)=>{
                return item.category_class == 'HOUSEHOLD'
             })
             let menData = a.data.products.filter((item,index)=>{
                return item.category_class == 'MEN'
             })
             let womenData = a.data.products.filter((item,index)=>{
                return item.category_class == 'WOMEN'
             })
             console.log("householddata:",houseHoldData)
             axios('http://localhost:8080/api/package/activepackageitem')
             .then(items=>{
                axios('http://localhost:8080/api/package/totalamount')
                .then(total =>{
                    axios(`http://localhost:8080/api/review/getallreviewbyshopid/${req.params.shopid}`)
                    .then(reviews=>{

                        if(req.userData){
                            axios(`http://localhost:8080/api/discount/getalldiscountbycustomerid/${req.userData.id}`)
                            .then(datatwo =>{
                                //console.log("userDiscountData:",data.data)
                                res.render("customer/single-shop-price",{
                                    data,
                                    rawdata:a.data,
                                    packageItem:items.data,
                                    totalamount:total.data[0],
                                    shopid:req.params.shopid,
                                    userData:req.userData,
                                    houseHoldData,
                                    menData,
                                    womenData,
                                    reviewData:reviews.data,
                                    userDiscountData:datatwo.data
            
                                })
                            })
                        }else{
                            res.render("customer/single-shop-price",{
                                data,
                                rawdata:a.data,
                                packageItem:items.data,
                                totalamount:total.data[0],
                                shopid:req.params.shopid,
                                userData:req.userData,
                                houseHoldData,
                                menData,
                                womenData,
                                reviewData:reviews.data,
                                userDiscountData:[]
        
                            })
                        }
                      
                    })
                    // res.render("customer/single-shop-price",{data,rawdata:a.data[0].product,shopData:a.data[0],packageItem:items.data,totalamount:total.data[0],shopid:req.params.shopid,userData:req.userData})
                  
                })
                
             })
           
         })
     } catch (error) {
         console.log(error)
     }
     
     
 })

// ====================================================================== customer module start===========================================================================

  // login
  router.get('/login',authcustomerNormal, (req,res,next)=>{
    res.render("customer/login",{userData:req.userData})
})

  // all shops list
  router.get('/allshops',authcustomerNormal, async(req,res,next)=>{
    try {
        axios('http://localhost:8080/api/discount/updatealldiscount')
        .then(datatwo =>{
            console.log("datatwo",datatwo.data)
        }) 
        axios('http://localhost:8080/api/city/allcitywitharea')
        .then(data =>{
            let PreData = data.data;
            PreData = JSON.stringify(PreData)
           const distinctData =  [...new Set(data.data.map(x=>x.city))];
           axios('http://localhost:8080/api/shop/allpublishedshop')
                .then(datatwo =>{
                    
                    let shopdataString =  JSON.stringify(datatwo.data.shops)
                    // console.log("shoddata:",datatwo.data)
                    let UpdatedData =  datatwo.data.shops.map((item,index)=>{
                       let review =  item.review.map((data,idx)=>{
                           return data.rating
                        })
                        
                        const average = review.reduce((a, b) => a + b, 0) / review.length;
                        item.average_rating = average || 0
                        return item;
                    })
                    if(req.userData){
                        axios(`http://localhost:8080/api/discount/getalldiscountbycustomerid/${req.userData.id}`)
                        .then(data =>{
                            //console.log("userDiscountData:",data.data)
                            res.render("customer/allshops",{datashop:UpdatedData,rawData:datatwo.data,distinctData,userData:req.userData,data:data.data,shopdataString,PreData,userDiscountData:data.data})
                        })
                    }else{
                        res.render("customer/allshops",{datashop:UpdatedData,rawData:datatwo.data,distinctData,userData:req.userData,data:data.data,shopdataString,PreData,userDiscountData:[]})
                    }
                    
                    
                }) 
        })
    } catch (error) {
        console.log(error)
    }
})


// shop-login
router.post('/customer/login', async(req,res)=>{

    var {phone, password} = req.body;

    const response =  await (fetch(`http://localhost:8080/api/customer/login`, 
    { 
        method: 'POST', 
        body:JSON.stringify({
            phone,password
        }),
            headers: { 'Content-Type': 'application/json' } 
    }));

    console.log('response-status:',response)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Welcome to Dashboard.'
        }
        const data = await  response.json()
        console.log("data:",data)
        res.cookie("jwtokencustomer",data.jwtoken,{
            expires:new Date(Date.now()+259000000),
            httpOnly:true
        });
        
        const temptoken = req.cookies.temptoken;
        console.log("temp token", temptoken)
        if(temptoken){
            console.log("i am inside if condition")
            res.clearCookie("temptoken");
            res.redirect('/checkout')
           
        }else{
            res.redirect(`/customer/profile/${data.id}`)
        }
        
    }
    if(response.status === 401){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/customer/login")
    }
    else if( response.status === 409){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/customer/login")
    }
    else if(response.status == 404){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/customer/login")
    }
});

//  customer registration
router.post('/customer/register', async(req,res)=>{
    
    var {phone,password} = req.body
    phone = phone.substring(3);
    
    const response =  await (fetch(`http://localhost:8080/api/customer/addcustomer`, 
    { 
        method: 'POST', 
        body:JSON.stringify({
            phone,password
        }),
            headers: { 'Content-Type': 'application/json' } 
    }));
    const data = await  response.json()
    console.log("create data:",data)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'You have been successfully created your profile!.'
        }
        res.cookie("jwtokencustomer",data.jwtoken,{
            expires:new Date(Date.now()+259000000),
            httpOnly:true
        });
        const temptoken = req.cookies.temptoken;
        console.log("temp token", temptoken)
        if(temptoken){
            console.log("i am inside if condition")
            res.clearCookie("temptoken");
            res.redirect('/checkout')
           
        }else{
            res.redirect(`/customer/profile/${data.id}`)
        }
    }
 })
// customer profile
router.get("/customer/profile/:customerid",authcustomer,(req,res,next)=>{
   
    res.render('customer/profile',{userData:req.userData})
})
  
// customer profile update
router.post('/customer/profile/:customerid', async(req,res)=>{
   // console.log(req.files)
    const shopID =  req.params.customerid;
    const response =  await (fetch(`http://localhost:8080/api/customer/updatecustomer/${shopID}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/customer/profile/${shopID}`)
    }

});

// customer order history
router.get("/customer/orderhistory/:customerid",authcustomer,(req,res,next)=>{
    // global.io.emit("UpdatedStatus",message="sdfsdfdsfsdfds")
    axios(`http://localhost:8080/api/order/allorderbyuserid/${req.params.customerid}`)
    .then(allorders =>{
        //console.log("allorders",allorders.data)
        allorders=  allorders.data
        res.render("customer/orderhistory",{userData:req.userData,allorders})
    })
   
})
// customer order history by shop id
router.get("/customer/singleshop/orderhistory/:customerid/:shop_id",authcustomer,(req,res,next)=>{
    // global.io.emit("UpdatedStatus",message="sdfsdfdsfsdfds")
    axios(`http://localhost:8080/api/order/allorderbyuseridandshopid/${req.params.customerid}/${req.params.shop_id}`)
    .then(allorders =>{
        //console.log("allorders",allorders.data)
        allorders=  allorders.data
        res.render("customer/orderhistory",{userData:req.userData,allorders})
    })
   
})

// my offer
router.get("/customer/myoffer/:customerid",authcustomer,(req,res,next)=>{
    // global.io.emit("UpdatedStatus",message="sdfsdfdsfsdfds")
    axios(`http://localhost:8080/api/discount/getalldiscountbycustomeridindashboard/${req.params.customerid}`)
    .then(myoffer =>{
        //console.log("myoffer",myoffer.data)
        myoffer=  myoffer.data
        res.render("customer/myoffers",{userData:req.userData,myoffer})
    })
})
// my shop list
router.get("/customer/myshop/:customerid",authcustomer,(req,res,next)=>{
    // global.io.emit("UpdatedStatus",message="sdfsdfdsfsdfds")
    axios(`http://localhost:8080/api/order/allshopsbyuserid/${req.params.customerid}`)
    .then(myshop =>{
        //console.log("myshop",myshop.data)
        myshop=  myshop.data
        res.render("customer/myshops",{userData:req.userData,myshop})
    })
})
// my message list
router.get("/customer/singleshop/message/:customerid/:shop_id",authcustomer,(req,res,next)=>{
    // global.io.emit("UpdatedStatus",message="sdfsdfdsfsdfds")
    axios(`http://localhost:8080/api/message//getmessagebycustomeridandshopid/${req.params.customerid}/${req.params.shop_id}`)
    .then(myMessage =>{
        //console.log("myMessage",myMessage.data)
        myMessage=  myMessage.data

        axios(`http://localhost:8080/api/shop/singleshop/${req.params.shop_id}`)
        .then(shopData =>{
            //console.log("shopData",shopData.data)
            shopData=  shopData.data
            res.render("customer/mymessage",{userData:req.userData,myMessage,shopData})
        })

    })

    
})
// my favourite shop list
router.get("/customer/myfavourite/:customerid",authcustomer,(req,res,next)=>{
    res.render("customer/myfavouriteshop",{userData:req.userData})
})
// customer notification history
router.get("/customer/notification/:notificationid",authcustomer, async(req,res,next)=>{

    const response = await (fetch(`http://localhost:8080/api/notification/notificationstatusupdatebyid/${req.params.notificationid}/1`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        axios(`http://localhost:8080/api/notification/getsinglenotification/${req.params.notificationid}`)
        .then(singleNotification =>{
            singleNotification=  singleNotification.data[0]
            axios(`http://localhost:8080/api/notification/getallnotificationbyuseridnusertype/${req.userData.id}/customer/1`)
            .then( async(allviewedNotifications) =>{
            
                allviewedNotifications=  allviewedNotifications.data
            
                //console.log("response:",response)
                res.render("customer/singlenotification",{userData:req.userData,singleNotification,allviewedNotifications})
            })
        
        })
    
    }
 
   
})
//  single order page customer
router.get('/customer/order/:id',authcustomer,(req,res)=>{
    const orderid =  req.params.id;
    try {
        axios(`http://localhost:8080/api/order/singleorder/${orderid}`)
        .then(singleorder =>{
            singleorder = singleorder.data[0]
           // let product =  singleorder[0].orderedproduct
            //console.log("singleorder",singleorder[0].orderedproduct)
            res.render("customer/singleorder",{singleorder,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 

});

router.post('/customer/findorder',authcustomer,async(req,res)=>{
    http://localhost:8080/api/order/singleorder/53

    try {
        axios(`http://localhost:8080/api/order/singleorder/${req.body.order_id}`)
        .then(singleorder =>{
            singleorder = singleorder.data[0]
           // let product =  singleorder[0].orderedproduct
            //console.log("singleorder",singleorder[0].orderedproduct)
            res.render("customer/findsingleorder",{singleorder,userData:req.userData})
        }).catch(()=>{
            res.render("customer/findsingleorder",{msg:'Data not found!!!',userData:req.userData})
        })
    } catch (error) {
        res.render("customer/findsingleorder",{msg:'Data not found!!!',userData:req.userData})
        console.log(error);
    } 
})

router.get('/customer/findorder',authcustomer,(req,res)=>{
    res.render("customer/findsingleorder",{msg:'Data not found!!!',userData:req.userData})
})

// customer cart page
router.get('/customer/login',authcustomerNormal,(req,res)=>{
    res.render("customer/login",{userData:req.userData})
})
// customer registration
router.get('/customer/registration',authcustomerNormal,(req,res)=>{
    res.render("customer/registration",{userData:req.userData})
})



// customer cart page
router.get('/cart',authcustomerNormal,(req,res)=>{
    const discount_id =  req.cookies.discount_id;
    
    axios(`http://localhost:8080/api/discount/getsinglediscount/${discount_id}`)
    .then(data =>{
        let singleDiscount = data.data;
        res.render("customer/cart",{userData:req.userData,singleDiscount})
    })
    
})
const temFunction =(req,res, next) =>{
    const token = req.cookies.jwtokencustomer;
    if(!token){
        res.cookie("temptoken",true,{
            expires:new Date(Date.now()+259000000),
            httpOnly:true
        });
        next()
    }
    else{
        next()
    }
}
// chekout
router.get('/checkout',temFunction,authcustomer,(req,res)=>{
     axios('http://localhost:8080/api/city/allcitywitharea')
    .then(data =>{
        let PreData = data.data;
        PreData = JSON.stringify(PreData)
        //console.log("city data:",data)
       const distinctData =  [...new Set(data.data.map(x=>x.city))];
       const discount_id =  req.cookies.discount_id;
    
       axios(`http://localhost:8080/api/discount/getsinglediscount/${discount_id}`)
       .then(data =>{
           let singleDiscount = data.data;
           res.render("customer/checkout",{distinctData,userData:req.userData,PreData,singleDiscount})
       })
      
    })
   
})

router.post('/checkout',async(req,res)=>{
    var {
        firstname,
        lastname,
        phone,
        address,
        area,
        city,
        paymentmethod,
        deliverycharge,
        total,
        user_id,
        shopid,
        discount_id
    } = req.body;
     var cartdata =JSON.parse(req.body.cartdata)
    //console.log(a)
    
    const response =  await fetch(`http://localhost:8080/api/order/addorder/${req.body.user_id}`, 
    { 
        method: 'POST', 
        body:JSON.stringify({
            firstname,
            lastname,
            phone,
            address,
            area,
            city,
            paymentmethod,
            deliverycharge,
            total,
            user_id,
            cartdata,
            shopid,
            discount_id
        }),
            headers: { 'Content-Type': 'application/json' } 
    });
    const data =  await response.json()
    console.log("response for order create:",response)
    if(response.status === 200){
        global.io.emit("orderSent",data)
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'contact Created!.'
        }
        res.redirect(`/customer/ordersuccess`)
    }
})

// customer review
router.post('/customer/review',async(req,res)=>{
    var {
        rating,
        description,
        user_id,
        shop_id
    } = req.body;
     
    //console.log(a)
    const response =  await (fetch(`http://localhost:8080/api/review/addreview`, 
    { 
        method: 'POST', 
        body:JSON.stringify({
            rating,
            description,
            user_id,
            shop_id
        }),
    headers: {'Content-Type': 'application/json'} 
    }));
    console.log(response)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Your comment successfully created.'
        }
        res.redirect(`/singleshop/${shop_id}`)
    }
})


//  success page
router.get('/customer/ordersuccess',authcustomer,(req,res)=>{
   
    res.render('customer/ordersuccess',{userData:req.userData})
})

router.get('/customer/logout',(req,res)=>{
    try {
        res.clearCookie("jwtokencustomer");
        console.log("logout success...");
        res.redirect("/customer/login");
    } catch (error) {
        res.status(500).send(error)
        
    }
});



// -----------------------------------------vendor/shop panel start--------------------------------------------------------------------------------------------
router.get('/shop/registration',(req,res)=>{
    res.render('shop/shopregistration')
})

//  shop registration
router.post('/shop/register',async(req,res)=>{
   
   var {phone,password} = req.body
   

   phone = phone.substring(3);
   
   console.log("req data:",req.body)
   const response =  await (fetch(`http://localhost:8080/api/shop/addshop`, 
   { 
       method: 'POST', 
       body:JSON.stringify({
           phone,password
       }),
           headers: { 'Content-Type': 'application/json' } 
   }));
   const data = await  response.json()
   console.log("create data:",data)
   if(response.status === 200){
       req.session.message={
           type:'alert-success',
           intro:'Created!',
           message:'You have been successfully created your profile!.'
       }
       res.cookie("jwtokenshop",data.jwtokenforshop,{
           expires:new Date(Date.now()+259000000),
           httpOnly:true
       });
       res.redirect(`/shop/profile/${data.id}`)
   }
   if(response.status === 400){
    req.session.message={
        type:'alert-danger',
        intro:'Created!',
        message:'This user alrady exist!.'
    }
    res.redirect(`/shop/registration`)
  }
})
// shop dashboard
router.get('/shop/control', authshop, (req, res, next)=>{
   try {
        axios(`http://localhost:8080/api/order/allordersbyshopid/${req.userData.id}`)
        .then(orderlist =>{
            orderlist = orderlist.data

            let PendingData =  orderlist.filter((item,indx)=>{
                return  item.currentstatus === "Pending"
              })
              let DeliveredData =  orderlist.filter((item,indx)=>{
                 return item.currentstatus === "Delivered"
                 
              })

              fetch(`http://localhost:8080/api/products/allproducts/${req.userData.id}`)
              .then(res => res.json())
              .then(productlist =>{
                  
                  res.render("shop/home",{orderlist,userData:req.userData,DeliveredData,PendingData,productlist})
              })
           
        })
    } catch (error) {
        res.render("shop/home",{userData:req.userData})
    } 
   
});

//  order list page
router.get('/shop/orders/:shopid',authshop, (req,res,next)=>{
    
    console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/order/allordersbyshopid/${req.params.shopid}`)
        .then(orderlist =>{
            orderlist = orderlist.data
            res.render("shop/order-list",{orderlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});




//  single order page
router.get('/shop/order/:id',authshop,(req,res)=>{
   
    const orderid =  req.params.id;
    try {
        axios(`http://localhost:8080/api/order/singleorder/${orderid}`)
        .then(singleorder =>{
            singleorder = singleorder.data[0]
            axios(`http://localhost:8080/api/orderstatus/getorderstatusbyorderid/${orderid}`)
            .then(orderstatus =>{
                orderstatus =  orderstatus.data

                axios(`http://localhost:8080/api/courier/allcouriersbyshopid/${req.userData.id}`)
                .then(courierData =>{
                    courierData =  courierData.data
                    // const MessageData = {
                    //     orderid:singleorder.id,
                    //     status:singleorder.currentstatus
                    // }
                    
                    res.render("shop/single-order",{singleorder,userData:req.userData,orderstatus,courierData})
                })
            })
           
        })
    } catch (error) {
        console.log(error);
    } 

});

// orderstatus update by orderid
router.get("/admin/statusupdate/:orderid/:status/:user_id", async(req,res)=>{
    
    const response =  await (fetch(`http://localhost:8080/api/order/orderstatusupdatebyid/${req.params.orderid}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
         // push notification
         const MessageData = {
            orderid:req.params.orderid,
            status:req.params.status,
            userid:req.params.user_id
        }
        global.io.emit("UpdatedStatus",MessageData)
        
        await (fetch(`http://localhost:8080/api/orderstatus/orderstatusupdatebyorderid/${req.params.orderid}/${req.params.status}`,
        {
            method: 'PUT', 
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
        }
        ))
        if(response.status === 200){
            const notiData ={
                user_id:req.params.user_id,
                user_type:'customer',
                heading:"Order Status Updated",
                body:`Your order has been ${req.params.status}.`
             }
             const notiResponse =  await (fetch(`http://localhost:8080/api/notification/addnotification`, 
            { 
                method: 'POST', 
                body: JSON.stringify(notiData),
                headers: { 'Content-Type': 'application/json' }
            }));

            if(notiResponse.status === 200){
                req.session.message={
                    type:'alert-success',
                    intro:'Created!',
                    message:`Order has been ${req.params.status}`
                }
                res.redirect(`/shop/order/${req.params.orderid}`)
            }else{
                req.session.message={
                    type:'alert-success',
                    intro:'Created!',
                    message:`Something went wrong with notification`
                }
                res.redirect(`/shop/order/${req.params.orderid}`)
            }
           
        }
        else{
            req.session.message={
                type:'alert-success',
                intro:'Created!',
                message:`something went wrong`
            }
            res.redirect(`/shop/order/${req.params.orderid}`)
        }
       
       
    }else{
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:`something went wrong!`
        }
        res.redirect(`/shop/order/${req.params.orderid}`)
    }
})

// orderstatus  by orderid
router.post("/admin/statusupdate/:orderid/:status", async(req,res)=>{
    
     const { pickupdate,pickuptime,order_id,reason, deliveryboyid,estimatedtime,user_id } = req.body
 
    const response =  await (fetch(`http://localhost:8080/api/orderstatus/addorderstatus`, 
    { 
        method: 'POST', 
        body: JSON.stringify({
            pickupdate,
            pickuptime,
            order_id,
            deliveryboyid,
            reason,
            status:req.params.status,
            estimatedtime
        }),
        headers: { 'Content-Type': 'application/json' }
    }));
    
    if(response.status === 200){

          // push notification
          const MessageData = {
            orderid:order_id,
            status:req.params.status,
            userid:user_id
        }
        global.io.emit("UpdatedStatus",MessageData)

        const response =  await (fetch(`http://localhost:8080/api/order/orderstatusupdatebyid/${req.params.orderid}/${req.params.status}`, 
        { 
            method: 'PUT', 
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
        }));
        if(response.status === 200){
            const notiData ={
               user_id:user_id,
               user_type:'customer',
               heading:"Order Status Updated",
               body:`Your order has been ${req.params.status}.`
            }
            const notiResponse =  await (fetch(`http://localhost:8080/api/notification/addnotification`, 
            { 
                method: 'POST', 
                body: JSON.stringify(notiData),
                headers: { 'Content-Type': 'application/json' }
            }));
            if(notiResponse.status === 200){
                req.session.message={
                    type:'alert-success',
                    intro:'Created!',
                    message:`Order has been ${req.params.status}`
                }
                res.redirect(`/shop/order/${req.params.orderid}`)
            }else{
                req.session.message={
                    type:'alert-success',
                    intro:'Created!',
                    message:`Something went wrong!!`
                }
                res.redirect(`/shop/order/${req.params.orderid}`)
            }
            // req.session.message={
            //     type:'alert-success',
            //     intro:'Created!',
            //     message:`Order has been ${req.params.status}`
            // }
            // res.redirect(`/shop/order/${req.params.orderid}`)
        }
       
    }
    else{
        req.session.message={
            type:'alert-danger',
            intro:'corruptted!',
            message:`Something went wrong in updating order status!!`
        }
        res.redirect(`/shop/order/${req.params.orderid}`)
    }
})

// orderstatus cancel with reason update  by orderid
// router.post("/admin/statusupdatecancel/:orderid/:status", async(req,res)=>{
    
//     const { order_id, reason } = req.body
//    const response =  await (fetch(`http://localhost:8080/api/shop/orderstatusupdatecancelbyorderid/${req.params.orderid}/${req.params.status}`, 
//    { 
//        method: 'PUT', 
//        body: JSON.stringify({
//            reason,
//            order_id
           
//        }),
//        headers: { 'Content-Type': 'application/json' }
//    }));
//    console.log("response",response)
//    if(response.status === 200){
      
//     req.session.message={
//         type:'alert-success',
//         intro:'cruptted!',
//         message:`Order has been ${req.params.status}`
//     }
//     res.redirect(`/shop/order/${req.params.orderid}`)
//    }
//    else{
//        req.session.message={
//            type:'alert-danger',
//            intro:'cruptted!',
//            message:`Something went wrong!!`
//        }
//        res.redirect(`/shop/order/${req.params.orderid}`)
//    }
// })

// shop admin product list page
router.get('/shop/products/:shopid',authshop, (req,res,next)=>{
    try {
        fetch(`http://localhost:8080/api/products/allproducts/${req.params.shopid}`)
        .then(res => res.json())
        .then(productlist =>{
            console.log("productlist:",productlist.productimage)
            res.render("shop/product-list",{productlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});


// product status update by shops owner
router.get("/shop/productstatusupdate/:id/:status/:shopid", async(req,res)=>{
    const response =  await (fetch(`http://localhost:8080/api/products/productstatusupdate/${req.params.id}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/shop/products/${req.params.shopid}`)

    }
})

// single product update
router.get("/shop/singleproductupdate/:id", authshop, async(req,res,next)=>{
    try {
        fetch(`http://localhost:8080/api/products/singleproduct/${req.params.id}`)
        .then(res => res.json())
        .then(productdata =>{
            fetch(`http://localhost:8080/api/productimage/allproductimage`)
                .then(res => res.json())
                .then(allNames =>{
                let  allNamesFront = JSON.stringify(allNames)
                    res.render("shop/singleproduct",{productdata,userData:req.userData,allNamesFront,allNames})
                    
                })
            
        })
    } catch (error) {
        console.log(error);
    }  

   
})


router.post("/shop/singleproductupdate/:id", authshop, async(req,res)=>{
    
    const response =  await (fetch(`http://localhost:8080/api/products/updateproduct/${req.params.id}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/shop/singleproductupdate/${req.params.id}`)
    }
})

// shop-login
router.get('/shop/login', (req,res)=>{

    res.render("shop/login")
});


// shop-login
router.post('/shop/login', async(req,res)=>{
    var {phone, password} = req.body;

    const response =  await (fetch(`http://localhost:8080/api/shop/login`, 
    { 
        method: 'POST', 
        body:JSON.stringify({
            phone,password
        }),
            headers: { 'Content-Type': 'application/json' } 
    }));

    console.log('response-status:',response)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Welcome to Dashboard.'
        }
        const data = await  response.json()
        console.log("data:",data)
        res.cookie("jwtokenshop",data.jwtokenforshop,{
            expires:new Date(Date.now()+259000000),
            httpOnly:true
        });
        res.redirect(`/shop/control`)
    }
    if(response.status === 401){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'You are temporary blocked.Please contact with Authority.'
        }
        res.redirect("/shop/login")
    }
    if( response.status === 409){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/shop/login")
    }
   if( response.status === 404){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/shop/login")
    }
    if( response.status === 403){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/shop/login")
    }
});


// shop logout
router.get('/shoplogout',(req,res)=>{
    try {
        res.clearCookie("jwtokenshop");
        console.log("logout success...");
        res.redirect("/shop/login");
    } catch (error) {
        res.status(500).send(error)
        
    }
});

// shop create proudct page
router.get('/shop/createproduct/:shopid', authshop,(req,res)=>{

    try {
        fetch(`http://localhost:8080/api/productimage/allproductimage`)
        .then(res => res.json())
        .then(allNames =>{
           let  allNamesFront = JSON.stringify(allNames)
            res.render("shop/create_product", {allNamesFront,allNames,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
        res.render("shop/create_product", {userData:req.userData})
    } 
    

});
// shop create proudct page
router.post('/shop/createproduct/:shopid', async(req,res)=>{
    
    const shopID =  req.params.shopid;
    const{title,price,category,description,category_class,product_image_id} = req.body
    const response =  await (fetch(`http://localhost:8080/api/products/addproduct/${shopID}`, 
    { 
        method: 'POST', 
        body:JSON.stringify({
            title,price,category,description,category_class,product_image_id
        }),
            headers: { 'Content-Type': 'application/json' } 
    }));

    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Product Created Successfully.'
        }
        res.redirect(`/shop/createproduct/${shopID}`)
    }
    if(response.status === 401){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Input.'
        }
        res.redirect(`/shop/createproduct/${shopID}`)
    }
    if(response.status === 400){
        req.session.message={
            type:'alert-danger',
            intro:'Exist!',
            message:'Service already exist!!.'
        }
        res.redirect(`/shop/createproduct/${shopID}`)
    }
    else if( response.status === 409){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Create.'
        }
        res.redirect(`/shop/createproduct/${shopID}`)
    }


});

// shop create proudct page
router.get('/shop/profile/:shopid', authshop,(req,res)=>{

    res.render("shop/shop_profile", {userData:req.userData})

});
// shop create proudct page
router.post('/shop/profile/:shopid', async(req,res)=>{
    console.log(req.files)
    const shopID =  req.params.shopid;
    const response =  await (fetch(`http://localhost:8080/api/shop/updateshop/${shopID}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.files.photo),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/shop/profile/${shopID}`)
    }

});

// admin pending  shop list page
router.get('/shop/orderlist/:status/:shopid',authshop, (req,res,next)=>{
    try {
        axios(`http://localhost:8080/api/order/shop/${req.params.status}/${req.params.shopid}`)
        .then(orderlist =>{
            orderlist = orderlist.data
            res.render("shop/order-list",{orderlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    }  

});


//   ------------------courier section in shop panel control-------------------------
// admin create courier page
router.get('/shop/createcourier/:shopid',authshop, (req,res,next)=>{
    try {
        res.render("shop/courier_create",{userData:req.userData})
    } catch (error) {
        console.log(error);
    } 
    

});

// admin  shop courier list page
router.get('/shop/courierlist/:shopid',authshop, (req,res,next)=>{
    try {
        axios(`http://localhost:8080/api/courier/allcouriersbyshopid/${req.params.shopid}`)
        .then(orderlist =>{
            orderlist = orderlist.data
            res.render("shop/courier-list",{orderlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    }  

});

//  single courier page
router.get('/shop/courier/:id',authshop,(req,res)=>{
    const courierid =  req.params.id;
    try {
        axios(`http://localhost:8080/api/courier/singlecourier/${courierid}`)
        .then(courierData =>{
             courierData = courierData.data
             //console.log("courier data by id:",courierData)
             res.render("shop/courier-profile",{courierData,userData:req.userData})
           
        })
    } catch (error) {
        console.log(error);
    } 

});

// SHOP report order list
router.get('/shop/datewiseorder/:shopid',authshop, (req,res,next)=>{
    try {
        axios('http://localhost:8080/api/city/allcitywitharea')
        .then(data =>{
            let PreData = data.data;
            PreData = JSON.stringify(PreData)
            //console.log("city data:",data)
           const distinctData =  [...new Set(data.data.map(x=>x.city))];
           res.render("shop/report/report-list-order",{data:data.data,distinctData,userData:req.userData,PreData})
        })
    } catch (error) {
        console.log(error)
    }
});

router.post('/shop/datewiseorder/:shopid',authshop, (req,res)=>{
    try {
        console.log("req data from body",req.body)
        axios.post("http://localhost:8080/api/order/report/shop/datewiseorder",req.body)
           .then(response =>{
               res.render("shop/report/report-list-order",{OrderData:response.data,userData:req.userData,bodyData:req.body})
           })
           .catch(err => console.log(err))
    } catch (error) {
       console.log("error",error)
    }
});


// shop report best seller 
router.get('/shop/bestcustomer/:shopid',authshop, (req,res,next)=>{
    try {
        res.render("shop/report/report-list-best-customer",{userData:req.userData})
    } catch (error) {
        console.log(error)
    }

});

router.post('/shop/bestcustomer/:shopid',authshop, (req,res)=>{
    try {
        const shopID =  req.params.shopid;
        
        axios.post("http://localhost:8080/api/order/report/bestcustomer",req.body)
           .then(response =>{
               res.render("shop/report/report-list-best-customer",{CustomerData:response.data,userData:req.userData,bodyData:req.body})
           })
           .catch(err => console.log(err))
    } catch (error) {
       console.log("error",error)
    }
});
// shop admin product list page
router.get('/shop/products/:shopid',authshop, (req,res,next)=>{
    try {
        fetch(`http://localhost:8080/api/products/allproducts/${req.params.shopid}`)
        .then(res => res.json())
        .then(productlist =>{
            console.log("productlist:",productlist)
            res.render("shop/product-list",{productlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});
// my customer
router.get('/shop/mycustomer/:shopid',authshop, (req,res,next)=>{
    try {
        axios(`http://localhost:8080/api/order/allcustomersbyshopid/${req.userData.id}`)
            .then(userlist =>{
                userlist = userlist.data
                console.log("customer lsit",userlist)
                res.render("shop/list-mycustomer",{userData:req.userData,userlist})
                
            })
    } catch (error) {
        console.log(error);
    } 
    

});
// my customer
router.get('/shop/singlecustomer/:customerid',authshop, (req,res,next)=>{
    try {
        
        axios(`http://localhost:8080/api/order/getallorderwithreviewandcustomerinfo/${req.params.customerid}/${req.userData.id}`)
            .then(data =>{
                customerData = data.data

                axios(`http://localhost:8080/api/message//getmessagebycustomeridandshopid/${req.params.customerid}/${req.userData.id}`)
                    .then(data =>{
                        messageData = data.data
                        res.render("shop/singlecustomer",{userData:req.userData,customerData,messageData})
                        
                    })
                
            })
    } catch (error) {
        console.log(error);
    } 
    

});
// customer order list form shop page
router.get('/shop/singlecustomer/orderlist/:customerid',authshop, (req,res,next)=>{
    //const adminid =  req.params.adminid
    //console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/order/allorderbyuseridandshopid/${req.params.customerid}/${req.userData.id}`)
        .then(orderlist =>{
            orderlist = orderlist.data
            res.render("shop/order-list",{orderlist,userData:req.userData})
        })
    } catch (error) {
        res.render("shop/order-list",{userData:req.userData})
        console.log(error);
    } 
    

});
// order list by discount id and shop id
router.get('/shop/promotion/order/:discount_id',authshop, (req,res,next)=>{
    //const adminid =  req.params.adminid
    //console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/order/getallordersbydiscountidandShopid/${req.params.discount_id}/${req.userData.id}`)
        .then(orderlist =>{
            orderlist = orderlist.data
            res.render("shop/order-list",{orderlist,userData:req.userData})
        })
    } catch (error) {
        res.render("shop/order-list",{userData:req.userData})
        console.log(error);
    } 
    

});

//  shop list for promotion
router.get('/shop/promotion/:shopid',authshop, (req,res,next)=>{
    //const adminid =  req.params.adminid
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/discount/getalldiscountbyuserid/${req.params.shopid}/shop`)
        .then(discountlist =>{
            
            discountlistInUser = discountlist.data.discouts
            unassignedDiscounts = discountlist.data.discountUnassigned;
            //console.log("unassignedDiscounts",discountlist.data.discountUnassigned)
            axios(`http://localhost:8080/api/order/allcustomersbyshopid/${req.userData.id}`)
            .then(userlist =>{
                userlist = userlist.data
                res.render("shop/list-promotion",{discountlistInUser,userData:req.userData,userlist,unassignedDiscounts})
                
            })
        })
    } catch (error) {
        console.log(error);
    } 

});

router.post("/shop/createnewpromotion", authshop, async(req,res)=>{
    
    const response =  await fetch(`http://localhost:8080/api/discount/adddiscount`, 
    { 
        method: 'POST', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'New Promotion created'
        }
        res.redirect(`/shop/promotion/${req.userData.id}`)
    }
    if(response.status === 403){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Data already exist!!'
        }
        res.redirect(`/shop/promotion/${req.userData.id}`)
    }

})
// single promtion update
router.post("/shop/updatepromotion", authshop, async(req,res)=>{
    
    const response =  await fetch(`http://localhost:8080/api/discount/updaesinglediscount/${req.body.nameid}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Promotion Updated'
        }
        res.redirect(`/shop/promotion/${req.userData.id}`)
    }
    if(response.status === 400){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Data!!'
        }
        res.redirect(`/shop/promotion/${req.userData.id}`)
    }

})

// add user to promotion
router.post("/shop/addusertopromotion", authshop, async(req,res)=>{
    
    const response =  await fetch(`http://localhost:8080/api/discount/adduserdiscount`, 
    { 
        method: 'POST', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'New User added'
        }
        res.redirect(`/shop/promotion/${req.userData.id}`)
    }
    if(response.status === 403){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Data already exist!!'
        }
        res.redirect(`/shop/promotion/${req.userData.id}`)
    }else{
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:' User added'
        }
        res.redirect(`/shop/promotion/${req.userData.id}`)
    }

})
// admin user list for promotion a particular promotion
router.get('/shop/promotion/users/:discount_id',authshop, (req,res,next)=>{
    //const adminid =  req.params.adminid
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/discount/getallusersbydiscountid/${req.params.discount_id}/customer`)
        .then(userlist =>{
            userlist = userlist.data
            res.render("shop/customer-list-promotion",{userlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 

});
//--------------------------------------------------------- courier section start---------------------------------------------------------------------
// courier-login
router.get('/courier/login', (req,res)=>{
    res.render("courier/login")
});

// courier-login
router.post('/courier/login', async(req,res)=>{
    var {phone, password} = req.body;

    const response =  await (fetch(`http://localhost:8080/api/courier/login`, 
    { 
        method: 'POST', 
        body:JSON.stringify({
            phone,password
        }),
            headers: { 'Content-Type': 'application/json' } 
    }));

    console.log('response-status:',response)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Welcome to Dashboard.'
        }
        const data = await  response.json()
        console.log("data:",data)
        res.cookie("jwtokencourier",data.jwtokenforcourier,{
            expires:new Date(Date.now()+259000000),
            httpOnly:true
        });
        res.redirect(`/courier/control`)
    }
    if(response.status === 401){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/courier/login")
    }
    else if( response.status === 409){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/courier/login")
    }
    else if( response.status === 404){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/courier/login")
    }
});
 
// courier dashboard
router.get('/courier/control', authcourier, (req, res, next)=>{
    try {
        axios(`http://localhost:8080/api/courier/courierproducts/${req.userData.id}`)
        .then(orderlist =>{
            orderlist = orderlist.data
           
            let ReceivedData =  orderlist.filter((item,indx)=>{
              return  item.currentstatus === "Received"
               
            })
            console.log("Received data:",ReceivedData)
            let DeliveredData =  orderlist.filter((item,indx)=>{
               return item.currentstatus === "Delivered"
               
            })
            let PickedupData =  orderlist.filter((item,indx)=>{
              return  item.currentstatus === "Pickedup"
               
            })
            res.render("courier/home",{orderlist,userData:req.userData,ReceivedData,DeliveredData,PickedupData})
        })
    } catch (error) {
        res.render("courier/home",{userData:req.userData})
    }
   
});

// courier order list page
router.get('/courier/orders/:courierid',authcourier, (req,res,next)=>{
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/courier/courierproducts/${req.params.courierid}`)
        .then(orderlist =>{
            orderlist = orderlist.data
            console.log("order list:",orderlist)
            res.render("courier/order-list",{orderlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});
// courier order list page by filter (Delivered/pickedup)
router.get('/courier/orderlist/:status/:courierid',authcourier, (req,res,next)=>{
    // console.log(req.userData)
     try {
         axios(`http://localhost:8080/api/courier/courierproductsbyfilters/${req.params.status}/${req.params.courierid}`)
         .then(orderlist =>{
             orderlist = orderlist.data
             console.log("order list:",orderlist)
             res.render("courier/order-list",{orderlist,userData:req.userData})
         })
     } catch (error) {
         console.log(error);
     } 
     
 
 });
//  single order page- courier
router.get('/courier/order/:id',authcourier,(req,res)=>{
    const orderid =  req.params.id;
    try {
        axios(`http://localhost:8080/api/order/singleorder/${orderid}`)
        .then(singleorder =>{
            singleorder = singleorder.data[0]
            axios(`http://localhost:8080/api/orderstatus/getorderstatusbyorderid/${orderid}`)
            .then(orderstatus =>{
                orderstatus =  orderstatus.data

                res.render("courier/single-order",{singleorder,userData:req.userData,orderstatus})
            })
           
        })
    } catch (error) {
        console.log(error);
    } 

});

//  courier profile page
router.get('/courier/profile/:id',authcourier,(req,res)=>{
    const courierid =  req.params.id;
    try {
        axios(`http://localhost:8080/api/courier/singlecourier/${courierid}`)
        .then(courierData =>{
             courierData = courierData.data
             //console.log("courier data by id:",courierData)
             res.render("courier/courier-profile",{courierData,userData:req.userData})
           
        })
    } catch (error) {
        console.log(error);
    } 

});

// shop logout
router.get('/courierlogout',(req,res)=>{
    try {
        res.clearCookie("jwtokencourier");
        console.log("logout success...");
        res.redirect("/courier/login");
    } catch (error) {
        res.status(500).send(error)
        
    }
});

// orderstatus update by orderid
router.get("/courier/statusupdate/:orderid/:status/:user_id", async(req,res)=>{
      
    const response =  await (fetch(`http://localhost:8080/api/order/orderstatusupdatebyid/${req.params.orderid}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        
        await (fetch(`http://localhost:8080/api/orderstatus/orderstatusupdatebyorderid/${req.params.orderid}/${req.params.status}`,
        {
            method: 'PUT', 
            body: JSON.stringify(req.body),
            headers: { 'Content-Type': 'application/json' }
        }
        ))
        if(response.status === 200){


            const notiData ={
                user_id:req.params.user_id,
                user_type:'customer',
                heading:"Order Status Updated",
                body:`Your order has been ${req.params.status}.`
             }
             const notiResponse =  await (fetch(`http://localhost:8080/api/notification/addnotification`, 
            { 
                method: 'POST', 
                body: JSON.stringify(notiData),
                headers: { 'Content-Type': 'application/json' }
            }));

            if(notiResponse.status === 200){

                 // push notification
                const MessageData = {
                    orderid:req.params.orderid,
                    status:req.params.status,
                    userid:req.params.user_id
                }
                global.io.emit("UpdatedStatus",MessageData)
                req.session.message={
                    type:'alert-success',
                    intro:'Created!',
                    message:`Order has been ${req.params.status}`
                }
                res.redirect(`/courier/order/${req.params.orderid}`)
            
            }else{
                req.session.message={
                    type:'alert-success',
                    intro:'Created!',
                    message:`something went wrong`
                }
                res.redirect(`/courier/order/${req.params.orderid}`)
            }
        }else{
            req.session.message={
                type:'alert-danger',
                intro:'Created!',
                message:`something went wrong!`
            }
            res.redirect(`/courier/order/${req.params.orderid}`)
        }
    }else{
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:`something went wrong!`
        }
        res.redirect(`/courier/order/${req.params.orderid}`)
    }
})
//--------------------------------------------------------- courier section end---------------------------------------------------------------------

//=================================================== ADMIN SECTION START===============================================================================

// admin-login
router.get('/admin/login', (req,res)=>{
    res.render("admin/login")
});

// admin-login
router.post('/admin/login', async(req,res)=>{
    var {phone, password} = req.body;

    const response =  await (fetch(`http://localhost:8080/api/admin/login`, 
    { 
        method: 'POST', 
        body:JSON.stringify({
            phone,password
        }),
            headers: { 'Content-Type': 'application/json' } 
    }));

    console.log('response-status:',response)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Welcome to Dashboard.'
        }
        const data = await  response.json()
        console.log("data:",data)
        res.cookie("jwtokenadmin",data.jwtoken,{
            expires:new Date(Date.now()+259000000),
            httpOnly:true
        });
        res.redirect(`/admin/control`)
    }
    if(response.status === 401){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/admin/login")
    }
    else if( response.status === 409){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/admin/login")
    }
    else if( response.status === 404){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Login.'
        }
        res.redirect("/admin/login")
    }
});


// admin logout
router.get('/adminlogout',(req,res)=>{
    try {
        res.clearCookie("jwtokenadmin");
        console.log("logout success...");
        res.redirect("/admin/login");
    } catch (error) {
        res.status(500).send(error)
        
    }
});
// ------------------------------------------area section start----------------------------------------
// admin create proudct page
router.get('/admin/area/:adminid', authadmin,(req,res)=>{
    try {
        axios('http://localhost:8080/api/city/allcitywithareabyadmin')
        .then(data =>{
            let PreData = data.data;
            PreData = JSON.stringify(PreData)
            //console.log("city data:",data)
           const distinctData =  [...new Set(data.data.map(x=>x.city))];
           res.render("admin/area-list",{data:data.data,distinctData,userData:req.userData,PreData})
        })
    } catch (error) {
        res.render("admin/area-list", {userData:req.userData})
    }
});



// area status updae by admin
router.get('/admin/area/citystatusupdate/:id/:status', authadmin, async(req,res)=>{
    try {
        const response =  await (fetch(`http://localhost:8080/api/city/citystatusupdate/${req.params.id}/${req.params.status}`, 
        { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' } 
        }));
    
        if(response.status === 200){
            req.session.message={
                type:'alert-success',
                intro:'Created!',
                message:'City updated.'
            }
            res.redirect(`/admin/area/${req.userData.id}`)
        }
    } catch (error) {
        res.render("admin/area-list", {userData:req.userData})
    }
});
// product update by super admin
router.post("/admin/createnewcity", authadmin, async(req,res)=>{
    
    const response =  await fetch(`http://localhost:8080/api/city/addcity`, 
    { 
        method: 'POST', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'New City with area created'
        }
        res.redirect(`/admin/area/${req.userData.id}`)
    }
    if(response.status === 403){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Data already exist!!'
        }
        res.redirect(`/admin/area/${req.userData.id}`)
    }

})

// product update by super admin
router.post("/admin/updatecity", authadmin, async(req,res)=>{
    try {
        const response =  await fetch(`http://localhost:8080/api/city/citystatusupdate`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'city with area updated'
        }
        res.redirect(`/admin/area/${req.userData.id}`)
    }
    if(response.status === 403){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Data already exist!!'
        }
        res.redirect(`/admin/area/${req.userData.id}`)
    }
    } catch (error) {
        res.redirect(`/admin/area/${req.userData.id}`)
    }
    
    

})

// ------------------------------------------area section end-----------------------------------------------------
// ------------------------------------------services/products section start------------------------------------------
// admin create proudct page
router.get('/admin/productnamelist/:adminid', authadmin,(req,res)=>{
    try {
        axios('http://localhost:8080/api/productimage/allproductimage')
        .then(data =>{
           res.render("admin/product-name-list",{data:data.data,userData:req.userData})
        })
    } catch (error) {
        res.render("admin/product-name-list", {userData:req.userData})
    }
    

});

// product/service status updae by admin
router.get('/admin/service/servicestatusupdate/:id/:status', authadmin, async(req,res)=>{
    try {
        const response =  await (fetch(`http://localhost:8080/api/productimage/productstatusupdate/${req.params.id}/${req.params.status}`, 
        { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' } 
        }));
    
        if(response.status === 200){
            req.session.message={
                type:'alert-success',
                intro:'Created!',
                message:'Service updated.'
            }
            res.redirect(`/admin/productnamelist/${req.userData.id}`)
        }
    } catch (error) {
        res.render("admin/product-name-list", {userData:req.userData})
    }
});
// ------------------------------------------services/products section end------------------------------------------

// admin create proudct page
router.get('/admin/createproduct/:adminid', authadmin,(req,res)=>{

    res.render("admin/create_product", {userData:req.userData})

});

// get create admin page
router.get('/admin/createshop/:adminid',authadmin,(req,res)=>{
    res.render('admin/createshop',{userData:req.userData})
})

// admin pending  shop list page
router.get('/admin/orderlist/:status/:amdinid',authadmin, (req,res,next)=>{
    try {
        axios(`http://localhost:8080/api/order/${req.params.status}`)
        .then(orderlist =>{
            orderlist = orderlist.data
            
            res.render(`admin/order-list-${req.params.status}`,{orderlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    }  

});
// admin create proudct page
router.post('/admin/createproduct/:adminid',authadmin, async(req,res)=>{
    
    const adminID =  req.params.adminid;
    const{title,price,category,description} = req.body
    const response =  await (fetch(`http://localhost:8080/api/products/addproduct/${adminID}`, 
    { 
        method: 'POST', 
        body:JSON.stringify({
            title,price,category,description
        }),
            headers: { 'Content-Type': 'application/json' } 
    }));

    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Product Created Successfully.'
        }
        res.redirect(`/admin/createproduct/${adminID}`)
    }
    if(response.status === 401){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Input.'
        }
        res.redirect(`/admin/createproduct/${adminID}`)
    }
    else if( response.status === 409){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Create.'
        }
        res.redirect(`/admin/createproduct/${adminID}`)
    }


});

// product status update by super admin
router.get("/admin/productstatusupdate/:id/:status/:shopid",authadmin, async(req,res)=>{
    const response =  await (fetch(`http://localhost:8080/api/products/productstatusupdate/${req.params.id}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
    res.redirect(`/admin/singleshop/productlist/${req.params.shopid}`)

    }
})
// product update by super admin
router.post("/admin/singleproductupdate/:id", authadmin, async(req,res)=>{
    
    const response =  await (fetch(`http://localhost:8080/api/products/updateproduct/${req.params.id}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/admin/singleproductupdate/${req.params.id}`)
    }
})

// admin profile
router.get('/admin/profile/:adminid', authadmin,(req,res)=>{
    res.render("admin/profile", {userData:req.userData})
});




// admin create proudct page
router.post('/admin/profile/:adminid',authadmin, async(req,res)=>{
    const adminID =  req.params.adminid;
    const response =  await (fetch(`http://localhost:8080/api/admin/updateadmin/${adminID}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/admin/profile/${adminID}`)
    }

});


// admn dashboard
router.get('/admin/control', authadmin, (req, res, next)=>{
    try {
        axios(`http://localhost:8080/api/order/allorders`)
        .then(orderlist =>{
            orderlist = orderlist.data
            let pendingList;
            let deliveredList;
            pendingList = orderlist.filter((item,idx)=>{
                return item.currentstatus == 'Pending' 
            })
            deliveredList = orderlist.filter((item,idx)=>{
                return item.currentstatus == 'Delivered' 
            })

            console.log("pendingList",pendingList)
            axios('http://localhost:8080/api/productimage/allproductimage')
            .then(productlist =>{
               res.render("admin/home",{productlist:productlist.data,userData:req.userData,orderlist,pendingList,deliveredList})   
            })  
        })
    } catch (error) {
        res.render("admin/home",{userData:req.userData})
    } 
    
});

// admin order list page
router.get('/admin/orders/:adminid',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
    console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/order/allorders`)
        .then(orderlist =>{
            orderlist = orderlist.data
            res.render("admin/order-list",{orderlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});

//  single order page
router.get('/admin/order/:id',authadmin,(req,res)=>{
    const orderid =  req.params.id;
    try {
        axios(`http://localhost:8080/api/order/singleorder/${orderid}`)
        .then(singleorder =>{
            singleorder = singleorder.data[0]
           // let product =  singleorder[0].orderedproduct
            console.log("singleorder",singleorder.orderedproduct)
            let totalProfit =0;
            singleorder.orderedproduct.map((item,idx)=>{
               return  totalProfit = totalProfit + ((item.price* item.amount * item.profit_percent)/100)
            })
            // console.log("total profit",totalProfit)
            res.render("admin/single-order",{singleorder,userData:req.userData,totalProfit})
        })
    } catch (error) {
        console.log(error);
    } 

});


// admin shop list page
router.get('/admin/shoplist/:adminid',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/shop/allshopsadmin`)
        .then(shoplist =>{
            console.log("all shop lists:",shoplist.data)
            shoplist = shoplist.data
            res.render("admin/shop-list",{shoplist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});


// admin pending  shop list page
router.get('/admin/shoplist/pending/:adminid',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/shop/allpendinglist`)
        .then(shoplist =>{
            shoplist = shoplist.data
            res.render("admin/shop-pending-list",{shoplist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
});
// admin blocked  shop list page
router.get('/admin/shoplist/blocked/:adminid',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/shop/allblockedlist`)
        .then(shoplist =>{
            shoplist = shoplist.data
            res.render("admin/shop-blocked-list",{shoplist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});

// all verified shop list page
router.get('/admin/shoplist/verified/:adminid',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/shop/allverifiedlist`)
        .then(shoplist =>{
            shoplist = shoplist.data
            res.render("admin/shop-verified-list",{shoplist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
});



// admin single shop page
router.get('/admin/singleshop/:shopid',authadmin, (req,res,next)=>{
    try {
        axios(`http://localhost:8080/api/shop/singleshop/${req.params.shopid}`)
        .then(singleshop =>{
            singleshop = singleshop.data
            res.render("admin/singleshop",{singleshop,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    }    
});

router.post('/admin/findsingleshop/:adminid',authadmin,(req,res,next)=>{
    try {
        console.log("req data from body",req.body)
        axios.post("http://localhost:8080/api/shop/findsingleshop",req.body)
        .then(response=>{
            console.log("response:",response.status)
            if(response.status == 404){
                res.render("admin/findsingleshop",{msg:'Data not found',userData:req.userData,bodyData:req.body})
            }else{
                res.render("admin/findsingleshop",{ShopData:response.data,userData:req.userData,bodyData:req.body})
            }
            
        })    
        .catch(err => {
            res.render("admin/findsingleshop",{msg:'Data not found',userData:req.userData,bodyData:req.body})
        })
    } catch (error) {
       //console.log("error",error)
      
    }
})
// admin single shop page
router.get('/admin/findsingleshop/:adminid',authadmin, (req,res,next)=>{
    res.render("admin/findsingleshop",{userData:req.userData}) 
});


// orderstatus update by orderid
router.get("/admin/statusupdatebyadmin/:orderid/:status", async(req,res)=>{
    const response =  await (fetch(`http://localhost:8080/api/order/orderstatusupdatebyid/${req.params.orderid}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:`Order has been ${req.params.status}`
        }
        res.redirect(`/admin/order/${req.params.orderid}`)
    }
})




//  order list by shopid in admin panel
router.get('/admin/singleshop/orderlist/:shopid',authadmin, async (req,res,next)=>{
    try {
       await axios(`http://localhost:8080/api/order/allordersbyshopid/${req.params.shopid}`)
        .then(orderlist =>{
            orderlist = orderlist.data
             axios(`http://localhost:8080/api/shop/singleshop/${req.params.shopid}`)
                    .then(singleshopdata =>{
                        singleshopdata = singleshopdata.data
                        console.log("single shop data:",singleshopdata)
                        res.render("admin/order-list",{orderlist,singleshopdata,userData:req.userData})
                    })
           
        })
    } catch (error) {
        console.log(error);
    } 
    

});

// shopstatus update
router.get('/shopstatusupdate/:id/:status',async(req,res)=>{
    const response =  await (fetch(`http://localhost:8080/api/shop/shopstatusupdate/${req.params.id}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:`Shop has been Updated`
        }
        res.redirect(`/admin/singleshop/${req.params.id}`)
    }
})

//blocked unblocked
router.get('/shopblockedunblocked/:id/:status',async(req,res)=>{
    const response =  await fetch(`http://localhost:8080/api/shop/shopblockedunblocked/${req.params.id}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log("respnse from update:",response)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:`Shop has been Updated`
        }
        res.redirect(`/admin/singleshop/${req.params.id}`)
    }
})

// shop admin product list page
router.get('/admin/singleshop/productlist/:shopid',authadmin, (req,res,next)=>{
    try {
        fetch(`http://localhost:8080/api/products/allproducts/${req.params.shopid}`)
        .then(res => res.json())
        .then(productlist =>{
            console.log("productlist:",productlist)
            res.render("admin/product-list",{productlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});

// single product update by admin 
router.get("/admin/shop/singleproductupdate/:id", authadmin, async(req,res)=>{
    try {
        fetch(`http://localhost:8080/api/products/singleproduct/${req.params.id}`)
        .then(res => res.json())
        .then(productdata =>{
            fetch(`http://localhost:8080/api/productimage/allproductimage`)
                .then(res => res.json())
                .then(allNames =>{
                let  allNamesFront = JSON.stringify(allNames)
                    res.render("admin/singleproduct",{productdata,userData:req.userData,allNamesFront,allNames})
                    
                })
            
        })
    } catch (error) {
        console.log(error);
    } 

})

// single product update by admin 
router.post("/admin/shop/singleproductupdate/:id", authadmin, async(req,res)=>{
    const response =  await (fetch(`http://localhost:8080/api/products/updateproduct/${req.params.id}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Data Updated'
        }
        res.redirect(`/admin/shop/singleproductupdate/${req.params.id}`)
    }
})



// admin shop list page
router.get('/admin/customerlist/:adminid',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/customer/allcustomers`)
        .then(customerlist =>{
            customerlist = customerlist.data
            res.render("admin/customer-list",{customerlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});


// admin single customer page
router.get('/admin/singlecustomer/:customerid',authadmin, (req,res,next)=>{
    try {
        axios(`http://localhost:8080/api/customer/singlecustomer/${req.params.customerid}`)
        .then(singlecustomer =>{
            singlecustomer = singlecustomer.data
            res.render("admin/singlecustomer",{singlecustomer,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    
});

//featured unfeatured
router.get('/shopfeaturedunfeatured/:id/:status',async(req,res)=>{
    const response =  await fetch(`http://localhost:8080/api/shop/makeshopfeaturedOrNot/${req.params.id}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log("respnse from update:",response)
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:`Shop has been Updated`
        }
        res.redirect(`/admin/singleshop/${req.params.id}`)
    }
})



// customer order list form admin page
router.get('/admin/singlecustomer/orderlist/:customerid',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
    //console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/order/allorderbyuserid/${req.params.customerid}`)
        .then(orderlist =>{
            orderlist = orderlist.data
            res.render("admin/order-list",{orderlist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 
    

});

// customer status update
router.get('/customerstatusupdate/:id/:status', async(req,res)=>{
    const response =  await (fetch(`http://localhost:8080/api/customer/updatecustomerstatus/${req.params.id}/${req.params.status}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    }));
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:`customer data has been Updated`
        }
        res.redirect(`/admin/singlecustomer/${req.params.id}`)
    }
})
//  REPORT=============================

// admin report shop list
router.get('/admin/areawiseshop/:adminid',authadmin, (req,res,next)=>{
    try {
        axios('http://localhost:8080/api/city/allcitywitharea')
        .then(data =>{
            let PreData = data.data;
            PreData = JSON.stringify(PreData)
            //console.log("city data:",data)
           const distinctData =  [...new Set(data.data.map(x=>x.city))];
           res.render("admin/report/report-list",{data:data.data,distinctData,userData:req.userData,PreData})
        })
    } catch (error) {
        console.log(error)
    }
    

});

router.post('/admin/areawiseshop/:adminid',authadmin, (req,res)=>{
    try {
        const adminID =  req.params.adminid;
        
        axios.post("http://localhost:8080/api/shop/allshops/report",req.body)
           .then(response =>{
            axios('http://localhost:8080/api/city/allcitywitharea')
            .then(data =>{
                let PreData = data.data;
                PreData = JSON.stringify(PreData)
                //console.log("city data:",data)
               const distinctData =  [...new Set(data.data.map(x=>x.city))];
               res.render("admin/report/report-list",{ShopData:response.data,distinctData,userData:req.userData,PreData,bodyData:req.body})
            })
           })
           .catch(err => console.log(err))
    } catch (error) {
       console.log("error",error)
    }
   


    // const response =  await (fetch(`http://localhost:8080/api/shop//allshops/report`, 
    // { 
    //     method: 'POST', 
    //     body: JSON.stringify(req.body),
    //     headers: { 'Content-Type': 'application/json' }
    // }));
    // console.log("response for report from front", response.body)
    // if(response.status === 200){
    //     res.render("admin/report/report-list",{data:response})
    // }

});

// admin report order list
router.get('/admin/areawiseorder/:adminid',authadmin, (req,res,next)=>{
    try {
        axios('http://localhost:8080/api/city/allcitywitharea')
        .then(data =>{
            let PreData = data.data;
            PreData = JSON.stringify(PreData)
            //console.log("city data:",data)
           const distinctData =  [...new Set(data.data.map(x=>x.city))];
           res.render("admin/report/report-list-order",{data:data.data,distinctData,userData:req.userData,PreData})
        })
    } catch (error) {
        console.log(error)
    }
});

router.post('/admin/areawiseorder/:adminid',authadmin, (req,res)=>{
    try {
        const adminID =  req.params.adminid;
        console.log("req data from body",req.body)
        axios.post("http://localhost:8080/api/order/allorders/report",req.body)
           .then(response =>{
            console.log("response:",response)
            axios('http://localhost:8080/api/city/allcitywitharea')
            .then(data =>{
                let PreData = data.data;
                PreData = JSON.stringify(PreData)
                //console.log("city data:",data)
               const distinctData =  [...new Set(data.data.map(x=>x.city))];
               res.render("admin/report/report-list-order",{OrderData:response.data,distinctData,userData:req.userData,PreData,bodyData:req.body})
            })
           })
           .catch(err => console.log(err))
    } catch (error) {
       console.log("error",error)
    }
});



// admin report order list by payment method
router.get('/admin/paymentwiseorder/:adminid',authadmin, (req,res,next)=>{
    try {
        axios('http://localhost:8080/api/city/allcitywitharea')
        .then(data =>{
            let PreData = data.data;
            PreData = JSON.stringify(PreData)
            //console.log("city data:",data)
           const distinctData =  [...new Set(data.data.map(x=>x.city))];
           res.render("admin/report/report-list-order-paymentmethod",{data:data.data,distinctData,userData:req.userData,PreData})
        })
    } catch (error) {
        console.log(error)
    }
    

});

router.post('/admin/paymentwiseorder/:adminid',authadmin, (req,res)=>{
    try {
        const adminID =  req.params.adminid;
        console.log("req data from body",req.body)
        axios.post("http://localhost:8080/api/order/report/payment",req.body)
           .then(response =>{
            console.log("response:",response)
            axios('http://localhost:8080/api/city/allcitywitharea')
            .then(data =>{
                let PreData = data.data;
                PreData = JSON.stringify(PreData)
                //console.log("city data:",data)
               const distinctData =  [...new Set(data.data.map(x=>x.city))];
               res.render("admin/report/report-list-order-paymentmethod",{OrderData:response.data,distinctData,userData:req.userData,PreData,bodyData:req.body})
            })
           })
           .catch(err => console.log(err))
    } catch (error) {
       console.log("error",error)
    }
});


// admin report best seller 
router.get('/admin/bestseller/:adminid',authadmin, (req,res,next)=>{
    try {
        axios('http://localhost:8080/api/city/allcitywitharea')
        .then(data =>{
            let PreData = data.data;
            PreData = JSON.stringify(PreData)
            //console.log("city data:",data)
           const distinctData =  [...new Set(data.data.map(x=>x.city))];
           res.render("admin/report/report-list-best-shop",{data:data.data,distinctData,userData:req.userData,PreData})
        })
    } catch (error) {
        console.log(error)
    }

});

router.post('/admin/bestseller/:adminid',authadmin, (req,res)=>{
    try {
        const adminID =  req.params.adminid;
        console.log("req data from body",req.body)
        axios.post("http://localhost:8080/api/order/report/bestseller",req.body)
           .then(response =>{
            axios('http://localhost:8080/api/city/allcitywitharea')
            .then(data =>{
                let PreData = data.data;
                PreData = JSON.stringify(PreData)
                //console.log("city data:",data)
               const distinctData =  [...new Set(data.data.map(x=>x.city))];
               res.render("admin/report/report-list-best-shop",{ShopData:response.data,distinctData,userData:req.userData,PreData,bodyData:req.body})
            })
           })
           .catch(err => console.log(err))
    } catch (error) {
       console.log("error",error)
    }
});



// admin shop list for promotion
router.get('/admin/promotion/:adminid',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/discount/getalldiscount`)
        .then(discountlist =>{
            
            discountlist = discountlist.data
            axios(`http://localhost:8080/api/shop/allverifiedlist`)
            .then(shoplist =>{
                shoplist = shoplist.data
                res.render("admin/list-promotion",{discountlist,userData:req.userData,shoplist})
            })
            
        })
    } catch (error) {
        console.log(error);
    } 

});


router.post("/admin/createnewpromotion", authadmin, async(req,res)=>{
    console.log("req body data:",req.body)
    
    const response =  await fetch(`http://localhost:8080/api/discount/adddiscount`, 
    { 
        method: 'POST', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'New Promotion created'
        }
        res.redirect(`/admin/promotion/${req.userData.id}`)
    }
    if(response.status === 403){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Data already exist!!'
        }
        res.redirect(`/admin/promotion/${req.userData.id}`)
    }

})

// single promtion update
router.post("/admin/updatepromotion", authadmin, async(req,res)=>{
    
    const response =  await fetch(`http://localhost:8080/api/discount/updaesinglediscount/${req.body.nameid}`, 
    { 
        method: 'PUT', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'Promotion Updated'
        }
        res.redirect(`/admin/promotion/${req.userData.id}`)
    }
    if(response.status === 400){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Invalid Data!!'
        }
        res.redirect(`/admin/promotion/${req.userData.id}`)
    }

})
// add user to promotion
router.post("/admin/addusertopromotion", authadmin, async(req,res)=>{
    
    const response =  await fetch(`http://localhost:8080/api/discount/adduserdiscount`, 
    { 
        method: 'POST', 
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 200){
        req.session.message={
            type:'alert-success',
            intro:'Created!',
            message:'New User added'
        }
        res.redirect(`/admin/promotion/${req.userData.id}`)
    }
    if(response.status === 403){
        req.session.message={
            type:'alert-danger',
            intro:'Created!',
            message:'Data already exist!!'
        }
        res.redirect(`/admin/promotion/${req.userData.id}`)
    }

})

// admin user list for promotion a particular promotion
router.get('/admin/promotion/users/:discount_id',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
   // console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/discount//getallusersbydiscountid/${req.params.discount_id}/shop`)
        .then(shoplist =>{
            shoplist = shoplist.data
            res.render("admin/shop-list-promotion",{shoplist,userData:req.userData})
        })
    } catch (error) {
        console.log(error);
    } 

});

// order list by discount id and shop id
router.get('/admin/promotion/order/:discount_id',authadmin, (req,res,next)=>{
    //const adminid =  req.params.adminid
    //console.log(req.userData)
    try {
        axios(`http://localhost:8080/api/order/getallordersbydiscountid/${req.params.discount_id}`)
        .then(orderlist =>{
            orderlist = orderlist.data
            res.render("admin/order-list",{orderlist,userData:req.userData})
        })
    } catch (error) {
        res.render("admin/order-list",{userData:req.userData})
        console.log(error);
    } 
    

});
//---------------------------------------------------------- admin section end ---------------------------------------------------------------------
// ===========================================================doorlaundry end ============================================================================














// ================================Blog Start=========================================================
// Blog-list
router.get('/admin/blog-list',(req,res)=>{
    res.render("admin/blog/blog-list")
});

// Blog-list-pending
router.get('/admin/pending-blog',(req,res)=>{
    res.render("admin/blog/pending-blog")
});
// Blog-details
router.get('/admin/blog-details/:id',(req,res)=>{
    res.render("admin/blog/blog-details")
});
// Blog-add
router.get('/admin/add-blog',(req,res)=>{
    res.render("admin/blog/add-blog")
});
// Edit blog
router.get('/admin/edit-blog/:id',(req,res)=>{
    res.render("admin/blog/edit-blog")
});
module.exports =  router;