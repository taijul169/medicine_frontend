const hbs = require("hbs");
const { handlebars } = require("hbs");
const { all } = require("../routes/control");
// accpet/reject/pending
hbs.registerHelper("OrderProgress",(status)=>{
    console.log(status)
  
    if(status == 'Pending'){
      return new handlebars.SafeString(`<div class="step active"> <span class="icon"> <i class="fa fa-spinner"></i> </span> <span
      class="text"> Pending </span> </div>
        <div class="step "> <span class="icon"> <i class="fa fa-check"></i> </span> <span
            class="text">Order confirmed</span> </div>
        <div class="step "> <span class="icon"> <i class="fa fa-user"></i> </span> <span
            class="text"> Picked by courier</span> </div>

        <div class="step"> <span class="icon"> <i class="fa fa-check-circle"></i> </span> <span
            class="text">Delivered</span> </div>`)
    }
    if(status == 'Received'){
        return new handlebars.SafeString(`<div class="step active"> <span class="icon"> <i class="fa fa-spinner"></i> </span> <span
        class="text"> Pending </span> </div>
          <div class="step active"> <span class="icon"> <i class="fa fa-check"></i> </span> <span
              class="text">Order confirmed</span> </div>
          <div class="step "> <span class="icon"> <i class="fa fa-user"></i> </span> <span
              class="text"> Picked by courier</span> </div>
  
          <div class="step"> <span class="icon"> <i class="fa fa-check-circle"></i> </span> <span
              class="text">Delivered</span> </div>`)
      }
      if(status == 'Pickedup'){
        return new handlebars.SafeString(`<div class="step active"> <span class="icon"> <i class="fa fa-spinner"></i> </span> <span
        class="text"> Pending </span> </div>
          <div class="step active"> <span class="icon"> <i class="fa fa-check"></i> </span> <span
              class="text">Order confirmed</span> </div>
          <div class="step active"> <span class="icon"> <i class="fa fa-user"></i> </span> <span
              class="text"> Picked by courier</span> </div>
  
          <div class="step"> <span class="icon"> <i class="fa fa-check-circle"></i> </span> <span
              class="text">Delivered</span> </div>`)
      }
      if(status == 'Delivered'){
        return new handlebars.SafeString(`<div class="step active"> <span class="icon"> <i class="fa fa-spinner"></i> </span> <span
        class="text"> Pending </span> </div>
          <div class="step active"> <span class="icon"> <i class="fa fa-check"></i> </span> <span
              class="text">Order confirmed</span> </div>
          <div class="step active"> <span class="icon"> <i class="fa fa-user"></i> </span> <span
              class="text"> Picked by courier</span> </div>
  
          <div class="step active"> <span class="icon"> <i class="fa fa-check-circle"></i> </span> <span
              class="text">Delivered</span> </div>`)
      }
      if(status == 'ReadyToDelivered'){
        return new handlebars.SafeString(`<div class="step active"> <span class="icon"> <i class="fa fa-spinner"></i> </span> <span
        class="text"> Pending </span> </div>
          <div class="step active"> <span class="icon"> <i class="fa fa-check"></i> </span> <span
              class="text">Order confirmed</span> </div>
          <div class="step active"> <span class="icon"> <i class="fa fa-user"></i> </span> <span
              class="text"> Picked by courier</span> </div>
          <div class="step active"> <span class="icon"> <i class="fa fa-user"></i> </span> <span
              class="text">ReadyToDelivered</span> </div>
          <div class="step"> <span class="icon"> <i class="fa fa-check-circle"></i> </span> <span
              class="text">Delivered</span> </div>`)
      }
    else{
      return new handlebars.SafeString(`<div class="step active"> <span class="icon"> <i class="fa fa-check-circle"></i> </span> <span
      class="text">Cancelled</span> </div>`)
    }
  
  
  })


  hbs.registerHelper('commonheaderadmin',(data)=>{
      return new handlebars.SafeString(`

      <div class="container-fluid g-0">
      <div class="row">
          <div class="col-lg-12 p-0">
              <div class="header_iner d-flex justify-content-between align-items-center">
                  <div class="sidebar_icon d-lg-none">
                      <i class="ti-menu"></i>
                  </div>
                  <div class="serach_field-area">
                      <div class="search_inner">
                          <form action="#">
                              <div class="search_field">
                                  <input type="text" placeholder="Search here...">
                              </div>
                              <button type="submit"> <img src="img/icon/icon_search.svg" alt=""> </button>
                          </form>
                      </div>
                  </div>
                  <div class="header_right d-flex justify-content-between align-items-center">
                      <div class="header_notification_warp d-flex align-items-center">
                          <li>
                              <a href="#"> <img src="img/icon/bell.svg" alt=""> </a>
                          </li>
                          <li>
                              <a href="#"> <img src="img/icon/msg.svg" alt=""> </a>
                          </li>
                      </div>
                      <div class="profile_info">
                          <img src="${data.image}" alt="#">
                          <div class="profile_info_iner">
                              <p>Welcome Admin!</p>
                              <h5>${data.firstname}</h5>
                              <div class="profile_info_details">
                                  <a href="/admin/profile">My Profile <i class="ti-user"></i></a>
                                  <a href="/#"  data-bs-toggle="modal" data-bs-target="#exampleModal">Log Out <i class="ti-shift-left"></i></a>
                              </div>
                             
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
      `)
  })
  hbs.registerHelper('deliveredOrNot',(status,id)=>{
      console.log("data",status,id)
      if(status == 'Pending'){
        return new handlebars.SafeString(`<a href="/admin/updateorderstatus/Delivered/${id}" class="btn btn-secondary">Make It Delivered</a>`)  
      }
  })


// pagination
hbs.registerHelper("ShopPagination",(totalPages)=>{
    console.log("totalPages:",totalPages)
    let Wrapper = '';
    for(let i=1;i<totalPages;i++){
        Wrapper = Wrapper + `<li class="page-item" onclick="myFunc(${i})" ><a class="page-link">${i+1}</a></li>`
    }
    return new handlebars.SafeString(Wrapper)  


    // if(star === 5){
    //     for(let x=0;x<star;x++){
    //         Wrapper = Wrapper + '<span class="fa fa-star checked"></span>'
    //        } 
    //   return new handlebars.SafeString(Wrapper)     
    // }
    // if(star === 0 || star <1){
    //     for(let x=0;x<5;x++){
    //         Wrapper = Wrapper + '<span class="fa fa-star "></span>'
    //        }
    //   return new handlebars.SafeString(Wrapper)      
    // }else{
        
    // }
    
   })

// star rating on shops
hbs.registerHelper("StarRating",(star_data)=>{
    let star =  Math.round(star_data)
    let Wrapper = '';
    for(let x=0;x<star;x++){
        Wrapper = Wrapper + '<span class="fa fa-star checked"></span>'
       }
    for(let i=0;i<5-star;i++){
        
        Wrapper = Wrapper + '<span class="fa fa-star"></span>'
    }
    return new handlebars.SafeString(Wrapper)  
    // if(star === 5){
    //     for(let x=0;x<star;x++){
    //         Wrapper = Wrapper + '<span class="fa fa-star checked"></span>'
    //        } 
    //   return new handlebars.SafeString(Wrapper)     
    // }
    // if(star === 0 || star <1){
    //     for(let x=0;x<5;x++){
    //         Wrapper = Wrapper + '<span class="fa fa-star "></span>'
    //        }
    //   return new handlebars.SafeString(Wrapper)      
    // }else{
        
    // }
    
   
     
   })


// todays appointment list
hbs.registerHelper("productImageGet",(data)=>{
   console.log("produc image data:",data)
    
  })
// accpet/reject/pending
hbs.registerHelper("globalActiveInactive",(status)=>{
    if(status == true){
      return new handlebars.SafeString(`<span class="btn btn-success" style="width:120px"><i
      class="fa fa-check-circle" aria-hidden="true"></i>active</span>`)
    }
    else{
      return new handlebars.SafeString(`<span  class="btn btn-warning " style="width:120px"><i class="fa fa-ban" aria-hidden="true"></i>Deactivated</span>`)
    }
  
  
  })
  hbs.registerHelper("globalActiveInactiveCustomer",(status)=>{
    if(status == true){
      return new handlebars.SafeString(`<span class="badge rounded-pill bg-success" style="width:80px;padding:5px">Active</span>`)
    }
    else{
      return new handlebars.SafeString(`<span class="badge rounded-pill bg-danger" style="width:80px;padding:5px">Deactivated</span>`)
    }
  
  
  })
// accpet/reject/pending
hbs.registerHelper("statusDisplayAdmin",(status)=>{
    console.log(status)
  
    if(status == true){
      return new handlebars.SafeString(`<a class="btn btn-success px-5"><i
      class="fa fa-check-circle" aria-hidden="true"></i>Verified</a>`)
    }
    else{
      return new handlebars.SafeString(`<a  class="btn btn-warning px-5"><i class="fa fa-ban" aria-hidden="true"></i>Blocked</a>`)
    }
  
  
  })
hbs.registerHelper("areastatusDisplayAdmin",(status,id)=>{
  
    if(status == true){
      return new handlebars.SafeString(`<a href="/admin/area/citystatusupdate/${id}/0" class="btn btn-md bg-success-light" style="width:100px">Active</a>`)
    }
    else{
      return new handlebars.SafeString(`<a href="/admin/area/citystatusupdate/${id}/1" class="btn btn-md bg-danger-light" style="width:100px">Deactivated</a>`)
    }
})

// server active inactive status display
hbs.registerHelper("servicestatusDisplayAdmin",(status,id)=>{
  
    if(status == true){
      return new handlebars.SafeString(`<a href="/admin/service/servicestatusupdate/${id}/0" class="btn btn-md bg-success-light" style="width:100px">Active</a>`)
    }
    else{
      return new handlebars.SafeString(`<a href="/admin/service/servicestatusupdate/${id}/1" class="btn btn-md bg-danger-light" style="width:100px">Deactivated</a>`)
    }
  })
  // header for courier 
hbs.registerHelper("courierHeader",(userData)=>{
    //console.log(courierid)
  
    return new handlebars.SafeString(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
        <title>doorlaunder</title>
        <link rel="shortcut icon" href="/assets_old/img/logo_only_icon.png">
        <link rel="stylesheet" href="/assets_old/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
        {{!-- <link rel="stylesheet" href="/assets_old/css/admin/feather.css"> --}}
        <!-- choose one -->
        {{!-- <script src="https://unpkg.com/feather-icons"></script> --}}
        {{!-- datatables --}}
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.min.css">
        <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.3.2/css/buttons.dataTables.min.css">

        <link rel="stylesheet" href="/assets_old/plugins/select2/admin/css/select2.min.css">
        <link rel="stylesheet" href="/assets_old/plugins/owl-carousel/owl.carousel.min.css">
        <link rel="stylesheet" href="/assets_old/plugins/daterangepicker/daterangepicker.css">
        <link rel="stylesheet" href="/assets_old/css/admin.css">
        <link rel="stylesheet" href="/assets_old/css/custom.css">
    </head>
    
    <body>
    
    <body class="account-page">
           <div class="main-wrapper">
    
            <div class="header">
    
                <div class="header-left">
                    <a href="" class="logo">
                        <img src="/assets_old/img/logo.png" alt="Logo">
                    </a>
                    <a href="" class="logo logo-small">
                        <img src="/assets_old/img/logo.png" alt="Logo" width="30" height="30">
                    </a>
                    <a href="javascript:void(0);" id="toggle_btn">
                        <i class="feather-chevrons-left"></i>
                    </a>
                </div>
    
                <a class="mobile_btn" id="mobile_btn">
                    <i class="fas fa-bars"></i>
                </a>
                <ul class="nav nav-tabs user-menu">
                    <li class="nav-item dropdown main-drop">
                        <a href="#" class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                            <span class="user-img">
                                
                                <i class="fa fa-user-circle" aria-hidden="true" style="font-size:30px;margin-top:5px"></i>
                                <span class="status online"></span>
                            </span>
                        </a>
                        <div class="dropdown-menu">
                            <div class="user-header">
                                <div class="avatar avatar-sm">
                                    <img src="${userData.photo}" alt="User Image"
                                        class="avatar-img rounded-circle" onerror="this.onerror=null; this.src='/assets_old/img/default.jpg'">
                                </div>
                                <div class="user-text">
                                    <h6>${userData.name}</h6>
                                    <p class="text-muted mb-0">Administrator</p>
                                </div>
                            </div>
                            <a class="dropdown-item" href="/courier/profile/${userData.id}"><i class="fa fa-user-circle-o" aria-hidden="true"></i> My Profile</a>
                            
                            <hr class="my-0 ms-2 me-2">
                            <a class="dropdown-item" href="/courierlogout"><i class="feather-log-out me-1"></i> Logout</a>
                        </div>
                    </li>
    
                </ul>
    
            </div>
    `)
  
  
  })
// accpet/reject/pending
hbs.registerHelper("verifyornot",(status)=>{
    console.log(status)
  
    if(status == true){
      return new handlebars.SafeString(`<img width="60px" src="/assets_old/img/verify.png" alt="">`)
    }
    else{
      return new handlebars.SafeString(`<span class="btn btn-md bg-danger-light">Pending</span>`)
    }
  
  })
// accpet/reject/pending
hbs.registerHelper("featuredornot",(status)=>{
    console.log(status)
  
    if(status == true){
      return new handlebars.SafeString(`<img width="60px" src="/assets_old/img/featured.jpg" alt="">`)
    }
    else{
      return new handlebars.SafeString(`<span class="btn btn-md bg-danger-light">Not Featured</span>`)
    }
  
})

// block unblock
hbs.registerHelper("shopblockunblock",(status)=>{
    console.log(status)
  
    if(status === true){
      return new handlebars.SafeString(`<span class="btn btn-md bg-success-light">Opned</span>`)
    }
    else{
      return new handlebars.SafeString(`<span class="btn btn-md bg-danger-light">Blocked</span>`)
    }
  
  })
// accpet/reject/pending
hbs.registerHelper("statusDisplay",(status)=>{
  
  if(status == 'Received'){
    return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-sm bg-default-light ">
    <i class="fas fa-check"></i> ${status}
    </a>`)
  }
  if(status == 'Verified'){
    return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-success ">
    <i class="fas fa-check"></i> ${status}
    </a>`)
  }
  else if(status == 'Delivered'){
    return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-success btn-sm">
    <i class="fas fa-check"></i> ${status}
    </a> `)
  }
  else if(status == 'Canceled' || status == 'Cancelled'){
    return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
    <i class="fas fa-times"></i> ${status}
    </a> `)
  }
  else if(status == 'Pickedup'){
    return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-sm bg-purple-light">
    <i class="fas fa-check"></i> ${status}
    </a> `)
  }
  else{
    return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-info btn-sm">
    <i class="far fa-eye"></i> Pending
    </a>`)
  }


})

// payment status display
hbs.registerHelper("paymentstatusDisplay",(status)=>{
  
    if(status === 1){
      return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-sm bg-default-light">
      <i class="fas fa-check"></i>Done
      </a>`)
    }
    else{
      return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-sm bg-warning-light">
      <i class="far fa-eye"></i> Pending
      </a>`)
    }
  
  
  })
// shopstatus display to admin panel
hbs.registerHelper("shopverifiedornot",(status)=>{
  
    if(status == true){
      return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-sm bg-success-light">
      <i class="fas fa-check"></i>Verified
      </a>`)
    }

    else{
      return new handlebars.SafeString(`<a href="javascript:void(0);" class="btn btn-sm bg-danger-light">
      <i class="far fa-eye"></i> Pending
      </a>`)
    }
  
  
  })

hbs.registerHelper("notificationWrapper",()=>{
    return new handlebars.SafeString(`
    <div class="toast-container custom-toaster-container" id="messagearea">
   </div>`)
  
})

// makeFavUnFav
hbs.registerHelper("makeFavUnFav",(allFavList,docId,PatientID)=>{
    console.log("docId",docId)
    if(allFavList.length>0){
        for(var i = 0;i<allFavList.length;i++){
             
            if(allFavList[i].DocNurID == docId){
                console.log("matched!")
               return new handlebars.SafeString(`<a href="/makeunfavourite/${PatientID}/${docId}">
               <i class="far fa-bookmark bg-danger p-1" style="color: #FFFFFF;" title="Remove favourite"></i>
             </a>`)
            }
            else{
              return new handlebars.SafeString(`<a href="/makefavourite/${PatientID}/${docId}">
              <i class="far fa-bookmark p-1" title="Add to Favourite"></i>
            </a>`)
            }
          }
    }
    else{
        return new handlebars.SafeString(`<a href="/makefavourite/${PatientID}/${docId}">
              <i class="far fa-bookmark p-1" title="Add to Favourite"></i>
            </a>`)
    }
  


})
// department name display
hbs.registerHelper("departmentNameDisplay",(allDepartment, singleDepartmentID)=>{
    for(var i = 0;i<allDepartment.length;i++){

      if(allDepartment[i].Dept_ID == singleDepartmentID){
          
         // return allDepartment[i].name;
         return new handlebars.SafeString(`<h5 class="doc-department"><img
         src="${allDepartment[i].Photo}" class="img-fluid"
         alt="Speciality">${allDepartment[i].name}</h5> `)
      }
    }

    // return new handlebars.SafeString(a)
})


// department name display
hbs.registerHelper("activedeactiveControl",(id, status,shopid)=>{

      //console.log(status)
      if(status == 1){
          
         // return allDepartment[i].name;
         return new handlebars.SafeString(`<a href="/shop/productstatusupdate/${id}/0/${shopid}" class="badge rounded-pill bg-success text-dark" style="width:100px">Active</a>`)
      }
      else{
           // return allDepartment[i].name;
         return new handlebars.SafeString(`<a href="/shop/productstatusupdate/${id}/1/${shopid}" class="badge rounded-pill bg-danger" style="width:100px">Deactivated</a>`)
      }
  
})

// department name display
hbs.registerHelper("activedeactiveControlAdmin",(id, status,shopid)=>{

    //console.log(status)
    if(status == 1){
        
       // return allDepartment[i].name;
       return new handlebars.SafeString(`<a href="/admin/productstatusupdate/${id}/0/${shopid}" class="badge rounded-pill bg-success text-dark" style="width:100px">Active</a>`)
    }
    else{
         // return allDepartment[i].name;
       return new handlebars.SafeString(`<a href="/admin/productstatusupdate/${id}/1/${shopid}" class="badge rounded-pill bg-danger" style="width:100px">Deactivated</a>`)
    }

})



// singnle shop data display in order list area
hbs.registerHelper("singleshopdata",(shopData)=>{
  if(shopData){
      return new handlebars.SafeString(`<div class="card w-50">
      <div class="card-header">
          <h4>${shopData.name}</h4>
      </div>
      <div class="card-body">
          <table class="table">
           
              <tbody>
                   <tr>
                      <th scope="col">ID</th>
                      <th scope="col">${shopData.id}</th>
                  </tr>
                  <tr>
                      <th scope="row">Phone</th>
                      <td>${shopData.phone}</td>
                     
                  </tr>
                  <tr>
                      <th scope="row">Address</th>
                      <td>${shopData.address}</td>
                     
                  </tr>
                  <tr>
                      <th scope="row">Owner Name</th>
                      <td>${shopData.ownername}</td>
                      
                  </tr>
              </tbody>
          </table>

         
      </div>
  </div>`)
  }
})

hbs.registerHelper("reviewShow",(length)=>{
    var rating = Math.round(length)
    var a = '';
    for(var i = 0;i<rating;i++){

        a = a + '<i class="fas fa-star filled"></i>'; 
    }

    return new handlebars.SafeString(a)
})


// order status 
hbs.registerHelper("orderstatus",(orderid,status,user_id)=>{
    if(status =='Received'){
        return new handlebars.SafeString(`
        <li><a class="dropdown-item"   href="/admin/statusupdate/${orderid}/ReadyToDelivered/${user_id}">ReadyToDelivered</a>
        </li>
        `)
    } 
    if(status =='ReadyToDelivered'){
        return new handlebars.SafeString(`
        <li><a class="dropdown-item"   href="/admin/statusupdate/${orderid}/Delivered/${user_id}">Delivered</a>
        </li>
        `)
    } 
    if(status == '' || status == null || status =='Pending'){
        return new handlebars.SafeString(`
        <li><a class="dropdown-item" 
                data-bs-toggle="modal" data-bs-target="#pickupmodal"
                href="/admin/statusupdate/${orderid}/Received/${user_id}">Received</a></li>
        <li><a class="dropdown-item"  data-bs-toggle="modal" data-bs-target="#cancelpmodal"
                href="/admin/statusupdate/${orderid}/Cancelled/${user_id}">Cancelled</a></li>
        `)
    }
    if(status == 'Delivered'){
        return new handlebars.SafeString(`
        <li class="text-danger p-2">Order has been already Deliverd</li>
       
        `)
    }
    if(status == 'Pickedup'){
        return new handlebars.SafeString(`
        <li><a class="dropdown-item"   href="/admin/statusupdate/${orderid}/Delivered/${user_id}">Delivered</a>
        </li>
       
        `)
    }
    else{
        return new handlebars.SafeString(`
        <li class="text-danger p-2">Order has been already cancelled</li>
       
        `)
    }

   
})

// order status 
hbs.registerHelper("discountDisplay",(status,discount_percent)=>{
    if(status ===  true){
        return new handlebars.SafeString(`
        <div class="discount-on-product shadow-sm">
            <span>Off: ${discount_percent}%</span>
        </div>
       
        `)
    }

})
// order status 
hbs.registerHelper("orderstatusbycourier",(orderid,status,user_id)=>{
    if(status =='Received'){
        return new handlebars.SafeString(`
        <li><a class="dropdown-item" onclick="orderStatusChange()"  href="/courier/statusupdate/${orderid}/Pickedup/${user_id}">Pickedup</a>
        </li>
        <li><a class="dropdown-item" onclick="orderStatusChange()"  href="/courier/statusupdate/${orderid}/Delivered/${user_id}">Delivered</a>
        </li>
        `)
    } 
    if(status == '' || status == null || status =='Pending'){
        return new handlebars.SafeString(`
        <li><a class="dropdown-item" onclick="orderStatusChange()"
                data-bs-toggle="modal" data-bs-target="#pickupmodal"
                href="/courier/statusupdate/${orderid}/Received/${user_id}">Received</a></li>
        <li><a class="dropdown-item" onclick="orderStatusChange()" data-bs-toggle="modal" data-bs-target="#cancelpmodal"
                href="/courier/statusupdate/${orderid}/Canceled/${user_id}">Canceled</a></li>
        `)
    }
    if(status == 'Delivered'){
        return new handlebars.SafeString(`
        <li class="text-danger p-2">Order has been already Deliverd</li>
       
        `)
    }
    if(status == 'Pickedup'){
        return new handlebars.SafeString(`
        <li><a class="dropdown-item" onclick="orderStatusChange()"  href="/courier/statusupdate/${orderid}/Delivered/${user_id}">Delivered</a>
        </li>
       
        `)
    }
    else{
        return new handlebars.SafeString(`
        <li class="text-danger p-2">Order has been already cancelled</li>
       
        `)
    }

   
})
// courier control
hbs.registerHelper("couriercontrollnav",(courierid)=>{
   

    return new handlebars.SafeString(`
    <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
            <ul>
                <li class="menu-title"><span>Main</span></li>
                <li class="active">
                    <a href="/courier/control"><i class="fa fa-tachometer" aria-hidden="true"></i> <span>Dashboard</span></a>
                </li>
                <li>
                    <a href="/courier/orders/${courierid}"><i class="fa fa-list-ul" aria-hidden="true"></i>
                        <span>Orders</span></a>
                </li>
                <li class="menu-title">
                    <span>Others</span>
                </li>
                <li class="submenu d-none">
                    <a href="/courier/createboy/${courierid}"><i class="feather-grid"></i> <span>Delivery</span> <span
                            class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="/courier/createcourier/${courierid}">Create Courier</a></li>
                        <li><a href="/courier/courierlist/${courierid}">Courier list</a></li>
                       
                    </ul>
                </li>
             
                <li>
                    <a href="/courier/profile/${courierid}"><i class="feather-user"></i> <span>Profile</span></a>
                </li>
                
            </ul>
        </div>
    </div>
</div>
    `)
})
// shop control
hbs.registerHelper("shopcontrollnav",(shopid)=>{
   
    return new handlebars.SafeString(`
    <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
            <ul>
                <li class="menu-title"><span>Main</span></li>
                <li >
                    <a href="/shop/control"><i class="fa fa-tachometer" aria-hidden="true"></i> <span>Dashboard</span></a>
                </li>
                <li>
                    <a href="/shop/orders/${shopid}"><i class="fa fa-list-ul" aria-hidden="true"></i>
                        <span>Orders</span></a>
                </li>
                <li>
                    <a href="/shop/products/${shopid}"><i class="fa fa-list" aria-hidden="true"></i> <span>Prouducts</span></a>
                </li>
                 <li>
                    <a href="/shop/createproduct/${shopid}"><i class="fa fa-plus-circle" aria-hidden="true"></i> <span>Create Product</span></a>
                </li>
                <li class="menu-title">
                    <span>Others</span>
                </li>
                <li class="submenu">
                    <a href="/shop/createboy/${shopid}"><i class="fa fa-users" aria-hidden="true"></i> <span>Delivery</span> <span><i class="fa fa-chevron-down" aria-hidden="true"></i></span></a>
                    <ul>
                        <li><a href="/shop/createcourier/${shopid}"><i class="fa fa-plus-circle" aria-hidden="true"></i> Create Courier</a></li>
                        <li><a href="/shop/courierlist/${shopid}"><i class="fa fa-list" aria-hidden="true"></i> Courier list</a></li>
                       
                    </ul>
                </li>
                <li class="submenu">
                <a href="#"><i class="fa fa-flag-checkered" aria-hidden="true"></i> <span>Report</span></a>
                    <ul>
                        <li><a href="/shop/datewiseorder/${shopid}"><i class="fa fa-list-ul" aria-hidden="true"></i>Date wise Order</a></li>
                        
                        <li><a href="/shop/bestcustomer/${shopid}"><i class="fa fa-list-ul" aria-hidden="true"></i>Best Customer</a></li>
                    </ul>
             
               </li>
               <li>
                  <a href="/shop/promotion/${shopid}"><i class="fa fa-handshake" aria-hidden="true"></i><span>Promotion</span></a>
               </li>
               <li>
                  <a href="/shop/mycustomer/${shopid}"><i class="fa fa-handshake" aria-hidden="true"></i><span>My Customer</span></a>
               </li>
                <li>
                    <a href="/shop/profile/${shopid}"><i class="fa fa-user-md" aria-hidden="true"></i> <span>Profile</span></a>
                </li>
                
            </ul>
        </div>
    </div>
</div>
    `)
})
hbs.registerHelper("admincontrollnav",(adminid)=>{
   
    return new handlebars.SafeString(`
    <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
            <ul>
                <li class="menu-title"><span>Main</span></li>
                <li class="active">
                    <a href="/admin/control"><i class="fa fa-tachometer" aria-hidden="true"></i> <span>Dashboard</span></a>
                </li>
                <li>
                    <a href="/admin/orders/${adminid}"><i class="fa fa-list-ul" aria-hidden="true"></i>
                        <span>Orders</span></a>
                </li>
               
                <li class="submenu">
                <a href="#"><i class="fa fa-list" aria-hidden="true"></i><span> Shop</span> <span><i class="fa fa-chevron-down" aria-hidden="true"></i></span></a>
                <ul>
                    <li><a href="/admin/shoplist/${adminid}"><i class="fa fa-list" aria-hidden="true"></i> <span>All Shops</span></a></li>
                    <li><a href="/admin/shoplist/pending/${adminid}"><i class="fa fa-list" aria-hidden="true"></i> Pending List</a></li>
                    <li><a href="/admin/shoplist/blocked/${adminid}"><i class="fa fa-list" aria-hidden="true"></i> Blocked List</a></li>
                    <li><a href="/admin/findsingleshop/${adminid}"><i class="fa fa-plus-circle" aria-hidden="true"></i> Find Single Shop</a></li>
                    <li><a href="/admin/createshop/${adminid}"><i class="fa fa-plus-circle" aria-hidden="true"></i> Create shop</a></li>
                   
                </ul>
              </li>
                <li>
                  <a href="/admin/area/${adminid}"><i class="fa fa-street-view" aria-hidden="true"></i>
                  <span>Area</span></a>
                </li>
                 <li>
                  <a href="/admin/productnamelist/${adminid}"><i class="fa fa-list-ul" aria-hidden="true"></i>
                  <span>Services</span></a>
                 </li>
                <li class="menu-title">
                    <span>Blog</span>
                </li>
                <li class="submenu">
                <a href="#"><i class="fa fa-user" aria-hidden="true"></i></i> <span>Customer</span> </a>
                <ul>
                    <li><a href="/admin/customerlist/${adminid}"><i class="fa fa-list-ul" aria-hidden="true"></i> Customers</a></li>
                   
                </ul>
               
              </li>
              <li class="submenu">
                <a href="#"><i class="fa fa-flag-checkered" aria-hidden="true"></i> <span>Report</span></a>
                <ul>
                    <li><a href="/admin/areawiseshop/${adminid}"><i class="fa fa-list-ul" aria-hidden="true"></i>Area wise Shop</a></li>
                    <li><a href="/admin/areawiseorder/${adminid}"><i class="fa fa-list-ul" aria-hidden="true"></i>Area wise Order</a></li>
                    <li><a href="/admin/paymentwiseorder/${adminid}"><i class="fa fa-list-ul" aria-hidden="true"></i>Payment wise Order</a></li>
                    <li><a href="/admin/bestseller/${adminid}"><i class="fa fa-list-ul" aria-hidden="true"></i>Best Seller</a></li>
                    
                    
                </ul>
             
               </li>
                <li class="submenu">
                    <a href="#"><i class="fa fa-user" aria-hidden="true"></i></i> <span> Blog</span> <span
                            class="menu-arrow"></span></a>
                    <ul>
                        <li><a href="/admin/blog-list">Blogs</a></li>
                        <li><a href="/admin/add-blog">Add Blog</a></li>
                       
                    </ul>
                </li>
                <li>
                  <a href="/admin/promotion/${adminid}"><i class="fa fa-handshake" aria-hidden="true"></i><span>Promotion</span></a>
               </li>
                <li>
                    <a href="/admin/profile/${adminid}"><i class="fa fa-user" aria-hidden="true"></i><span>Profile</span></a>
                </li>
                
            </ul>
        </div>
    </div>
</div>
    `)
})


// Home footer
hbs.registerHelper("footerCustomer", ()=>{
   
    return new handlebars.SafeString(`	<footer id="footer" class="border-0 mt-0">
    <div class="container py-5">
        <div class="row py-3">
            <div class="col-md-4 mb-5 mb-md-0">
                <div
                    class="feature-box flex-column flex-xl-row align-items-center align-items-lg-start text-center text-lg-start">
                    <div class="feature-box-icon bg-transparent mb-4 mb-xl-0 p-0">
                        <img width="45" src="all_assets/img/demos/auto-services/icons/icon-location.svg" alt=""
                            data-icon
                            data-plugin-options="{'onlySVG': true, 'extraClass': 'svg-fill-color-light position-relative bottom-3'}" />
                    </div>
                    <div class="feature-box-info line-height-1 ps-2">
                        <span class="d-block font-weight-bold text-color-light text-5 mb-2">Address</span>
                        <p class="text-color-light text-4 line-height-4 font-weight-light mb-0">House: 68/A, Road: 05, Old Banani(DOHS), Dhaka, Bangladesh</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-5 mb-md-0">
                <div
                    class="feature-box flex-column flex-xl-row align-items-center align-items-lg-start text-center text-lg-start">
                    <div class="feature-box-icon bg-transparent mb-4 mb-xl-0 p-0">
                        <i class="icons icon-phone text-9 text-color-light position-relative top-4"></i>
                    </div>
                    <div class="feature-box-info line-height-1 ps-2">
                        <span class="d-block font-weight-bold text-color-light text-5 pb-1 mb-1">Call Us
                            Now</span>
                        <a href="tel:1234567890"
                            class="text-color-light text-4 line-height-7 text-decoration-none">+88 02 871 4830 </a>
                        <span class="text-color-light text-4 px-2">/</span>
                        <a href="tel:1234567890"
                            class="text-color-light text-4 line-height-7 text-decoration-none">+88 02 871 4830 </a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div
                    class="feature-box flex-column flex-xl-row align-items-center align-items-lg-start text-center text-lg-start">
                    <div class="feature-box-icon bg-transparent mb-4 mb-xl-0 p-0">
                        <img width="45" src="all_assets/img/demos/auto-services/icons/car-winch.svg" alt=""
                            data-icon
                            data-plugin-options="{'onlySVG': true, 'extraClass': 'svg-fill-color-light position-relative bottom-3'}" />
                    </div>
                    <div class="feature-box-info line-height-1 ps-xl-3">
                        <span class="d-block font-weight-bold text-color-light text-5 pb-1 mb-1">24/7
                            Assistance</span>
                        <a href="tel:1234567890"
                            class="text-color-light text-4 line-height-7 text-decoration-none">+88 02 871 4830 </a>
                        <span class="text-color-light text-4 px-2">/</span>
                        <a href="tel:1234567890"
                            class="text-color-light text-4 line-height-7 text-decoration-none">+88 02 871 4830 </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr class="bg-light opacity-2 my-0">
    <div class="footer-copyright bg-light py-4">
        <div class="container py-2">
            <div class="row">
                <div class="col">
                    <p class="text-center text-3 mb-0">NGITBD © 2022. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </div>
</footer>

</div>



<!-- Vendor -->

<script src="all_assets/vendor/jquery/jquery.min.js"></script>
<script src="all_assets/js/custom.js"></script>
<script src="all_assets/vendor/jquery.appear/jquery.appear.min.js"></script>
<script src="all_assets/vendor/jquery.easing/jquery.easing.min.js"></script>
<script src="all_assets/vendor/jquery.cookie/jquery.cookie.min.js"></script>
<script src="all_assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="all_assets/vendor/jquery.validation/jquery.validate.min.js"></script>
<script src="all_assets/vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js"></script>
<script src="all_assets/vendor/lazysizes/lazysizes.min.js"></script>
<script src="all_assets/vendor/isotope/jquery.isotope.min.js"></script>
<script src="all_assets/vendor/owl.carousel/owl.carousel.min.js"></script>
<script src="all_assets/vendor/magnific-popup/jquery.magnific-popup.min.js"></script>
<script src="all_assets/vendor/vide/jquery.vide.min.js"></script>
<script src="all_assets/vendor/vivus/vivus.min.js"></script>
<script src="all_assets/vendor/bootstrap-star-rating/js/star-rating.min.js"></script>
<script src="all_assets/vendor/bootstrap-star-rating/themes/krajee-fas/theme.min.js"></script>

<!-- Theme Base, Components and Settings -->
<script src="all_assets/js/theme.js"></script>

<!-- Current Page Vendor and Views -->
<script src="all_assets/js/views/view.contact.js"></script>
<script src="all_assets/js/views/view.shop.js"></script>

<!-- Demo -->
<script src="all_assets/js/demos/demo-auto-services.js"></script>

<!-- Theme Initialization Files -->
<script src="all_assets/js/theme.init.js"></script>
<!--  cart system -->
	<script src="/all_assets/js/cart_otherpages.js"></script>
</body>



</html>
`)

});

// Home header
hbs.registerHelper("headerCustomer", (data)=>{
    let notiWrapper = '';
   // console.log("notificationWrapper:",notiWrapper)
   if(data){
    if(data.usertype == 'customer'){
        if(data.notification !== "undefined"){
                data.notification.map((item,inx)=>{
                    notiWrapper = notiWrapper + `<li class="shadow m-2"><a class="dropdown-item" href="/customer/notification/${item.id}">
                    New Notification. Clik to view
                 </a></li>`
                })


                return new handlebars.SafeString(` <!DOCTYPE html>
                <html
                    data-style-switcher-options="{'changeLogo': false, 'colorPrimary': '#1c5fa8', 'colorSecondary': '#e36159', 'colorTertiary': '#2baab1', 'colorQuaternary': '#383f48'}">
                
                <!-- Mirrored from www.okler.net/previews/porto/9.7.0/demo-auto-services.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Jun 2022 06:30:18 GMT -->
                
                <head>
                
                    <!-- Basic -->
                    <meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <title>Doorlaundry - laundry at your door</title>
                
                    <meta name="keywords" content="WebSite Template" />
                    <meta name="description" content="Dryexpress">
                    <meta name="author" content="dryexpressbd.com">
                
                    <!-- Favicon -->
                    <link rel="shortcut icon" href="/all_assets/img/logo_only_icon.png" type="image/x-icon" />
                    <link rel="apple-touch-icon" href="img/apple-touch-icon.png">
                
                    <!-- Mobile Metas -->
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">
                
                    <!-- Web Fonts  -->
                    <link id="googleFonts"
                        href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&amp;display=swap" rel="stylesheet"
                        type="text/css">
                
                    <!-- Vendor CSS -->
                    <link rel="stylesheet" href="/all_assets/vendor/bootstrap/css/bootstrap.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/fontawesome-free/css/all.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/animate/animate.compat.css">
                    <link rel="stylesheet" href="/all_assets/vendor/simple-line-icons/css/simple-line-icons.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.carousel.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.theme.default.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/magnific-popup/magnific-popup.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/css/star-rating.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/themes/krajee-fas/theme.min.css">
                
                    <!-- Theme CSS -->
                    <link rel="stylesheet" href="/all_assets/css/theme.css">
                    <link rel="stylesheet" href="/all_assets/css/theme-elements.css">
                    <link rel="stylesheet" href="/all_assets/css/theme-blog.css">
                    <link rel="stylesheet" href="/all_assets/css/theme-shop.css">
                
                    <!-- Demo CSS -->
                    <link rel="stylesheet" href="/all_assets/css/demos/demo-auto-services.css">
                
                    <!-- Skin CSS -->
                    <link id="skinCSS" rel="stylesheet" href="/all_assets/css/skins/skin-auto-services.css">
                
                    <!-- Theme Custom CSS -->
                    <link rel="stylesheet" href="/all_assets/css/custom.css">
                
                    <!-- Head Libs -->
                    <script src="/all_assets/vendor/modernizr/modernizr.min.js"></script>
                
                </head>
                
                <body>
                
                    <div class="body">
                        <div class="toast-custom">
                            <div class="toast-content">
                                <i class="fas fa-solid fa-check check"></i>
                
                                <div class="message">
                                    <span class="text text-1">Success</span>
                                    <span class="text text-2">New Item added to cart</span>
                                </div>
                            </div>
                            <i class="fa-solid fa-xmark close-toast"></i>
                
                            <div class="progress"></div>
                        </div>
                        <div class="alert alert-success custom-alert-box d-none" role="alert">
                            A simple success alert—check it out!
                        </div>
                        <div class="notice-top-bar bg-primary" data-sticky-start-at="100">
                            <button class="hamburguer-btn hamburguer-btn-light notice-top-bar-close m-0 active" data-set-active="false">
                                <span class="close">
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                
                        </div>
                       
                        <header id="header"
                            data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 54, 'stickySetTop': '-54px', 'stickyChangeLogo': false}">
                            <div class="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
                                <div class="header-top header-top-small-minheight header-top-simple-border-bottom">
                                    <div class="container py-2">
                                        <div class="header-row justify-content-between">
                                            <div class="header-column col-auto px-0">
                                                <div class="header-row">
                                                    <div class="header-nav-top">
                                                        <ul class="nav nav-pills position-relative">
                                                            <li class="nav-item d-none d-sm-block">
                                                                <span
                                                                    class="d-flex align-items-center font-weight-medium ws-nowrap text-3 ps-0"><a
                                                                        href=""
                                                                        class="text-decoration-none text-color-dark text-color-hover-primary"><i
                                                                            class="icons icon-envelope font-weight-bold position-relative text-4 top-3 me-1"></i>
                                                                        <span class="">info@doorlaunder.com</span></a></span>
                                                            </li>
                                                            <li
                                                                class="nav-item nav-item-left-border nav-item-left-border-remove nav-item-left-border-sm-show">
                                                                <span
                                                                    class="d-flex align-items-center font-weight-medium text-color-dark ws-nowrap text-3"><i
                                                                        class="icons icon-clock font-weight-bold position-relative text-3 top-1 me-2"></i>
                                                                    Mon - Sat 9:00am - 6:00pm</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="header-column justify-content-end col-auto px-0 d-none d-md-flex">
                                                <div class="header-row">
                                                    <nav class="header-nav-top">
                                                        <ul
                                                            class="header-social-icons social-icons social-icons-clean social-icons-icon-gray social-icons-medium custom-social-icons-divider">
                                                            <li class="social-icons-facebook">
                                                                <a href="https://www.facebook.com/" target="_blank" title="Facebook"><i
                                                                        class="fab fa-facebook-f"></i></a>
                                                            </li>
                                                            <li class="social-icons-twitter">
                                                                <a href="https://www.twitter.com/" target="_blank" title="Twitter"><i
                                                                        class="fab fa-twitter"></i></a>
                                                            </li>
                                                            <li class="social-icons-linkedin">
                                                                <a href="https://www.linkedin.com/" target="_blank" title="Linkedin"><i
                                                                        class="fab fa-linkedin-in"></i></a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="header-container container">
                                    <div class="header-row">
                                        <div class="header-column w-100">
                                            <div class="header-row justify-content-between">
                                                <div class="header-logo z-index-2 col-lg-2 px-0">
                                                    <a href="/">
                                                        <img alt="Porto" width="123" height="48" data-sticky-width="82"
                                                            data-sticky-height="40" data-sticky-top="84"
                                                            src="/all_assets/img//logo.png">
                                                    </a>
                                                </div>
                                                <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                                <div
                                                    class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                                    <nav class="collapse">
                                                      <ul class="nav nav-pills" id="mainNav">
                                                        <li><a href="/" class="nav-link">Home</a></li>
                                                        <li><a href="/allshops" class="nav-link">Shoplist</a>
                                                     </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                                <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                                    <div class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                                    
                                                    </div>
                                                </div>
                                                <ul class="header-extra-info custom-left-border-1 d-none d-xl-block">
                                                    <li class="d-none d-sm-inline-flex ms-0">
                                                        <div class="header-extra-info-icon">
                                                            <i class="icons icon-phone text-3 text-color-dark position-relative top-3"></i>
                                                        </div>
                                                        <div class="header-extra-info-text line-height-2">
                                                            <span class="text-1 font-weight-semibold text-color-default">CALL US
                                                                NOW</span>
                                                            <strong class="text-4"><a href="tel:+880171-3288-600"
                                                                    class="text-color-hover-primary text-decoration-none">+88 02 871 4830
                                                                    </a></strong>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div class="d-flex col-auto pe-0 ps-0 ps-xl-3">
                                                    <div class="header-nav-features ps-0 ms-1">
                                                        <div
                                                            class="header-nav-feature header-nav-features-search d-inline-flex position-relative top-3 border border-top-0 border-bottom-0 custom-remove-mobile-border-left px-4 me-2">
                                                            <a href="#" class="header-nav-features-toggle text-decoration-none"
                                                                data-focus="headerSearch">
                                                                <i
                                                                    class="icons icon-magnifier header-nav-top-icon text-5 font-weight-bold position-relative top-3"></i>
                                                            </a>
                                                           
                                                            
                                                            <div class="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed border-radius-0"
                                                                id="headerTopSearchDropdown">
                                                                <form role="search"
                                                                    action=""
                                                                    method="get">
                                                                    <div class="simple-search input-group">
                                                                        <input class="form-control text-1 rounded" id="headerSearch"
                                                                            name="q" type="search" value="" placeholder="Search...">
                                                                        <button class="btn" type="submit">
                                                                            <i class="icons icon-magnifier header-nav-top-icon"></i>
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                                
                                                            </div>
                                                            
                                                            
                                                        </div>
                
                                                       
                                                        <div class="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
                                                        
                                                           <a href="#" class="header-nav-features-toggle">
                                                                <img src="/all_assets/img/icons/icon-cart-big.svg" height="30" alt=""
                                                                    class="header-nav-top-icon-img">
                                                                <span class="cart-info">
                                                                    <span class="cart-qty" id="cartItemNumber">0</span>
                                                                </span>
                
                                                            </a>
                                                           
                                                           
                
                                                            <div class="header-nav-features-dropdown" id="headerTopCartDropdown">
                
                                                                <div class="cart-box-home-top" id="cart-box-home-top"></div>
                
                                                                <div class="totals">
                                                                    <span class="label">Total:</span>
                                                                    <span class="price-total"><span class="price"
                                                                            id="cartTotalAmount">$49</span></span>
                                                                </div>
                                                                <div class="actions cart-box-home-bottom-btn">
                                                                    <a class="btn btn-dark viewCart" id="viewcartLink" href="/cart">View Cart</a>
                                                                    <a class="btn btn-primary" href="#" id="clearCartBtn">Clear Cart</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="header-nav-feature d-inline-flex top-2 ms-2">
                                                        <div class="dropdown">
                                                            <a class="btn  dropdown-toggle notilink" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i class="fa fa-bell" aria-hidden="true"></i>
                                                                <span class="noti-info">
                                                                    <span class="noti-qty">${data.notification.length}</span>
                                                                </span>
                                                            </a>
                                                            <input type="hidden" value="${data.id}" id="userID_Customer"/>
                                                            <ul class="dropdown-menu p-2">
                                                                <input type="hidden" id="user_id" value=${data.id}/>
                                                                ${notiWrapper}
                                                            </ul>
                                                         </div>
                                                      </div>
                                                        <div class="header-nav-feature d-inline-flex top-2 ms-2">
                                                        <div class="dropdown">
                                                            <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                               ${data.name}
                                                            </a>
                                                             <input type="hidden" value="${data.id}" id="userID_Customer"/>
                                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                                <input type="hidden" id="user_id" value=${data.id}
                                                                <li><a class="dropdown-item" href="/customer/orderhistory/${data.id}">Order History</a></li>
                                                                <li><a class="dropdown-item" href="/customer/profile/${data.id}">Profile</a></li>
                                                                <li><a class="dropdown-item" href="/customer/logout">logout</a></li>
                                                            </ul>
                                                         </div>
                                                      </div>
                                                    </div>
                                                </div>
                
                                                <button class="btn header-btn-collapse-nav ms-4" data-bs-toggle="collapse"
                                                    data-bs-target=".header-nav-main nav">
                                                    <i class="fas fa-bars"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <style>
                        .quantity.float-none.m-0 input[type="text"],
                        .quantity.float-none.m-0 input {
                            width: 36px;
                            border: 1px solid #dfdddd;
                            text-align: center;
                        }
        
                        ul.list.list-icons.list-primary.mb-0 li span {
                            color: #1c5fa8;
                            font-weight: 700;
                            margin-left: 10px;
                        }
                    </style>
                `)    
            
        }else{
            return new handlebars.SafeString(` <!DOCTYPE html>
        <html
            data-style-switcher-options="{'changeLogo': false, 'colorPrimary': '#1c5fa8', 'colorSecondary': '#e36159', 'colorTertiary': '#2baab1', 'colorQuaternary': '#383f48'}">
        
        <!-- Mirrored from www.okler.net/previews/porto/9.7.0/demo-auto-services.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Jun 2022 06:30:18 GMT -->
        
        <head>
        
            <!-- Basic -->
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Doorlaundry - laundry at your door</title>
        
            <meta name="keywords" content="WebSite Template" />
            <meta name="description" content="Dryexpress">
            <meta name="author" content="dryexpressbd.com">
        
            <!-- Favicon -->
            <link rel="shortcut icon" href="/all_assets/img/logo_only_icon.png" type="image/x-icon" />
            <link rel="apple-touch-icon" href="img/apple-touch-icon.png">
        
            <!-- Mobile Metas -->
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">
        
            <!-- Web Fonts  -->
            <link id="googleFonts"
                href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&amp;display=swap" rel="stylesheet"
                type="text/css">
        
            <!-- Vendor CSS -->
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/fontawesome-free/css/all.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/animate/animate.compat.css">
            <link rel="stylesheet" href="/all_assets/vendor/simple-line-icons/css/simple-line-icons.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.carousel.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.theme.default.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/magnific-popup/magnific-popup.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/css/star-rating.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/themes/krajee-fas/theme.min.css">
        
            <!-- Theme CSS -->
            <link rel="stylesheet" href="/all_assets/css/theme.css">
            <link rel="stylesheet" href="/all_assets/css/theme-elements.css">
            <link rel="stylesheet" href="/all_assets/css/theme-blog.css">
            <link rel="stylesheet" href="/all_assets/css/theme-shop.css">
        
            <!-- Demo CSS -->
            <link rel="stylesheet" href="/all_assets/css/demos/demo-auto-services.css">
        
            <!-- Skin CSS -->
            <link id="skinCSS" rel="stylesheet" href="/all_assets/css/skins/skin-auto-services.css">
        
            <!-- Theme Custom CSS -->
            <link rel="stylesheet" href="/all_assets/css/custom.css">
        
            <!-- Head Libs -->
            <script src="/all_assets/vendor/modernizr/modernizr.min.js"></script>
        
        </head>
        
        <body>
        
            <div class="body">
                <div class="toast-custom">
                    <div class="toast-content">
                        <i class="fas fa-solid fa-check check"></i>
        
                        <div class="message">
                            <span class="text text-1">Success</span>
                            <span class="text text-2">New Item added to cart</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-xmark close-toast"></i>
        
                    <div class="progress"></div>
                </div>
                <div class="alert alert-success custom-alert-box d-none" role="alert">
                    A simple success alert—check it out!
                </div>
                <div class="notice-top-bar bg-primary" data-sticky-start-at="100">
                    <button class="hamburguer-btn hamburguer-btn-light notice-top-bar-close m-0 active" data-set-active="false">
                        <span class="close">
                            <span></span>
                            <span></span>
                        </span>
                    </button>
        
                </div>
               
                <header id="header"
                    data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 54, 'stickySetTop': '-54px', 'stickyChangeLogo': false}">
                    <div class="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
                        <div class="header-top header-top-small-minheight header-top-simple-border-bottom">
                            <div class="container py-2">
                                <div class="header-row justify-content-between">
                                    <div class="header-column col-auto px-0">
                                        <div class="header-row">
                                            <div class="header-nav-top">
                                                <ul class="nav nav-pills position-relative">
                                                    <li class="nav-item d-none d-sm-block">
                                                        <span
                                                            class="d-flex align-items-center font-weight-medium ws-nowrap text-3 ps-0"><a
                                                                href=""
                                                                class="text-decoration-none text-color-dark text-color-hover-primary"><i
                                                                    class="icons icon-envelope font-weight-bold position-relative text-4 top-3 me-1"></i>
                                                                <span class="">info@doorlaunder.com</span></a></span>
                                                    </li>
                                                    <li
                                                        class="nav-item nav-item-left-border nav-item-left-border-remove nav-item-left-border-sm-show">
                                                        <span
                                                            class="d-flex align-items-center font-weight-medium text-color-dark ws-nowrap text-3"><i
                                                                class="icons icon-clock font-weight-bold position-relative text-3 top-1 me-2"></i>
                                                            Mon - Sat 9:00am - 6:00pm</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header-column justify-content-end col-auto px-0 d-none d-md-flex">
                                        <div class="header-row">
                                            <nav class="header-nav-top">
                                                <ul
                                                    class="header-social-icons social-icons social-icons-clean social-icons-icon-gray social-icons-medium custom-social-icons-divider">
                                                    <li class="social-icons-facebook">
                                                        <a href="https://www.facebook.com/" target="_blank" title="Facebook"><i
                                                                class="fab fa-facebook-f"></i></a>
                                                    </li>
                                                    <li class="social-icons-twitter">
                                                        <a href="https://www.twitter.com/" target="_blank" title="Twitter"><i
                                                                class="fab fa-twitter"></i></a>
                                                    </li>
                                                    <li class="social-icons-linkedin">
                                                        <a href="https://www.linkedin.com/" target="_blank" title="Linkedin"><i
                                                                class="fab fa-linkedin-in"></i></a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="header-container container">
                            <div class="header-row">
                                <div class="header-column w-100">
                                    <div class="header-row justify-content-between">
                                        <div class="header-logo z-index-2 col-lg-2 px-0">
                                            <a href="/">
                                                <img alt="Porto" width="123" height="48" data-sticky-width="82"
                                                    data-sticky-height="40" data-sticky-top="84"
                                                    src="/all_assets/img//logo.png">
                                            </a>
                                        </div>
                                        <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                        <div
                                            class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                            <nav class="collapse">
                                              <ul class="nav nav-pills" id="mainNav">
                                                <li><a href="/" class="nav-link">Home</a></li>
                                                <li><a href="/allshops" class="nav-link">Shoplist</a>
                                             </ul>
                                            </nav>
                                        </div>
                                    </div>
                                        <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                            <div class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                            
                                            </div>
                                        </div>
                                        <ul class="header-extra-info custom-left-border-1 d-none d-xl-block">
                                            <li class="d-none d-sm-inline-flex ms-0">
                                                <div class="header-extra-info-icon">
                                                    <i class="icons icon-phone text-3 text-color-dark position-relative top-3"></i>
                                                </div>
                                                <div class="header-extra-info-text line-height-2">
                                                    <span class="text-1 font-weight-semibold text-color-default">CALL US
                                                        NOW</span>
                                                    <strong class="text-4"><a href="tel:+880171-3288-600"
                                                            class="text-color-hover-primary text-decoration-none">+88 02 871 4830
                                                            </a></strong>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="d-flex col-auto pe-0 ps-0 ps-xl-3">
                                            <div class="header-nav-features ps-0 ms-1">
                                                <div
                                                    class="header-nav-feature header-nav-features-search d-inline-flex position-relative top-3 border border-top-0 border-bottom-0 custom-remove-mobile-border-left px-4 me-2">
                                                    <a href="#" class="header-nav-features-toggle text-decoration-none"
                                                        data-focus="headerSearch">
                                                        <i
                                                            class="icons icon-magnifier header-nav-top-icon text-5 font-weight-bold position-relative top-3"></i>
                                                    </a>
                                                   
                                                    
                                                    <div class="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed border-radius-0"
                                                        id="headerTopSearchDropdown">
                                                        <form role="search"
                                                            action=""
                                                            method="get">
                                                            <div class="simple-search input-group">
                                                                <input class="form-control text-1 rounded" id="headerSearch"
                                                                    name="q" type="search" value="" placeholder="Search...">
                                                                <button class="btn" type="submit">
                                                                    <i class="icons icon-magnifier header-nav-top-icon"></i>
                                                                </button>
                                                            </div>
                                                        </form>
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
        
                                               
                                                <div class="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
                                                
                                                   <a href="#" class="header-nav-features-toggle">
                                                        <img src="/all_assets/img/icons/icon-cart-big.svg" height="30" alt=""
                                                            class="header-nav-top-icon-img">
                                                        <span class="cart-info">
                                                            <span class="cart-qty" id="cartItemNumber">0</span>
                                                        </span>
        
                                                    </a>
                                                   
                                                   
        
                                                    <div class="header-nav-features-dropdown" id="headerTopCartDropdown">
        
                                                        <div class="cart-box-home-top" id="cart-box-home-top"></div>
        
                                                        <div class="totals">
                                                            <span class="label">Total:</span>
                                                            <span class="price-total"><span class="price"
                                                                    id="cartTotalAmount">$49</span></span>
                                                        </div>
                                                        <div class="actions cart-box-home-bottom-btn">
                                                            <a class="btn btn-dark viewCart" href="/cart">View Cart</a>
                                                            <a class="btn btn-primary" href="#" id="clearCartBtn">Clear Cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="header-nav-feature d-inline-flex top-2 ms-2">
                                                <div class="dropdown">
                                                    <a class="btn  dropdown-toggle notilink" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i class="fa fa-bell" aria-hidden="true"></i>
                                                        <span class="noti-info">
                                                            <span class="noti-qty">0</span>
                                                        </span>
                                                    </a>
                                                    <input type="hidden" value="${data.id}" id="userID_Customer"/>
                                                    <ul class="dropdown-menu p-2">
                                                        <input type="hidden" id="user_id" value=${data.id}/>
                                                       
                                                    </ul>
                                                 </div>
                                              </div>
                                                <div class="header-nav-feature d-inline-flex top-2 ms-2">
                                                <div class="dropdown">
                                                    <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                       ${data.name}
                                                    </a>
                                                     <input type="hidden" value="${data.id}" id="userID_Customer"/>
                                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <input type="hidden" id="user_id" value=${data.id}
                                                        <li><a class="dropdown-item" href="/customer/orderhistory/${data.id}">Order History</a></li>
                                                        <li><a class="dropdown-item" href="/customer/profile/${data.id}">Profile</a></li>
                                                        <li><a class="dropdown-item" href="/customer/logout">logout</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                            </div>
                                        </div>
        
                                        <button class="btn header-btn-collapse-nav ms-4" data-bs-toggle="collapse"
                                            data-bs-target=".header-nav-main nav">
                                            <i class="fas fa-bars"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <style>
				.quantity.float-none.m-0 input[type="text"],
				.quantity.float-none.m-0 input {
					width: 36px;
					border: 1px solid #dfdddd;
					text-align: center;
				}

				ul.list.list-icons.list-primary.mb-0 li span {
					color: #1c5fa8;
					font-weight: 700;
					margin-left: 10px;
				}
			</style>
        `)
        } 
      
    }
    else{
        return new handlebars.SafeString(`<!DOCTYPE html>
        <html
            data-style-switcher-options="{'changeLogo': false, 'colorPrimary': '#1c5fa8', 'colorSecondary': '#e36159', 'colorTertiary': '#2baab1', 'colorQuaternary': '#383f48'}">
        
        <!-- Mirrored from www.okler.net/previews/porto/9.7.0/demo-auto-services.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Jun 2022 06:30:18 GMT -->
        
        <head>
        
            <!-- Basic -->
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Doorlaundry - laundry at your door</title>
        
            <meta name="keywords" content="WebSite Template" />
            <meta name="description" content="Porto - Multipurpose Website Template">
            <meta name="author" content="okler.net">
        
            <!-- Favicon -->
            <link rel="shortcut icon" href="/all_assets/img/logo_only_icon.png" type="image/x-icon" />
            
        
            <!-- Mobile Metas -->
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">
        
            <!-- Web Fonts  -->
            <link id="googleFonts"
                href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&amp;display=swap" rel="stylesheet"
                type="text/css">
        
            <!-- Vendor CSS -->
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/fontawesome-free/css/all.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/animate/animate.compat.css">
            <link rel="stylesheet" href="/all_assets/vendor/simple-line-icons/css/simple-line-icons.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.carousel.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.theme.default.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/magnific-popup/magnific-popup.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/css/star-rating.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/themes/krajee-fas/theme.min.css">
        
            <!-- Theme CSS -->
            <link rel="stylesheet" href="/all_assets/css/theme.css">
            <link rel="stylesheet" href="/all_assets/css/theme-elements.css">
            <link rel="stylesheet" href="/all_assets/css/theme-blog.css">
            <link rel="stylesheet" href="/all_assets/css/theme-shop.css">
        
            <!-- Demo CSS -->
            <link rel="stylesheet" href="/all_assets/css/demos/demo-auto-services.css">
        
            <!-- Skin CSS -->
            <link id="skinCSS" rel="stylesheet" href="/all_assets/css/skins/skin-auto-services.css">
        
            <!-- Theme Custom CSS -->
            <link rel="stylesheet" href="/all_assets/css/custom.css">
        
            <!-- Head Libs -->
            <script src="/all_assets/vendor/modernizr/modernizr.min.js"></script>
        
        </head>
        
        <body>
        
            <div class="body">
        
                
                <div class="toast-custom">
                    <div class="toast-content">
                        <i class="fas fa-solid fa-check check"></i>
        
                        <div class="message">
                            <span class="text text-1">Success</span>
                            <span class="text text-2">New Item added to cart</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-xmark close-toast"></i>
        
                    <div class="progress"></div>
                </div>
        
        
        
                
                <div class="alert alert-success custom-alert-box d-none" role="alert">
                    A simple success alert—check it out!
                </div>
        
                <div class="notice-top-bar bg-primary" data-sticky-start-at="100">
                    <button class="hamburguer-btn hamburguer-btn-light notice-top-bar-close m-0 active" data-set-active="false">
                        <span class="close">
                            <span></span>
                            <span></span>
                        </span>
                    </button>
        
                </div>
               
                <header id="header" data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 54, 'stickySetTop': '-54px', 'stickyChangeLogo': false}">
                    <div class="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
                        <div class="header-top header-top-small-minheight header-top-simple-border-bottom">
                            <div class="container py-2">
                                <div class="header-row justify-content-between">
                                    <div class="header-column col-auto px-0">
                                        <div class="header-row">
                                            <div class="header-nav-top">
                                                <ul class="nav nav-pills position-relative">
                                                    <li class="nav-item d-none d-sm-block">
                                                        <span
                                                            class="d-flex align-items-center font-weight-medium ws-nowrap text-3 ps-0"><a
                                                                href=""
                                                                class="text-decoration-none text-color-dark text-color-hover-primary"><i
                                                                    class="icons icon-envelope font-weight-bold position-relative text-4 top-3 me-1"></i>
                                                                <span class="">info@doorlaunder.com</span></a></span>
                                                    </li>
                                                    <li
                                                        class="nav-item nav-item-left-border nav-item-left-border-remove nav-item-left-border-sm-show">
                                                        <span
                                                            class="d-flex align-items-center font-weight-medium text-color-dark ws-nowrap text-3"><i
                                                                class="icons icon-clock font-weight-bold position-relative text-3 top-1 me-2"></i>
                                                            Mon - Sat 9:00am - 6:00pm</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header-column justify-content-end col-auto px-0 d-none d-md-flex">
                                        <div class="header-row">
                                            <nav class="header-nav-top">
                                                <ul
                                                    class="header-social-icons social-icons social-icons-clean social-icons-icon-gray social-icons-medium custom-social-icons-divider">
                                                    <li class="social-icons-facebook">
                                                        <a href="https://www.facebook.com/" target="_blank" title="Facebook"><i
                                                                class="fab fa-facebook-f"></i></a>
                                                    </li>
                                                    <li class="social-icons-twitter">
                                                        <a href="https://www.twitter.com/" target="_blank" title="Twitter"><i
                                                                class="fab fa-twitter"></i></a>
                                                    </li>
                                                    <li class="social-icons-linkedin">
                                                        <a href="https://www.linkedin.com/" target="_blank" title="Linkedin"><i
                                                                class="fab fa-linkedin-in"></i></a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="header-container container">
                            <div class="header-row">
                                <div class="header-column w-100">
                                    <div class="header-row justify-content-between">
                                        <div class="header-logo z-index-2 col-lg-2 px-0">
                                            <a href="/">
                                                <img alt="Porto" width="123" height="48" data-sticky-width="82"
                                                    data-sticky-height="40" data-sticky-top="84"
                                                    src="/all_assets/img//logo.png">
                                            </a>
                                        </div>
                                        <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                            <div
                                                class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                                <nav class="collapse">
                                                    <ul class="nav nav-pills" id="mainNav">
                                                        <li><a href="/" class="nav-link">Home</a></li>
                                                        <li><a href="/shop/login" class="nav-link">Shop Login</a></li>
                                                        <li><a href="/shop/registration"
                                                                class="nav-link">Shop Registration</a></li>
                                                        <li><a href="/customer/login" class="nav-link">Login</a>
                                                        <li><a href="/customer/registration" class="nav-link">Registration</a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                        <ul class="header-extra-info custom-left-border-1 d-none d-xl-block">
                                            <li class="d-none d-sm-inline-flex ms-0">
                                                <div class="header-extra-info-icon">
                                                    <i
                                                        class="icons icon-phone text-3 text-color-dark position-relative top-3"></i>
                                                </div>
                                                <div class="header-extra-info-text line-height-2">
                                                    <span class="text-1 font-weight-semibold text-color-default">CALL US
                                                        NOW</span>
                                                    <strong class="text-4"><a href="tel:+880171-3288-600"
                                                            class="text-color-hover-primary text-decoration-none">+88 02 871 4830
                                                            </a></strong>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="d-flex col-auto pe-0 ps-0 ps-xl-3">
                                            <div class="header-nav-features ps-0 ms-1">
                                                <div
                                                    class="header-nav-feature header-nav-features-search d-inline-flex position-relative top-3 border border-top-0 border-bottom-0 custom-remove-mobile-border-left px-4 me-2">
                                                    <a href="#" class="header-nav-features-toggle text-decoration-none"
                                                        data-focus="headerSearch">
                                                        <i
                                                            class="icons icon-magnifier header-nav-top-icon text-5 font-weight-bold position-relative top-3"></i>
                                                    </a>
                                                    <div class="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed border-radius-0"
                                                        id="headerTopSearchDropdown">
                                                        <form role="search"
                                                            action=""
                                                            method="get">
                                                            <div class="simple-search input-group">
                                                                <input class="form-control text-1 rounded" id="headerSearch"
                                                                    name="q" type="search" value="" placeholder="Search...">
                                                                <button class="btn" type="submit">
                                                                    <i class="icons icon-magnifier header-nav-top-icon"></i>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    
                                                    
                                                </div>
        
                                               
                                                <div class="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
                                                    <a href="#" class="header-nav-features-toggle">
                                                        <img src="/all_assets/img/icons/icon-cart-big.svg" height="30" alt=""
                                                            class="header-nav-top-icon-img">
                                                        <span class="cart-info">
                                                            <span class="cart-qty" id="cartItemNumber">1</span>
                                                        </span>
        
                                                    </a>
                                                   
        
                                                    <div class="header-nav-features-dropdown" id="headerTopCartDropdown">
        
                                                        <div class="cart-box-home-top" id="cart-box-home-top"></div>
        
                                                        <div class="totals">
                                                            <span class="label">Total:</span>
                                                            <span class="price-total"><span class="price"
                                                                    id="cartTotalAmount">$49</span></span>
                                                        </div>
                                                        <div class="actions cart-box-home-bottom-btn">
                                                            <a class="btn btn-dark viewCart" href="/cart">View Cart</a>
                                                            <a class="btn btn-primary" href="#" id="clearCartBtn">Clear Cart</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                
                                                
                                            </div>
                                        </div>
        
                                        <button class="btn header-btn-collapse-nav ms-4" data-bs-toggle="collapse"
                                            data-bs-target=".header-nav-main nav">
                                            <i class="fas fa-bars"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <style>
				.quantity.float-none.m-0 input[type="text"],
				.quantity.float-none.m-0 input {
					width: 36px;
					border: 1px solid #dfdddd;
					text-align: center;
				}

				ul.list.list-icons.list-primary.mb-0 li span {
					color: #1c5fa8;
					font-weight: 700;
					margin-left: 10px;
				}
			</style>
        `)
    }
   }
   else{
    return new handlebars.SafeString(`<!DOCTYPE html>
    <html
        data-style-switcher-options="{'changeLogo': false, 'colorPrimary': '#1c5fa8', 'colorSecondary': '#e36159', 'colorTertiary': '#2baab1', 'colorQuaternary': '#383f48'}">
    
    <!-- Mirrored from www.okler.net/previews/porto/9.7.0/demo-auto-services.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Jun 2022 06:30:18 GMT -->
    
    <head>
    
        <!-- Basic -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Doorlaundry - laundry at your door</title>
    
        <meta name="keywords" content="WebSite Template" />
        <meta name="description" content="Porto - Multipurpose Website Template">
        <meta name="author" content="okler.net">
    
        <!-- Favicon -->
        <link rel="shortcut icon" href="/all_assets/img/logo_only_icon.png" type="image/x-icon" />
        
    
        <!-- Mobile Metas -->
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">
    
        <!-- Web Fonts  -->
        <link id="googleFonts"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&amp;display=swap" rel="stylesheet"
            type="text/css">
    
        <!-- Vendor CSS -->
        <link rel="stylesheet" href="/all_assets/vendor/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/fontawesome-free/css/all.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/animate/animate.compat.css">
        <link rel="stylesheet" href="/all_assets/vendor/simple-line-icons/css/simple-line-icons.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.carousel.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.theme.default.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/magnific-popup/magnific-popup.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/css/star-rating.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/themes/krajee-fas/theme.min.css">
    
        <!-- Theme CSS -->
        <link rel="stylesheet" href="/all_assets/css/theme.css">
        <link rel="stylesheet" href="/all_assets/css/theme-elements.css">
        <link rel="stylesheet" href="/all_assets/css/theme-blog.css">
        <link rel="stylesheet" href="/all_assets/css/theme-shop.css">
    
        <!-- Demo CSS -->
        <link rel="stylesheet" href="/all_assets/css/demos/demo-auto-services.css">
    
        <!-- Skin CSS -->
        <link id="skinCSS" rel="stylesheet" href="/all_assets/css/skins/skin-auto-services.css">
    
        <!-- Theme Custom CSS -->
        <link rel="stylesheet" href="/all_assets/css/custom.css">
    
        <!-- Head Libs -->
        <script src="/all_assets/vendor/modernizr/modernizr.min.js"></script>
    
    </head>
    
    <body>
    
        <div class="body">
    
            
            <div class="toast-custom">
                <div class="toast-content">
                    <i class="fas fa-solid fa-check check"></i>
    
                    <div class="message">
                        <span class="text text-1">Success</span>
                        <span class="text text-2">New Item added to cart</span>
                    </div>
                </div>
                <i class="fa-solid fa-xmark close-toast"></i>
    
                <div class="progress"></div>
            </div>
    
    
    
            
            <div class="alert alert-success custom-alert-box d-none" role="alert">
                A simple success alert—check it out!
            </div>
    
            <div class="notice-top-bar bg-primary" data-sticky-start-at="100">
                <button class="hamburguer-btn hamburguer-btn-light notice-top-bar-close m-0 active" data-set-active="false">
                    <span class="close">
                        <span></span>
                        <span></span>
                    </span>
                </button>
    
            </div>
           
            <header id="header"
                data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 54, 'stickySetTop': '-54px', 'stickyChangeLogo': false}">
                <div class="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
                    <div class="header-top header-top-small-minheight header-top-simple-border-bottom">
                        <div class="container py-2">
                            <div class="header-row justify-content-between">
                                <div class="header-column col-auto px-0">
                                    <div class="header-row">
                                        <div class="header-nav-top">
                                            <ul class="nav nav-pills position-relative">
                                                <li class="nav-item d-none d-sm-block">
                                                    <span
                                                        class="d-flex align-items-center font-weight-medium ws-nowrap text-3 ps-0"><a
                                                            href=""
                                                            class="text-decoration-none text-color-dark text-color-hover-primary"><i
                                                                class="icons icon-envelope font-weight-bold position-relative text-4 top-3 me-1"></i>
                                                            <span class="">info@doorlaunder.com</span></a></span>
                                                </li>
                                                <li
                                                    class="nav-item nav-item-left-border nav-item-left-border-remove nav-item-left-border-sm-show">
                                                    <span
                                                        class="d-flex align-items-center font-weight-medium text-color-dark ws-nowrap text-3"><i
                                                            class="icons icon-clock font-weight-bold position-relative text-3 top-1 me-2"></i>
                                                        Mon - Sat 9:00am - 6:00pm</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="header-column justify-content-end col-auto px-0 d-none d-md-flex">
                                    <div class="header-row">
                                        <nav class="header-nav-top">
                                            <ul
                                                class="header-social-icons social-icons social-icons-clean social-icons-icon-gray social-icons-medium custom-social-icons-divider">
                                                <li class="social-icons-facebook">
                                                    <a href="https://www.facebook.com/" target="_blank" title="Facebook"><i
                                                            class="fab fa-facebook-f"></i></a>
                                                </li>
                                                <li class="social-icons-twitter">
                                                    <a href="https://www.twitter.com/" target="_blank" title="Twitter"><i
                                                            class="fab fa-twitter"></i></a>
                                                </li>
                                                <li class="social-icons-linkedin">
                                                    <a href="https://www.linkedin.com/" target="_blank" title="Linkedin"><i
                                                            class="fab fa-linkedin-in"></i></a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-container container">
                        <div class="header-row">
                            <div class="header-column w-100">
                                <div class="header-row justify-content-between">
                                    <div class="header-logo z-index-2 col-lg-2 px-0">
                                        <a href="/">
                                            <img alt="Porto" width="123" height="48" data-sticky-width="82"
                                                data-sticky-height="40" data-sticky-top="84"
                                                src="/all_assets/img//logo.png">
                                        </a>
                                    </div>
                                    <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                        <div
                                            class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                            <nav class="collapse">
                                                <ul class="nav nav-pills" id="mainNav">
                                                   <li><a href="/" class="nav-link">Home</a></li>
                                                   <li><a href="/allshops" class="nav-link">Shoplist</a></li>
                                                    <li><a href="/shop/login" class="nav-link">Shop Login</a>
                                                   
                                                    <li><a href="/customer/login" class="nav-link">Login</a>
                                                    <li><a href="/customer/registration" class="nav-link">Registration</a>
                                                    </li>
                                                    
    
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <ul class="header-extra-info custom-left-border-1 d-none d-xl-block">
                                        <li class="d-none d-sm-inline-flex ms-0">
                                            <div class="header-extra-info-icon">
                                                <i
                                                    class="icons icon-phone text-3 text-color-dark position-relative top-3"></i>
                                            </div>
                                            <div class="header-extra-info-text line-height-2">
                                                <span class="text-1 font-weight-semibold text-color-default">CALL US
                                                    NOW</span>
                                                <strong class="text-4"><a href="tel:+880171-3288-600"
                                                        class="text-color-hover-primary text-decoration-none">+88 02 871 4830</a></strong>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="d-flex col-auto pe-0 ps-0 ps-xl-3">
                                        <div class="header-nav-features ps-0 ms-1">
                                            <div
                                                class="header-nav-feature header-nav-features-search d-inline-flex position-relative top-3 border border-top-0 border-bottom-0 custom-remove-mobile-border-left px-4 me-2">
                                                <a href="#" class="header-nav-features-toggle text-decoration-none"
                                                    data-focus="headerSearch">
                                                    <i
                                                        class="icons icon-magnifier header-nav-top-icon text-5 font-weight-bold position-relative top-3"></i>
                                                </a>
                                                <div class="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed border-radius-0"
                                                    id="headerTopSearchDropdown">
                                                    <form role="search"
                                                        action=""
                                                        method="get">
                                                        <div class="simple-search input-group">
                                                            <input class="form-control text-1 rounded" id="headerSearch"
                                                                name="q" type="search" value="" placeholder="Search...">
                                                            <button class="btn" type="submit">
                                                                <i class="icons icon-magnifier header-nav-top-icon"></i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                                  
                                            </div>
                                            <div class="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
                                                <a href="#" class="header-nav-features-toggle">
                                                    <img src="/all_assets/img/icons/icon-cart-big.svg" height="30" alt=""
                                                        class="header-nav-top-icon-img">
                                                    <span class="cart-info">
                                                        <span class="cart-qty" id="cartItemNumber">1</span>
                                                    </span>
    
                                                </a>
                                               
    
                                                <div class="header-nav-features-dropdown" id="headerTopCartDropdown">
    
                                                    <div class="cart-box-home-top" id="cart-box-home-top"></div>
    
                                                    <div class="totals">
                                                        <span class="label">Total:</span>
                                                        <span class="price-total"><span class="price"
                                                                id="cartTotalAmount">$49</span></span>
                                                    </div>
                                                    <div class="actions cart-box-home-bottom-btn">
                                                        <a class="btn btn-dark viewCart" href="/cart">View Cart</a>
                                                        <a class="btn btn-primary" href="#" id="clearCartBtn">Clear Cart</a>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            
                                        </div>
                                    </div>
    
                                    <button class="btn header-btn-collapse-nav ms-4" data-bs-toggle="collapse"
                                        data-bs-target=".header-nav-main nav">
                                        <i class="fas fa-bars"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <style>
            .quantity.float-none.m-0 input[type="text"],
            .quantity.float-none.m-0 input {
                width: 36px;
                border: 1px solid #dfdddd;
                text-align: center;
            }

            ul.list.list-icons.list-primary.mb-0 li span {
                color: #1c5fa8;
                font-weight: 700;
                margin-left: 10px;
            }
        </style>
    `)
}
  
   
       
 
   
  

});

// Home header
hbs.registerHelper("headerCustomerCart", (data)=>{
    let notiWrapper = '';
   // console.log("notificationWrapper:",notiWrapper)
   if(data){
    if(data.usertype == 'customer'){
        if(data.notification !== "undefined"){
                data.notification.map((item,inx)=>{
                    notiWrapper = notiWrapper + `<li class="shadow m-2"><a class="dropdown-item" href="/customer/notification/${item.id}">
                    New Notification. Clik to view
                 </a></li>`
                })


                return new handlebars.SafeString(` <!DOCTYPE html>
                <html
                    data-style-switcher-options="{'changeLogo': false, 'colorPrimary': '#1c5fa8', 'colorSecondary': '#e36159', 'colorTertiary': '#2baab1', 'colorQuaternary': '#383f48'}">
                
                <!-- Mirrored from www.okler.net/previews/porto/9.7.0/demo-auto-services.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Jun 2022 06:30:18 GMT -->
                
                <head>
                
                    <!-- Basic -->
                    <meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <title>Doorlaundry - laundry at your door</title>
                
                    <meta name="keywords" content="WebSite Template" />
                    <meta name="description" content="Dryexpress">
                    <meta name="author" content="dryexpressbd.com">
                
                    <!-- Favicon -->
                    <link rel="shortcut icon" href="/all_assets/img/logo_only_icon.png" type="image/x-icon" />
                    <link rel="apple-touch-icon" href="img/apple-touch-icon.png">
                
                    <!-- Mobile Metas -->
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">
                
                    <!-- Web Fonts  -->
                    <link id="googleFonts"
                        href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&amp;display=swap" rel="stylesheet"
                        type="text/css">
                
                    <!-- Vendor CSS -->
                    <link rel="stylesheet" href="/all_assets/vendor/bootstrap/css/bootstrap.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/fontawesome-free/css/all.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/animate/animate.compat.css">
                    <link rel="stylesheet" href="/all_assets/vendor/simple-line-icons/css/simple-line-icons.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.carousel.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.theme.default.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/magnific-popup/magnific-popup.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/css/star-rating.min.css">
                    <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/themes/krajee-fas/theme.min.css">
                
                    <!-- Theme CSS -->
                    <link rel="stylesheet" href="/all_assets/css/theme.css">
                    <link rel="stylesheet" href="/all_assets/css/theme-elements.css">
                    <link rel="stylesheet" href="/all_assets/css/theme-blog.css">
                    <link rel="stylesheet" href="/all_assets/css/theme-shop.css">
                
                    <!-- Demo CSS -->
                    <link rel="stylesheet" href="/all_assets/css/demos/demo-auto-services.css">
                
                    <!-- Skin CSS -->
                    <link id="skinCSS" rel="stylesheet" href="/all_assets/css/skins/skin-auto-services.css">
                
                    <!-- Theme Custom CSS -->
                    <link rel="stylesheet" href="/all_assets/css/custom.css">
                
                    <!-- Head Libs -->
                    <script src="/all_assets/vendor/modernizr/modernizr.min.js"></script>
                
                </head>
                
                <body>
                
                    <div class="body">
                        <div class="toast-custom">
                            <div class="toast-content">
                                <i class="fas fa-solid fa-check check"></i>
                
                                <div class="message">
                                    <span class="text text-1">Success</span>
                                    <span class="text text-2">New Item added to cart</span>
                                </div>
                            </div>
                            <i class="fa-solid fa-xmark close-toast"></i>
                
                            <div class="progress"></div>
                        </div>
                        <div class="alert alert-success custom-alert-box d-none" role="alert">
                            A simple success alert—check it out!
                        </div>
                        <div class="notice-top-bar bg-primary" data-sticky-start-at="100">
                            <button class="hamburguer-btn hamburguer-btn-light notice-top-bar-close m-0 active" data-set-active="false">
                                <span class="close">
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                
                        </div>
                       
                        <header id="header"
                            data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 54, 'stickySetTop': '-54px', 'stickyChangeLogo': false}">
                            <div class="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
                                <div class="header-top header-top-small-minheight header-top-simple-border-bottom">
                                    <div class="container py-2">
                                        <div class="header-row justify-content-between">
                                            <div class="header-column col-auto px-0">
                                                <div class="header-row">
                                                    <div class="header-nav-top">
                                                        <ul class="nav nav-pills position-relative">
                                                            <li class="nav-item d-none d-sm-block">
                                                                <span
                                                                    class="d-flex align-items-center font-weight-medium ws-nowrap text-3 ps-0"><a
                                                                        href=""
                                                                        class="text-decoration-none text-color-dark text-color-hover-primary"><i
                                                                            class="icons icon-envelope font-weight-bold position-relative text-4 top-3 me-1"></i>
                                                                        <span class="">info@doorlaunder.com</span></a></span>
                                                            </li>
                                                            <li
                                                                class="nav-item nav-item-left-border nav-item-left-border-remove nav-item-left-border-sm-show">
                                                                <span
                                                                    class="d-flex align-items-center font-weight-medium text-color-dark ws-nowrap text-3"><i
                                                                        class="icons icon-clock font-weight-bold position-relative text-3 top-1 me-2"></i>
                                                                    Mon - Sat 9:00am - 6:00pm</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="header-column justify-content-end col-auto px-0 d-none d-md-flex">
                                                <div class="header-row">
                                                    <nav class="header-nav-top">
                                                        <ul
                                                            class="header-social-icons social-icons social-icons-clean social-icons-icon-gray social-icons-medium custom-social-icons-divider">
                                                            <li class="social-icons-facebook">
                                                                <a href="https://www.facebook.com/" target="_blank" title="Facebook"><i
                                                                        class="fab fa-facebook-f"></i></a>
                                                            </li>
                                                            <li class="social-icons-twitter">
                                                                <a href="https://www.twitter.com/" target="_blank" title="Twitter"><i
                                                                        class="fab fa-twitter"></i></a>
                                                            </li>
                                                            <li class="social-icons-linkedin">
                                                                <a href="https://www.linkedin.com/" target="_blank" title="Linkedin"><i
                                                                        class="fab fa-linkedin-in"></i></a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="header-container container">
                                    <div class="header-row">
                                        <div class="header-column w-100">
                                            <div class="header-row justify-content-between">
                                                <div class="header-logo z-index-2 col-lg-2 px-0">
                                                    <a href="/">
                                                        <img alt="Porto" width="123" height="48" data-sticky-width="82"
                                                            data-sticky-height="40" data-sticky-top="84"
                                                            src="/all_assets/img//logo.png">
                                                    </a>
                                                </div>
                                                <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                                <div
                                                    class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                                    <nav class="collapse">
                                                      <ul class="nav nav-pills" id="mainNav">
                                                        <li><a href="/" class="nav-link">Home</a></li>
                                                        <li><a href="/allshops" class="nav-link">Shoplist</a>
                                                     </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                                <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                                    <div class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                                    
                                                    </div>
                                                </div>
                                                <ul class="header-extra-info custom-left-border-1 d-none d-xl-block">
                                                    <li class="d-none d-sm-inline-flex ms-0">
                                                        <div class="header-extra-info-icon">
                                                            <i class="icons icon-phone text-3 text-color-dark position-relative top-3"></i>
                                                        </div>
                                                        <div class="header-extra-info-text line-height-2">
                                                            <span class="text-1 font-weight-semibold text-color-default">CALL US
                                                                NOW</span>
                                                            <strong class="text-4"><a href="tel:+880171-3288-600"
                                                                    class="text-color-hover-primary text-decoration-none">+88 02 871 4830
                                                                    </a></strong>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div class="d-flex col-auto pe-0 ps-0 ps-xl-3">
                                                    <div class="header-nav-features ps-0 ms-1">
                                                        <div
                                                            class="header-nav-feature header-nav-features-search d-inline-flex position-relative top-3 border border-top-0 border-bottom-0 custom-remove-mobile-border-left px-4 me-2">
                                                            <a href="#" class="header-nav-features-toggle text-decoration-none"
                                                                data-focus="headerSearch">
                                                                <i
                                                                    class="icons icon-magnifier header-nav-top-icon text-5 font-weight-bold position-relative top-3"></i>
                                                            </a>
                                                           
                                                            
                                                            <div class="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed border-radius-0"
                                                                id="headerTopSearchDropdown">
                                                                <form role="search"
                                                                    action=""
                                                                    method="get">
                                                                    <div class="simple-search input-group">
                                                                        <input class="form-control text-1 rounded" id="headerSearch"
                                                                            name="q" type="search" value="" placeholder="Search...">
                                                                        <button class="btn" type="submit">
                                                                            <i class="icons icon-magnifier header-nav-top-icon"></i>
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                                
                                                            </div>
                                                            
                                                            
                                                        </div>
                
                                                       
                                                        <div class="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
                                                        
                                                          
                                                           
                                                           
            
                                                        </div>
                                                        <div class="header-nav-feature d-inline-flex top-2 ms-2">
                                                        <div class="dropdown">
                                                            <a class="btn  dropdown-toggle notilink" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i class="fa fa-bell" aria-hidden="true"></i>
                                                                <span class="noti-info">
                                                                    <span class="noti-qty">${data.notification.length}</span>
                                                                </span>
                                                            </a>
                                                            <input type="hidden" value="${data.id}" id="userID_Customer"/>
                                                            <ul class="dropdown-menu p-2">
                                                                <input type="hidden" id="user_id" value=${data.id}/>
                                                                ${notiWrapper}
                                                            </ul>
                                                         </div>
                                                      </div>
                                                        <div class="header-nav-feature d-inline-flex top-2 ms-2">
                                                        <div class="dropdown">
                                                            <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                               ${data.name}
                                                            </a>
                                                             <input type="hidden" value="${data.id}" id="userID_Customer"/>
                                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                                <input type="hidden" id="user_id" value=${data.id}
                                                                <li><a class="dropdown-item" href="/customer/orderhistory/${data.id}">Order History</a></li>
                                                                <li><a class="dropdown-item" href="/customer/profile/${data.id}">Profile</a></li>
                                                                <li><a class="dropdown-item" href="/customer/logout">logout</a></li>
                                                            </ul>
                                                         </div>
                                                      </div>
                                                    </div>
                                                </div>
                
                                                <button class="btn header-btn-collapse-nav ms-4" data-bs-toggle="collapse"
                                                    data-bs-target=".header-nav-main nav">
                                                    <i class="fas fa-bars"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <style>
                        .quantity.float-none.m-0 input[type="text"],
                        .quantity.float-none.m-0 input {
                            width: 36px;
                            border: 1px solid #dfdddd;
                            text-align: center;
                        }
        
                        ul.list.list-icons.list-primary.mb-0 li span {
                            color: #1c5fa8;
                            font-weight: 700;
                            margin-left: 10px;
                        }
                    </style>
                `)    
            
        }else{
            return new handlebars.SafeString(` <!DOCTYPE html>
        <html
            data-style-switcher-options="{'changeLogo': false, 'colorPrimary': '#1c5fa8', 'colorSecondary': '#e36159', 'colorTertiary': '#2baab1', 'colorQuaternary': '#383f48'}">
        
        <!-- Mirrored from www.okler.net/previews/porto/9.7.0/demo-auto-services.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Jun 2022 06:30:18 GMT -->
        
        <head>
        
            <!-- Basic -->
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Doorlaundry - laundry at your door</title>
        
            <meta name="keywords" content="WebSite Template" />
            <meta name="description" content="Dryexpress">
            <meta name="author" content="dryexpressbd.com">
        
            <!-- Favicon -->
            <link rel="shortcut icon" href="/all_assets/img/logo_only_icon.png" type="image/x-icon" />
            <link rel="apple-touch-icon" href="img/apple-touch-icon.png">
        
            <!-- Mobile Metas -->
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">
        
            <!-- Web Fonts  -->
            <link id="googleFonts"
                href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&amp;display=swap" rel="stylesheet"
                type="text/css">
        
            <!-- Vendor CSS -->
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/fontawesome-free/css/all.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/animate/animate.compat.css">
            <link rel="stylesheet" href="/all_assets/vendor/simple-line-icons/css/simple-line-icons.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.carousel.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.theme.default.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/magnific-popup/magnific-popup.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/css/star-rating.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/themes/krajee-fas/theme.min.css">
        
            <!-- Theme CSS -->
            <link rel="stylesheet" href="/all_assets/css/theme.css">
            <link rel="stylesheet" href="/all_assets/css/theme-elements.css">
            <link rel="stylesheet" href="/all_assets/css/theme-blog.css">
            <link rel="stylesheet" href="/all_assets/css/theme-shop.css">
        
            <!-- Demo CSS -->
            <link rel="stylesheet" href="/all_assets/css/demos/demo-auto-services.css">
        
            <!-- Skin CSS -->
            <link id="skinCSS" rel="stylesheet" href="/all_assets/css/skins/skin-auto-services.css">
        
            <!-- Theme Custom CSS -->
            <link rel="stylesheet" href="/all_assets/css/custom.css">
        
            <!-- Head Libs -->
            <script src="/all_assets/vendor/modernizr/modernizr.min.js"></script>
        
        </head>
        
        <body>
        
            <div class="body">
                <div class="toast-custom">
                    <div class="toast-content">
                        <i class="fas fa-solid fa-check check"></i>
        
                        <div class="message">
                            <span class="text text-1">Success</span>
                            <span class="text text-2">New Item added to cart</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-xmark close-toast"></i>
        
                    <div class="progress"></div>
                </div>
                <div class="alert alert-success custom-alert-box d-none" role="alert">
                    A simple success alert—check it out!
                </div>
                <div class="notice-top-bar bg-primary" data-sticky-start-at="100">
                    <button class="hamburguer-btn hamburguer-btn-light notice-top-bar-close m-0 active" data-set-active="false">
                        <span class="close">
                            <span></span>
                            <span></span>
                        </span>
                    </button>
        
                </div>
               
                <header id="header"
                    data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 54, 'stickySetTop': '-54px', 'stickyChangeLogo': false}">
                    <div class="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
                        <div class="header-top header-top-small-minheight header-top-simple-border-bottom">
                            <div class="container py-2">
                                <div class="header-row justify-content-between">
                                    <div class="header-column col-auto px-0">
                                        <div class="header-row">
                                            <div class="header-nav-top">
                                                <ul class="nav nav-pills position-relative">
                                                    <li class="nav-item d-none d-sm-block">
                                                        <span
                                                            class="d-flex align-items-center font-weight-medium ws-nowrap text-3 ps-0"><a
                                                                href=""
                                                                class="text-decoration-none text-color-dark text-color-hover-primary"><i
                                                                    class="icons icon-envelope font-weight-bold position-relative text-4 top-3 me-1"></i>
                                                                <span class="">info@doorlaunder.com</span></a></span>
                                                    </li>
                                                    <li
                                                        class="nav-item nav-item-left-border nav-item-left-border-remove nav-item-left-border-sm-show">
                                                        <span
                                                            class="d-flex align-items-center font-weight-medium text-color-dark ws-nowrap text-3"><i
                                                                class="icons icon-clock font-weight-bold position-relative text-3 top-1 me-2"></i>
                                                            Mon - Sat 9:00am - 6:00pm</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header-column justify-content-end col-auto px-0 d-none d-md-flex">
                                        <div class="header-row">
                                            <nav class="header-nav-top">
                                                <ul
                                                    class="header-social-icons social-icons social-icons-clean social-icons-icon-gray social-icons-medium custom-social-icons-divider">
                                                    <li class="social-icons-facebook">
                                                        <a href="https://www.facebook.com/" target="_blank" title="Facebook"><i
                                                                class="fab fa-facebook-f"></i></a>
                                                    </li>
                                                    <li class="social-icons-twitter">
                                                        <a href="https://www.twitter.com/" target="_blank" title="Twitter"><i
                                                                class="fab fa-twitter"></i></a>
                                                    </li>
                                                    <li class="social-icons-linkedin">
                                                        <a href="https://www.linkedin.com/" target="_blank" title="Linkedin"><i
                                                                class="fab fa-linkedin-in"></i></a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="header-container container">
                            <div class="header-row">
                                <div class="header-column w-100">
                                    <div class="header-row justify-content-between">
                                        <div class="header-logo z-index-2 col-lg-2 px-0">
                                            <a href="/">
                                                <img alt="Porto" width="123" height="48" data-sticky-width="82"
                                                    data-sticky-height="40" data-sticky-top="84"
                                                    src="/all_assets/img//logo.png">
                                            </a>
                                        </div>
                                        <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                        <div
                                            class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                            <nav class="collapse">
                                              <ul class="nav nav-pills" id="mainNav">
                                                <li><a href="/" class="nav-link">Home</a></li>
                                                <li><a href="/allshops" class="nav-link">Shoplist</a>
                                             </ul>
                                            </nav>
                                        </div>
                                    </div>
                                        <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                            <div class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                            
                                            </div>
                                        </div>
                                        <ul class="header-extra-info custom-left-border-1 d-none d-xl-block">
                                            <li class="d-none d-sm-inline-flex ms-0">
                                                <div class="header-extra-info-icon">
                                                    <i class="icons icon-phone text-3 text-color-dark position-relative top-3"></i>
                                                </div>
                                                <div class="header-extra-info-text line-height-2">
                                                    <span class="text-1 font-weight-semibold text-color-default">CALL US
                                                        NOW</span>
                                                    <strong class="text-4"><a href="tel:+880171-3288-600"
                                                            class="text-color-hover-primary text-decoration-none">+88 02 871 4830
                                                            </a></strong>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="d-flex col-auto pe-0 ps-0 ps-xl-3">
                                            <div class="header-nav-features ps-0 ms-1">
                                                <div
                                                    class="header-nav-feature header-nav-features-search d-inline-flex position-relative top-3 border border-top-0 border-bottom-0 custom-remove-mobile-border-left px-4 me-2">
                                                    <a href="#" class="header-nav-features-toggle text-decoration-none"
                                                        data-focus="headerSearch">
                                                        <i
                                                            class="icons icon-magnifier header-nav-top-icon text-5 font-weight-bold position-relative top-3"></i>
                                                    </a>
                                                   
                                                    
                                                    <div class="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed border-radius-0"
                                                        id="headerTopSearchDropdown">
                                                        <form role="search"
                                                            action=""
                                                            method="get">
                                                            <div class="simple-search input-group">
                                                                <input class="form-control text-1 rounded" id="headerSearch"
                                                                    name="q" type="search" value="" placeholder="Search...">
                                                                <button class="btn" type="submit">
                                                                    <i class="icons icon-magnifier header-nav-top-icon"></i>
                                                                </button>
                                                            </div>
                                                        </form>
                                                        
                                                    </div>
                                                    
                                                    
                                                </div>
        
                                               
                                                <div class="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
                                                
                                                 
                                                </div>
                                                <div class="header-nav-feature d-inline-flex top-2 ms-2">
                                                <div class="dropdown">
                                                    <a class="btn  dropdown-toggle notilink" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i class="fa fa-bell" aria-hidden="true"></i>
                                                        <span class="noti-info">
                                                            <span class="noti-qty">0</span>
                                                        </span>
                                                    </a>
                                                    <input type="hidden" value="${data.id}" id="userID_Customer"/>
                                                    <ul class="dropdown-menu p-2">
                                                        <input type="hidden" id="user_id" value=${data.id}/>
                                                       
                                                    </ul>
                                                 </div>
                                              </div>
                                                <div class="header-nav-feature d-inline-flex top-2 ms-2">
                                                <div class="dropdown">
                                                    <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                       ${data.name}
                                                    </a>
                                                     <input type="hidden" value="${data.id}" id="userID_Customer"/>
                                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <input type="hidden" id="user_id" value=${data.id}
                                                        <li><a class="dropdown-item" href="/customer/orderhistory/${data.id}">Order History</a></li>
                                                        <li><a class="dropdown-item" href="/customer/profile/${data.id}">Profile</a></li>
                                                        <li><a class="dropdown-item" href="/customer/logout">logout</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                            </div>
                                        </div>
        
                                        <button class="btn header-btn-collapse-nav ms-4" data-bs-toggle="collapse"
                                            data-bs-target=".header-nav-main nav">
                                            <i class="fas fa-bars"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <style>
				.quantity.float-none.m-0 input[type="text"],
				.quantity.float-none.m-0 input {
					width: 36px;
					border: 1px solid #dfdddd;
					text-align: center;
				}

				ul.list.list-icons.list-primary.mb-0 li span {
					color: #1c5fa8;
					font-weight: 700;
					margin-left: 10px;
				}
			</style>
        `)
        } 
      
    }
    else{
        return new handlebars.SafeString(`<!DOCTYPE html>
        <html
            data-style-switcher-options="{'changeLogo': false, 'colorPrimary': '#1c5fa8', 'colorSecondary': '#e36159', 'colorTertiary': '#2baab1', 'colorQuaternary': '#383f48'}">
        
        <!-- Mirrored from www.okler.net/previews/porto/9.7.0/demo-auto-services.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Jun 2022 06:30:18 GMT -->
        
        <head>
        
            <!-- Basic -->
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Doorlaundry - laundry at your door</title>
        
            <meta name="keywords" content="WebSite Template" />
            <meta name="description" content="Porto - Multipurpose Website Template">
            <meta name="author" content="okler.net">
        
            <!-- Favicon -->
            <link rel="shortcut icon" href="/all_assets/img/logo_only_icon.png" type="image/x-icon" />
            
        
            <!-- Mobile Metas -->
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">
        
            <!-- Web Fonts  -->
            <link id="googleFonts"
                href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&amp;display=swap" rel="stylesheet"
                type="text/css">
        
            <!-- Vendor CSS -->
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/fontawesome-free/css/all.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/animate/animate.compat.css">
            <link rel="stylesheet" href="/all_assets/vendor/simple-line-icons/css/simple-line-icons.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.carousel.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.theme.default.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/magnific-popup/magnific-popup.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/css/star-rating.min.css">
            <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/themes/krajee-fas/theme.min.css">
        
            <!-- Theme CSS -->
            <link rel="stylesheet" href="/all_assets/css/theme.css">
            <link rel="stylesheet" href="/all_assets/css/theme-elements.css">
            <link rel="stylesheet" href="/all_assets/css/theme-blog.css">
            <link rel="stylesheet" href="/all_assets/css/theme-shop.css">
        
            <!-- Demo CSS -->
            <link rel="stylesheet" href="/all_assets/css/demos/demo-auto-services.css">
        
            <!-- Skin CSS -->
            <link id="skinCSS" rel="stylesheet" href="/all_assets/css/skins/skin-auto-services.css">
        
            <!-- Theme Custom CSS -->
            <link rel="stylesheet" href="/all_assets/css/custom.css">
        
            <!-- Head Libs -->
            <script src="/all_assets/vendor/modernizr/modernizr.min.js"></script>
        
        </head>
        
        <body>
        
            <div class="body">
        
                
                <div class="toast-custom">
                    <div class="toast-content">
                        <i class="fas fa-solid fa-check check"></i>
        
                        <div class="message">
                            <span class="text text-1">Success</span>
                            <span class="text text-2">New Item added to cart</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-xmark close-toast"></i>
        
                    <div class="progress"></div>
                </div>
        
        
        
                
                <div class="alert alert-success custom-alert-box d-none" role="alert">
                    A simple success alert—check it out!
                </div>
        
                <div class="notice-top-bar bg-primary" data-sticky-start-at="100">
                    <button class="hamburguer-btn hamburguer-btn-light notice-top-bar-close m-0 active" data-set-active="false">
                        <span class="close">
                            <span></span>
                            <span></span>
                        </span>
                    </button>
        
                </div>
               
                <header id="header" data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 54, 'stickySetTop': '-54px', 'stickyChangeLogo': false}">
                    <div class="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
                        <div class="header-top header-top-small-minheight header-top-simple-border-bottom">
                            <div class="container py-2">
                                <div class="header-row justify-content-between">
                                    <div class="header-column col-auto px-0">
                                        <div class="header-row">
                                            <div class="header-nav-top">
                                                <ul class="nav nav-pills position-relative">
                                                    <li class="nav-item d-none d-sm-block">
                                                        <span
                                                            class="d-flex align-items-center font-weight-medium ws-nowrap text-3 ps-0"><a
                                                                href=""
                                                                class="text-decoration-none text-color-dark text-color-hover-primary"><i
                                                                    class="icons icon-envelope font-weight-bold position-relative text-4 top-3 me-1"></i>
                                                                <span class="">info@doorlaunder.com</span></a></span>
                                                    </li>
                                                    <li
                                                        class="nav-item nav-item-left-border nav-item-left-border-remove nav-item-left-border-sm-show">
                                                        <span
                                                            class="d-flex align-items-center font-weight-medium text-color-dark ws-nowrap text-3"><i
                                                                class="icons icon-clock font-weight-bold position-relative text-3 top-1 me-2"></i>
                                                            Mon - Sat 9:00am - 6:00pm</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header-column justify-content-end col-auto px-0 d-none d-md-flex">
                                        <div class="header-row">
                                            <nav class="header-nav-top">
                                                <ul
                                                    class="header-social-icons social-icons social-icons-clean social-icons-icon-gray social-icons-medium custom-social-icons-divider">
                                                    <li class="social-icons-facebook">
                                                        <a href="https://www.facebook.com/" target="_blank" title="Facebook"><i
                                                                class="fab fa-facebook-f"></i></a>
                                                    </li>
                                                    <li class="social-icons-twitter">
                                                        <a href="https://www.twitter.com/" target="_blank" title="Twitter"><i
                                                                class="fab fa-twitter"></i></a>
                                                    </li>
                                                    <li class="social-icons-linkedin">
                                                        <a href="https://www.linkedin.com/" target="_blank" title="Linkedin"><i
                                                                class="fab fa-linkedin-in"></i></a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="header-container container">
                            <div class="header-row">
                                <div class="header-column w-100">
                                    <div class="header-row justify-content-between">
                                        <div class="header-logo z-index-2 col-lg-2 px-0">
                                            <a href="/">
                                                <img alt="Porto" width="123" height="48" data-sticky-width="82"
                                                    data-sticky-height="40" data-sticky-top="84"
                                                    src="/all_assets/img//logo.png">
                                            </a>
                                        </div>
                                        <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                            <div
                                                class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                                <nav class="collapse">
                                                    <ul class="nav nav-pills" id="mainNav">
                                                        <li><a href="/" class="nav-link">Home</a></li>
                                                        <li><a href="/shop/login" class="nav-link">Shop Login</a></li>
                                                        <li><a href="/shop/registration"
                                                                class="nav-link">Shop Registration</a></li>
                                                        <li><a href="/customer/login" class="nav-link">Login</a>
                                                        <li><a href="/customer/registration" class="nav-link">Registration</a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                        <ul class="header-extra-info custom-left-border-1 d-none d-xl-block">
                                            <li class="d-none d-sm-inline-flex ms-0">
                                                <div class="header-extra-info-icon">
                                                    <i
                                                        class="icons icon-phone text-3 text-color-dark position-relative top-3"></i>
                                                </div>
                                                <div class="header-extra-info-text line-height-2">
                                                    <span class="text-1 font-weight-semibold text-color-default">CALL US
                                                        NOW</span>
                                                    <strong class="text-4"><a href="tel:+880171-3288-600"
                                                            class="text-color-hover-primary text-decoration-none">+88 02 871 4830
                                                            </a></strong>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="d-flex col-auto pe-0 ps-0 ps-xl-3">
                                            <div class="header-nav-features ps-0 ms-1">
                                                <div
                                                    class="header-nav-feature header-nav-features-search d-inline-flex position-relative top-3 border border-top-0 border-bottom-0 custom-remove-mobile-border-left px-4 me-2">
                                                    <a href="#" class="header-nav-features-toggle text-decoration-none"
                                                        data-focus="headerSearch">
                                                        <i
                                                            class="icons icon-magnifier header-nav-top-icon text-5 font-weight-bold position-relative top-3"></i>
                                                    </a>
                                                    <div class="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed border-radius-0"
                                                        id="headerTopSearchDropdown">
                                                        <form role="search"
                                                            action=""
                                                            method="get">
                                                            <div class="simple-search input-group">
                                                                <input class="form-control text-1 rounded" id="headerSearch"
                                                                    name="q" type="search" value="" placeholder="Search...">
                                                                <button class="btn" type="submit">
                                                                    <i class="icons icon-magnifier header-nav-top-icon"></i>
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    
                                                    
                                                </div>
        
                                               
                                                <div class="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
                                                   
                                                </div>

                                                
                                                
                                            </div>
                                        </div>
        
                                        <button class="btn header-btn-collapse-nav ms-4" data-bs-toggle="collapse"
                                            data-bs-target=".header-nav-main nav">
                                            <i class="fas fa-bars"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <style>
				.quantity.float-none.m-0 input[type="text"],
				.quantity.float-none.m-0 input {
					width: 36px;
					border: 1px solid #dfdddd;
					text-align: center;
				}

				ul.list.list-icons.list-primary.mb-0 li span {
					color: #1c5fa8;
					font-weight: 700;
					margin-left: 10px;
				}
			</style>
        `)
    }
   }
   else{
    return new handlebars.SafeString(`<!DOCTYPE html>
    <html
        data-style-switcher-options="{'changeLogo': false, 'colorPrimary': '#1c5fa8', 'colorSecondary': '#e36159', 'colorTertiary': '#2baab1', 'colorQuaternary': '#383f48'}">
    
    <!-- Mirrored from www.okler.net/previews/porto/9.7.0/demo-auto-services.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 30 Jun 2022 06:30:18 GMT -->
    
    <head>
    
        <!-- Basic -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Doorlaundry - laundry at your door</title>
    
        <meta name="keywords" content="WebSite Template" />
        <meta name="description" content="Porto - Multipurpose Website Template">
        <meta name="author" content="okler.net">
    
        <!-- Favicon -->
        <link rel="shortcut icon" href="/all_assets/img/logo_only_icon.png" type="image/x-icon" />
        
    
        <!-- Mobile Metas -->
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">
    
        <!-- Web Fonts  -->
        <link id="googleFonts"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&amp;display=swap" rel="stylesheet"
            type="text/css">
    
        <!-- Vendor CSS -->
        <link rel="stylesheet" href="/all_assets/vendor/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/fontawesome-free/css/all.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/animate/animate.compat.css">
        <link rel="stylesheet" href="/all_assets/vendor/simple-line-icons/css/simple-line-icons.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.carousel.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/owl.carousel/assets/owl.theme.default.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/magnific-popup/magnific-popup.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/css/star-rating.min.css">
        <link rel="stylesheet" href="/all_assets/vendor/bootstrap-star-rating/themes/krajee-fas/theme.min.css">
    
        <!-- Theme CSS -->
        <link rel="stylesheet" href="/all_assets/css/theme.css">
        <link rel="stylesheet" href="/all_assets/css/theme-elements.css">
        <link rel="stylesheet" href="/all_assets/css/theme-blog.css">
        <link rel="stylesheet" href="/all_assets/css/theme-shop.css">
    
        <!-- Demo CSS -->
        <link rel="stylesheet" href="/all_assets/css/demos/demo-auto-services.css">
    
        <!-- Skin CSS -->
        <link id="skinCSS" rel="stylesheet" href="/all_assets/css/skins/skin-auto-services.css">
    
        <!-- Theme Custom CSS -->
        <link rel="stylesheet" href="/all_assets/css/custom.css">
    
        <!-- Head Libs -->
        <script src="/all_assets/vendor/modernizr/modernizr.min.js"></script>
    
    </head>
    
    <body>
    
        <div class="body">
    
            
            <div class="toast-custom">
                <div class="toast-content">
                    <i class="fas fa-solid fa-check check"></i>
    
                    <div class="message">
                        <span class="text text-1">Success</span>
                        <span class="text text-2">New Item added to cart</span>
                    </div>
                </div>
                <i class="fa-solid fa-xmark close-toast"></i>
    
                <div class="progress"></div>
            </div>
    
    
    
            
            <div class="alert alert-success custom-alert-box d-none" role="alert">
                A simple success alert—check it out!
            </div>
    
            <div class="notice-top-bar bg-primary" data-sticky-start-at="100">
                <button class="hamburguer-btn hamburguer-btn-light notice-top-bar-close m-0 active" data-set-active="false">
                    <span class="close">
                        <span></span>
                        <span></span>
                    </span>
                </button>
    
            </div>
           
            <header id="header"
                data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 54, 'stickySetTop': '-54px', 'stickyChangeLogo': false}">
                <div class="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
                    <div class="header-top header-top-small-minheight header-top-simple-border-bottom">
                        <div class="container py-2">
                            <div class="header-row justify-content-between">
                                <div class="header-column col-auto px-0">
                                    <div class="header-row">
                                        <div class="header-nav-top">
                                            <ul class="nav nav-pills position-relative">
                                                <li class="nav-item d-none d-sm-block">
                                                    <span
                                                        class="d-flex align-items-center font-weight-medium ws-nowrap text-3 ps-0"><a
                                                            href=""
                                                            class="text-decoration-none text-color-dark text-color-hover-primary"><i
                                                                class="icons icon-envelope font-weight-bold position-relative text-4 top-3 me-1"></i>
                                                            <span class="">info@doorlaunder.com</span></a></span>
                                                </li>
                                                <li
                                                    class="nav-item nav-item-left-border nav-item-left-border-remove nav-item-left-border-sm-show">
                                                    <span
                                                        class="d-flex align-items-center font-weight-medium text-color-dark ws-nowrap text-3"><i
                                                            class="icons icon-clock font-weight-bold position-relative text-3 top-1 me-2"></i>
                                                        Mon - Sat 9:00am - 6:00pm</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="header-column justify-content-end col-auto px-0 d-none d-md-flex">
                                    <div class="header-row">
                                        <nav class="header-nav-top">
                                            <ul
                                                class="header-social-icons social-icons social-icons-clean social-icons-icon-gray social-icons-medium custom-social-icons-divider">
                                                <li class="social-icons-facebook">
                                                    <a href="https://www.facebook.com/" target="_blank" title="Facebook"><i
                                                            class="fab fa-facebook-f"></i></a>
                                                </li>
                                                <li class="social-icons-twitter">
                                                    <a href="https://www.twitter.com/" target="_blank" title="Twitter"><i
                                                            class="fab fa-twitter"></i></a>
                                                </li>
                                                <li class="social-icons-linkedin">
                                                    <a href="https://www.linkedin.com/" target="_blank" title="Linkedin"><i
                                                            class="fab fa-linkedin-in"></i></a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-container container">
                        <div class="header-row">
                            <div class="header-column w-100">
                                <div class="header-row justify-content-between">
                                    <div class="header-logo z-index-2 col-lg-2 px-0">
                                        <a href="/">
                                            <img alt="Porto" width="123" height="48" data-sticky-width="82"
                                                data-sticky-height="40" data-sticky-top="84"
                                                src="/all_assets/img//logo.png">
                                        </a>
                                    </div>
                                    <div class="header-nav header-nav-links justify-content-end pe-lg-4 me-lg-3">
                                        <div
                                            class="header-nav-main header-nav-main-arrows header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1">
                                            <nav class="collapse">
                                                <ul class="nav nav-pills" id="mainNav">
                                                   <li><a href="/" class="nav-link">Home</a></li>
                                                   <li><a href="/allshops" class="nav-link">Shoplist</a></li>
                                                    <li><a href="/shop/login" class="nav-link">Shop Login</a>
                                                   
                                                    <li><a href="/customer/login" class="nav-link">Login</a>
                                                    <li><a href="/customer/registration" class="nav-link">Registration</a>
                                                    </li>
                                                    
    
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <ul class="header-extra-info custom-left-border-1 d-none d-xl-block">
                                        <li class="d-none d-sm-inline-flex ms-0">
                                            <div class="header-extra-info-icon">
                                                <i
                                                    class="icons icon-phone text-3 text-color-dark position-relative top-3"></i>
                                            </div>
                                            <div class="header-extra-info-text line-height-2">
                                                <span class="text-1 font-weight-semibold text-color-default">CALL US
                                                    NOW</span>
                                                <strong class="text-4"><a href="tel:+880171-3288-600"
                                                        class="text-color-hover-primary text-decoration-none">+88 02 871 4830</a></strong>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="d-flex col-auto pe-0 ps-0 ps-xl-3">
                                        <div class="header-nav-features ps-0 ms-1">
                                            <div
                                                class="header-nav-feature header-nav-features-search d-inline-flex position-relative top-3 border border-top-0 border-bottom-0 custom-remove-mobile-border-left px-4 me-2">
                                                <a href="#" class="header-nav-features-toggle text-decoration-none"
                                                    data-focus="headerSearch">
                                                    <i
                                                        class="icons icon-magnifier header-nav-top-icon text-5 font-weight-bold position-relative top-3"></i>
                                                </a>
                                                <div class="header-nav-features-dropdown header-nav-features-dropdown-mobile-fixed border-radius-0"
                                                    id="headerTopSearchDropdown">
                                                    <form role="search"
                                                        action=""
                                                        method="get">
                                                        <div class="simple-search input-group">
                                                            <input class="form-control text-1 rounded" id="headerSearch"
                                                                name="q" type="search" value="" placeholder="Search...">
                                                            <button class="btn" type="submit">
                                                                <i class="icons icon-magnifier header-nav-top-icon"></i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                                  
                                            </div>
                                            <div class="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
                                                
                                            </div>

                                            
                                            
                                        </div>
                                    </div>
    
                                    <button class="btn header-btn-collapse-nav ms-4" data-bs-toggle="collapse"
                                        data-bs-target=".header-nav-main nav">
                                        <i class="fas fa-bars"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <style>
            .quantity.float-none.m-0 input[type="text"],
            .quantity.float-none.m-0 input {
                width: 36px;
                border: 1px solid #dfdddd;
                text-align: center;
            }

            ul.list.list-icons.list-primary.mb-0 li span {
                color: #1c5fa8;
                font-weight: 700;
                margin-left: 10px;
            }
        </style>
    `)
}
  
   
       
 
   
  

});


// patient-sidebar
hbs.registerHelper("commonFooter", ()=>{
   
    return new handlebars.SafeString(`
    <footer class="footer">

    <div class="footer-top">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-3 col-md-6">

                    <div class="footer-widget footer-about">
                        <div class="footer-logo">
                            <img src="/assets/img/footer-logo.png" alt="logo">
                        </div>
                        <div class="footer-about-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. </p>
                            <div class="social-icon">
                                <ul>
                                    <li>
                                        <a href="#" target="_blank"><i class="fab fa-facebook-f"></i> </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank"><i class="fab fa-twitter"></i> </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank"><i class="fab fa-dribbble"></i> </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-lg-3 col-md-6">

                    <div class="footer-widget footer-menu">
                        <h2 class="footer-title">For Patients</h2>
                        <ul>
                            <li><a href="search.html">Search for Doctors</a></li>
                            <li><a href="login.html">Login</a></li>
                            <li><a href="register.html">Register</a></li>
                            <li><a href="booking.html">Booking</a></li>
                            <li><a href="patient-dashboard.html">Patient Dashboard</a></li>
                        </ul>
                    </div>

                </div>
                <div class="col-lg-3 col-md-6">

                    <div class="footer-widget footer-menu">
                        <h2 class="footer-title">For Doctors</h2>
                        <ul>
                            <li><a href="appointments.html">Appointments</a></li>
                            <li><a href="chat.html">Chat</a></li>
                            <li><a href="login.html">Login</a></li>
                            <li><a href="doctor-register.html">Register</a></li>
                            <li><a href="doctor-dashboard.html">Doctor Dashboard</a></li>
                        </ul>
                    </div>

                </div>
                <div class="col-lg-3 col-md-6">

                    <div class="footer-widget footer-contact">
                        <h2 class="footer-title">Contact Us</h2>
                        <div class="footer-contact-info">
                            <div class="footer-address">
                                <span><i class="fas fa-map-marker-alt"></i></span>
                                <p> 3556 Beech Street, San Francisco,<br> California, CA 94108 </p>
                            </div>
                            <p>
                                <i class="fas fa-phone-alt"></i>
                                +1 315 369 5943
                            </p>
                            <p class="mb-0">
                                <i class="fas fa-envelope"></i>
                                <a href="/cdn-cgi/l/email-protection" class="__cf_email__"
                                    data-cfemail="74101b171701061134110c15190418115a171b19">[email&#160;protected]</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="footer-bottom">
        <div class="container-fluid">

            <div class="copyright">
                <div class="row">
                    <div class="col-md-6 col-lg-6">
                        <div class="copyright-text">
                            <p class="mb-0">&copy; 2020 Doccure. All rights reserved.</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6">

                        <div class="copyright-menu">
                            <ul class="policy-menu">
                                <li><a href="term-condition.html">Terms and Conditions</a></li>
                                <li><a href="privacy-policy.html">Policy</a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>

</footer>

</div>


<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
<script src="/assets/js/jquery-3.6.0.min.js"></script>

<script src="/assets/js/bootstrap.bundle.min.js"></script>

<script src="/assets/plugins/select2/js/select2.min.js"></script>

<script src="/assets/js/moment.min.js"></script>
<script src="/assets/js/bootstrap-datetimepicker.min.js"></script>

<script src="/assets/plugins/theia-sticky-sidebar/ResizeSensor.js"></script>
<script src="/assets/plugins/theia-sticky-sidebar/theia-sticky-sidebar.js"></script>

<script src="/assets/js/script.js"></script>

<script>
$( document ).ready(function() {
    // alert auto hide-------------------------------------
    $(".alert").delay(4000).slideUp(200, function() {
        $(this).alert('close');
  });
});
</script>
</body>

</html>`)

});

hbs.registerHelper("discountAccessAuth",(data)=>{
    console.log("data",data)

    if(data.created_by !=='super_admin'){
        if(data.user_type == 'shop' && data.created_by =='shop'){
            return new handlebars.SafeString(`
            <button id="viewButton" data-bs-toggle="modal" data-bs-target="#singleCity"  class="btn btn-primary" 
                                        onclick="getDatasetValue(this)"  data-id="${data.id}" data-expired_in="${data.expired_in}" data-name="${data.name}" data-usertype="${data.user_type}" data-discountpercent="${data.discount_percent}" data-status="${data.isactive}"
                                                class="btn btn-primary mr-3">View</button><a
                                                href="/shop/promotion/order/${data.id}"
                                                class="btn btn-dark">Order list</a>`)
        }else{
            return new handlebars.SafeString(`
        <button id="viewButton" data-bs-toggle="modal" data-bs-target="#singleCity"  class="btn btn-primary" 
                                    onclick="getDatasetValue(this)"  data-id="${data.id}" data-expired_in="${data.expired_in}" data-name="${data.name}" data-usertype="${data.user_type}" data-discountpercent="${data.discount_percent}" data-status="${data.isactive}"
                                            class="btn btn-primary mr-3">View</button><a
                                            href="/shop/promotion/users/${data.id}"
                                            class="btn btn-secondary" id="userListButton">User list</a><button id="addUserButton" class="btn btn-info mr-3" data-bs-toggle="modal" data-discountpercent="${data.discount_percent}" data-bs-target="#adduser" data-id="${data.id}" data-name="${data.name}"  onclick="getDatasetValueAddUser(this)">Add User</button><a
                                            href="/shop/promotion/order/${data.id}"
                                            class="btn btn-dark">Order list</a>`)
        }
       
    }else{
        return new handlebars.SafeString(`<a href="/shop/promotion/order/${data.id}"
                                                class="btn btn-dark">Order list</a>`)
    }
    
    
})
hbs.registerHelper("discountAccessAuthAdmin",(data)=>{
    console.log("data",data)

        if(data.created_by =='super_admin'){
            return new handlebars.SafeString(`<button data-bs-toggle="modal" data-bs-target="#singleCity"  class="btn btn-primary" 
            onclick="getDatasetValue(this)" data-id="${data.id}" data-expired_in="${data.expired_in}" data-iscontributed=${data.iscontributed} data-contribution_percent=${data.contribution_percent} data-name="${data.name}" data-usertype="${data.user_type}" data-discountpercent="${data.discount_percent}" data-status="${data.isactive}"
                    class="btn btn-primary mr-3">View</button><a
                    href="/admin/promotion/users/${data.id}"
                    class="btn btn-secondary">Shop list</a><button class="btn btn-info mr-3" data-bs-toggle="modal" data-discountpercent="${data.discount_percent}" data-bs-target="#adduser" data-id="${data.id}" data-name="${data.name}"  onclick="getDatasetValueAddUser(this)">Add User</button><a href="/admin/promotion/order/${data.id}"
                    class="btn btn-dark">Order list</a>`)
        }else{
         return new handlebars.SafeString(`
               <button id="viewButton" data-bs-toggle="modal" data-bs-target="#singleCity"  class="btn btn-primary" 
                                    onclick="getDatasetValue(this)"  data-id="${data.id}" data-expired_in="${data.expired_in}" data-iscontributed=${data.iscontributed} data-contribution_percent=${data.contribution_percent} data-name="${data.name}" data-usertype="${data.user_type}" data-discountpercent="${data.discount_percent}" data-status="${data.isactive}"
                                            class="btn btn-primary mr-3">View</button><a href="/admin/promotion/order/${data.id}"
                                            class="btn btn-dark">Order list</a>`)                                            
        }
       
   
    
    
})
// showing discount on single shop price page
hbs.registerHelper("ShopDiscountShowOrNot",(data,datatwo,shopid)=>{
    console.log("customer discount:",datatwo.length)
   if(datatwo.length>0){
    for(let i =0;i<datatwo.length;i++){
        if(datatwo[i].discount !==null){
            if(datatwo[i].discount.isactive === true && shopid === datatwo[i].discount.user_id){
                return new handlebars.SafeString(`
                <div class="countdown_wrapper">
                   <h6>Only for you till -<span class="badge bg-info text-dark">${datatwo[i].discount.expired_in} 11:59 AM</span></h6>
                    <input type="hidden" value="${datatwo[i].discount.expired_in}" id="expired_in">
                </div>
                <div class="discount_wrapper_for_shop shadow-sm">
                 <span>Off:${datatwo[i].discount.discount_percent} %</span>
                </div>
          `)
             }
        }
         
    }
   }
   if(data.length>0){
        for(let i =0;i<data.length;i++){
            if(data[i].discount !==null){
                if(data[i].discount.isactive === true){
                    return new handlebars.SafeString(`
                    <div class="countdown_wrapper">
                        <span id="demo"></span>	
                        <input type="hidden" value="${data[i].discount.expired_in}" id="expired_in">
                    </div>
                    <div class="discount_wrapper_for_shop shadow-sm">
                     <span>Off:${data[i].discount.discount_percent} %</span>
                    </div>
              `)
                 }
            }
             
        }
    }

})

hbs.registerHelper("ShopDiscountShowOrNotINPricePage",(data,datatwo,shopid)=>{

    console.log("data in register helper for customer:",datatwo,shopid)
    console.log("data in register helper for general:",data,shopid)
    if(datatwo.length>0){
        for(let i =0;i<datatwo.length;i++){
            if(datatwo[i].discount !==null){
                if(datatwo[i].discount.isactive === true && shopid === datatwo[i].discount.user_id){
                    
                    return new handlebars.SafeString(`
                    <h1 class="font-weight-bold text-danger">${datatwo[i].discount.name}</h1>
                    <p class="font-weight-light"><strong class="text-danger">${datatwo[i].discount.discount_percent}%</strong> Discount on your order</p>
                    <input type="hidden" value="${datatwo[i].discount.id}" id="discount_id_hidden"/>
                    <span id="demo" style="color:red;font-weight:bold"></span>	
                    <input type="hidden" value="${datatwo[i].discount.expired_in}" id="expired_in">
              `)
                 }else{
                    if(data.length>0){
                        console.log("inside else statement")
                        for(let i =0;i<data.length;i++){
                             if(data[i].discount !==null){
                                 if(data[i].discount.isactive === true){
                                    return new handlebars.SafeString(`<h1 class="font-weight-bold text-danger">${data[i].discount.name}</h1>
                                    <p class="font-weight-light"><strong class="text-danger">${data[i].discount.discount_percent}%</strong> Discount on your order</p>
                                    <input type="hidden" value="${data[i].discount.id}" id="discount_id_hidden"/>
                                    <span id="demo" style="color:red;font-weight:bold"></span>	
                                    <input type="hidden" value="${data[i].discount.expired_in}" id="expired_in">
                                  `)
                                 }
                               
                             }
                        }
                         
                        // data.map((item,idx)=>{
                        //     console.log("single item:",item.discount)
                        //     if(item.discount !== null){
                        //         console.log("discount length:",item.discount.length)
                        //         console.log("data from partial",item.discount)
                                 
                        //     //     if(item.discount.isactive === true){
                                    
                        //     //    }
                        //     }
                            
                        // })
                    }
                 }
            }
             
        }
     }
     else{
        if(data.length>0){
            console.log("inside else statement")
            for(let i =0;i<data.length;i++){
                 if(data[i].discount !==null){
                     if(data[i].discount.isactive === true){
                        return new handlebars.SafeString(`<h1 class="font-weight-bold text-danger">${data[i].discount.name}</h1>
                        <p class="font-weight-light"><strong class="text-danger">${data[i].discount.discount_percent}%</strong> Discount on your order</p>
                        <input type="hidden" value="${data[i].discount.id}" id="discount_id_hidden"/>
                        <span id="demo" style="color:red;font-weight:bold"></span>	
                        <input type="hidden" value="${data[i].discount.expired_in}" id="expired_in">
                      `)
                     }
                   
                 }
            }
             
            // data.map((item,idx)=>{
            //     console.log("single item:",item.discount)
            //     if(item.discount !== null){
            //         console.log("discount length:",item.discount.length)
            //         console.log("data from partial",item.discount)
                     
            //     //     if(item.discount.isactive === true){
                        
            //     //    }
            //     }
                
            // })
        }
     }
  
   

})
// discount detils display in cart page
hbs.registerHelper("DiscountDetailsDisplayInCartPage",(data)=>{
    console.log("data in register helper:",data)
    if(data.isactive === true){
        return new handlebars.SafeString(`
        <tr class="cart-subtotal">									
            <td class="border-top-0">
                <strong class="text-secondary">(${data.name}-${data.discount_percent}% off)</strong>
                <input type="hidden" value="${data.discount_percent}" id="discount_percent_in_cart_page">
            </td>
       </tr>
        <tr class="cart-subtotal">
            <td class="border-top-0">
                <strong class="text-color-dark">Subtotal</strong>
                <small class="text-color-danger d-block">After calculating Discount</small>
            </td>
            <td class="border-top-0 text-end">
                <strong>৳<span class="amount font-weight-medium subtotalAfterDiscount"></span></strong>
            </td>
        </tr>
      `)
     }
     else{
        return new handlebars.SafeString(`
        <tr class="cart-subtotal">									
            <td class="border-top-0">
                
                <input type="hidden" value="0" id="discount_percent_in_cart_page">
            </td>
       </tr>
        <tr class="cart-subtotal d-none">
            <td class="border-top-0">
                <strong class="text-color-dark">Subtotal</strong>
                <small class="text-color-danger d-block">After calculating Discount</small>
            </td>
            <td class="border-top-0 text-end">
                <strong>৳<span class="amount font-weight-medium subtotalAfterDiscount"></span></strong>
            </td>
        </tr>
      `)
     }

})

// discount deadline expired countdown
hbs.registerHelper("discountCountDown",(expiredDate)=>{
    //console.log("expired Date:",expiredDate)
    if(expiredDate){
       		// Set the date we're counting down to
               var countDownDate = new Date(`${expiredDate}`).getTime();
              
               // Update the count down every 1 second
               var x = setInterval(function() {
               // Get today's date and time
               var now = new Date().getTime();
                   
               // Find the distance between now and the count down date
               var distance = countDownDate - now;
                   
               // Time calculations for days, hours, minutes and seconds
               var days = Math.floor(distance / (1000 * 60 * 60 * 24));
               var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
               var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
               var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                   
               // Output the result in an element with id="demo"
              
                   
               // If the count down is over, write some text 
            //    if (distance < 0) {
            //        clearInterval(x);
            //        return new handlebars.SafeString(`<span>EXPIRED</span>`)
            //    }else{
                
            //    }
                return {days,hours,minutes,seconds,distance}
                 
               },1000);
               console.log("x",x)
               return new handlebars.SafeString(`<span>${x.days}d:${x.hours}h:${x.minutes}m:${x.seconds}s</span>`)
        
    }

})


// accpet/reject/pending
hbs.registerHelper("discountExpiredOrNot",(expired_in)=>{
    console.log("expired_in",expired_in)
 
        var countDownDate = new Date(`${expired_in}`).getTime();
        var now = new Date().getTime();      
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        if (distance < 0) {        
            return new handlebars.SafeString(`<span class="badge bg-danger">Expired</span>`)
        }else{
            return new handlebars.SafeString(`<span class="badge bg-secondary">${expired_in}</span>`)
            
        }
    
    
  })

// accpet/reject/pending
hbs.registerHelper("ChatBoxMessageDisplay",(data)=>{
    if(data.receiver == 'shop'){
      return new handlebars.SafeString(`<li class="d-flex   receiver m-2 p-3" style="background-color: #f4f4f4; border-radius:5px"><img src="{{../userData.photo}}" style="height: 45px;width:45px;border-radius: 50%; margin:0px 5px" alt="" onerror="this.onerror=null; this.src='/assets_old/img/default.jpg'"><p>${data.message} <span class="d-block">11.30</span></p></li>`)  
    }else{
        return new handlebars.SafeString(` <li class="d-flex  justify-content-between sender m-2 p-3 text-end" style="background-color: #cfcfcfcc; border-radius:5px"><p>${data.message}<span class="d-block">11.30</span></p><img src="" alt="" style="height: 45px;width:45px;border-radius: 50%; margin:0px 5px" onerror="this.onerror=null; this.src='/assets_old/img/default.jpg'"></li>`)
    }

    
  })


  // accpet/reject/pending
hbs.registerHelper("ChatBoxMessageDisplayInCustomer",(data)=>{
    if(data.receiver == 'customer'){
      return new handlebars.SafeString(`
      <div class="chat-log_item chat-log_item z-depth-0">
          <div class="row justify-content-end mx-1 d-flex">
          <div class="col-auto px-0">
              <span class="chat-log_author">
              @MJavadSF
              </span>
          </div>
          <div class="col-auto px-0">
          </div>
          </div>
          <hr class="my-1 py-0 col-8" style="opacity: 0.5">
          <div class="chat-log_message">
          <p>${data.message}
          </p>
          </div>
          <hr class="my-1 py-0 col-8" style="opacity: 0.5">
          <div class="row chat-log_time m-0 p-0 justify-content-end">
          ${data.createdAt}
          </div>
      </div>`)  
    }else{
        return new handlebars.SafeString(` 
        <div class="chat-log_item chat-log_item-own z-depth-0">
            <div class="row justify-content-end mx-1 d-flex">
            <div class="col-auto px-0">
                <span class="chat-log_author">
                @James
                </span>
            </div>
            <div class="col-auto px-0">
            </div>
            </div>
            <hr class="my-1 py-0 col-8" style="opacity: 0.5">
            <div class="chat-log_message">
              <p>${data.message}</p>
            </div>
            <hr class="my-1 py-0 col-8" style="opacity: 0.5">
            <div class="row chat-log_time m-0 p-0 justify-content-end">
               ${data.createdAt}
            </div>
        </div>        
        `)
    }

    
  })
// --------------------------------------ecall-end-------------------------------------------------------------
