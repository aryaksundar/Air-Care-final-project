var helper = require("../helpers/helper");
var login_md = require('../models/login');
var comp_md = require('../models/comp');
var cart_md = require('../models/cart');
var bill_md = require('../models/bill');
var brand_md = require('../models/brand');
var express = require("express");
var router = express.Router();
const {check,validationResult} = require('express-validator');
const { ContextHandlerImpl } = require("express-validator/src/chain");
console.log('welcome');


router.get("/", function (req, res) {
      // res.json({"message": "This is Admin Page"});
        var data = login_md.getpicture();
        console.log(data);
        var catblock = login_md.getpicture(46);
        console.log(data);
        var catblock2 = login_md.getpicture(50);
        console.log(data);
        var catblock3 =login_md.getpicture(67);
        console.log(data);
   
        
        
        data.then(function (photos) {
            var data = {
                photos : photos,
                error: false
            };
            catblock.then(function (productcat1) {
                var catblock = {
                    productcat1: productcat1,
                    error: false
                };
                catblock2.then(function (productcat2) {
                    var catblock2 = {
                        productcat2: productcat2,
                        error: false
                    };
                    catblock3.then(function (productcat3) {
                        var catblock3= {
                            productcat3: productcat3,
                            error: false
                        };
                   
                   
                    // console.log("cat1 product : " +  JSON.stringify(catblock));
                        res.render("web/home", { data: data,catblock : catblock,catblock2 : catblock2,catblock3 : catblock3});
            });
            });
            });
        });
            
    })
   
    
    router.get('/aboutus', function (err, res) {
    res.render("web/about");
})
router.get('/help', function (err, res) {
    res.render("web/help");
})
router.get('/product', function (err, res) {
    res.render("web/product");
})
router.get('/productnew', function (err, res) {
    res.render("web/productnew");
})
router.get('/contactus', function (err, res) {
    res.render("web/contact");
})

router.get('/payment/:amt', function (req, res) {
        var tamt = req.params.amt;
        console.log(tamt);
      //  res.render("web/payment");
        res.render("web/payment", { data: tamt });
})

router.get('/terms', function (err, res) {
    res.render("web/terms");
})
router.get('/privacy', function (err, res) {
    res.render("web/privacy");
})
router.get('/faq', function (err, res) {
    res.render("web/faq");
})
router.get('/service', function (err, res) {
    res.render("web/service");
})
router.get('/login', function (err, res) {
    res.render("web/login", { data: { }});                     
})
router.get('/register', function (err, res) {
    res.render("web/register",{ data: { }});
})
router.get('/techregister', function(err,res){
    res.render("web/techregister",{ data : {}});
})
router.get('/view', function (err, res) {
    res.render("web/view",{ data: { }});
})
router.get('/del_details', function (err, res) {
    res.render("web/del_details",{ data: { }});
})
router.get('/main_details', function (err, res) {
    res.render("web/main_details",{ data: { }});
})

router.get('/orderdet', function (err, res) {
    res.render("web/orderdet",{ data: { }});
})
router.get('/checkoutform', function (err, res) {
    res.render("web/checkoutform",{ data: { }});
})

router.get('/servicepay', function (err, res) {
    res.render("web/servicepay",{ data: { }});
})

router.get('/view', function (err, res) {
    
    res.render("web/view",{ data: { }});
})
router.get('/bill_category', function (err, res) {
    res.render("web/bill_category",{ data: { }});
})
router.get('/bill_delivery', function (err, res) {
    res.render("web/bill_delivery",{ data: { }});
})
router.get('/notification', function (err, res) {
    res.render("web/notification",{ data: { }});
})
router.get('/chat', function (err, res) {
    res.render("web/chat",{ data: { }});
})
router.get('/testmonial', function (err, res) {
    res.render("web/testmonial",{ data: { }});
})
//router.post('/login', function (req, res) {
    //console.log(req.body);
    //console.log(req.body.username);
    //var uname=req.body.username;
    //var pword=req.body.password;
    //console.log(uname);
    //console.log(pword);
// user = {
//                 email : uname,
//                 password : pword,
//             };
//             login_md.addUser(user);
 
//             res.render("web/login", { data: { error: "Please enter your username",username: uname,password: pword } });
// })

// router.get('/bookcomp', function (req, res) {
   
//     if(req.session.admin){

//     console.log(req.session.admin.email);
//     console.log(req.session.admin.first_name);
//     console.log(req.session.admin.last_name);
//     console.log(req.session.admin.password);
//     }
//     else{
//         console.log('notlogged');
//     }
   
//      res.render("web/bookcomp",{ data: { }});
// })

router.post("/login", function (req, res) {
    var params = req.body;

    if (params.username.trim().length == 0) {
        res.render("web/login", { data: { error: "Please enter an email" } });
       
    } else {
        var data = login_md.getUserByEmail(params.username);

        if (data) {
            data.then(function (users_res) {
                var user = users_res[0];

                var status = helper.compare_password(params.password, user.password);

                if (!status) {
          
res.render("web/login", { data: { error: "Password Wrong" } });
                } else {
                    
                    console.log("userdetails"+user);
                    if(user.user_type=='cl')
                    {
                      req.session.admin = user;
                      res.redirect("/admin/index");
                    }
                    else if(user.user_type=='techn')
                    {
                      req.session.technician = user;
                      res.redirect("/technician/index")
                    }
                    else if(user.user_type=='custo')
                    {
                      req.session.customer = user;
                      res.redirect("/");
                    }
                     console.log(user);

                    
                }
            });
        } else {
            res.render("web/login", { data: { error: "User not exists" } });
        }
    }
})
router.post('/register', function (req, res) {
   
    
    var fname=req.body.firstname;
    var lname=req.body.lastname;
    var email=req.body.email;
    var pword=req.body.password;
    var mnumber=req.body.mobilenumber;
    var pinc=req.body.pin;
    var states=req.body.state;       
    var citys=req.body.city;
    var hnos =req.body.hno;
    var bnames=req.body.bname;
    var rnames=req.body.rname;
    var pnames=req.body.pname;
    var areanames= req.body.areaname;
    
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(pword);
    console.log(mnumber);
    console.log(pinc);
    console.log(states);
    console.log(citys);
    console.log(hnos);
    console.log(bnames);
    console.log(rnames);
    console.log(pnames);
    console.log(areanames);
    var hpassword = helper.hash_password(pword);
    user = {
        first_name : fname,
        last_name : lname,
        email : email,
        password : hpassword,
        user_type : 'custo',
    };

    cust = {
       
        pin : pinc,
        state : states,
        city : citys,
        hno : hnos,
        phone : mnumber,
        bname : bnames,
        rname : rnames,
        pname : pnames,
        areaname : areanames,
    }
    login_md.postuser(user,cust);
    res.render("web/register",{ data: user,cust });
})

router.post('/techregister', function (req, res) {

    var fname=req.body.firstname;
    var lname=req.body.lastname;
    //var dob=req.body.dob;
    var userinput = req.body.dob;
    var dob = new Date(userinput);

        //calculate month difference from current date in time
        var month_diff = Date.now() - dob.getTime();
        //convert the calculated difference in date format
        var age_dt = new Date(month_diff); 
        //extract year from date    
        var year = age_dt.getUTCFullYear();
        //now calculate the age of the user
        var age = Math.abs(year - 1970);
        if(age<18){
            var age_err = "You are not qualified,age is less than 18 years";
            res.render("web/techregister",{ data: { error: age_err } });
            return;
        }
            
    // var age=req.body.age;
    var quali=req.body.qualification;
    var exp=req.body.experience;
    var email=req.body.email;
    var pword=req.body.password;
    var mob=req.body.mob;
    var gen = req.body.gender;
    console.log(fname);
    console.log(lname);
    console.log(dob);
    console.log(userinput);
    console.log(age);
    console.log(quali);
    console.log(exp);
    console.log(email);
    console.log(pword);
    console.log(mob);
    console.log(gen);

  
    var hpassword = helper.hash_password(pword);
    user = {
        first_name : fname,
        last_name : lname,
        email : email,
        password : hpassword,
        user_type : 'techn',
    };

    tech = {
        dob : dob,
        age : age,
        quali : quali,
        exp : exp,
        mobno: mob,
        gender : gen,
       
    };
    console.log(user);  
    login_md.addUser(user,tech);
    res.render("web/techregister",{ data: { error:age_err } });

})


// router.get("/bookcomp/:id", function (req, res) {
//     if (req.session.customer) {
//         var uid = req.session.customer.id;
//       // res.json({"message": "This is Admin Page"});
//         var data = comp_md.complaintbooking(uid);
//         console.log(data);
//         data.then(function (comp) {
//             var data = {
//                 comp : comp,
//                 error: false
//             };
//             res.render("web/bookcomp", { data: data });
//         }).catch(function (err) {
//             res.render("web/bookcomp", { data: { error: "Get Post data is Error" } });
//         });
//     } else {
//         res.redirect("/web/bookcomp");
//     }
// });

router.get('/bookcomp', function (err, res) {
    res.render("web/bookcomp",{ data: { }});
})

router.post('/bookcomp', function (req, res) {
    var uid = req.session.customer.id;
    var cate=req.body.ccate;
    var des=req.body.cdes;
    console.log(cate);
    console.log(des);
    console.log(uid);
comp = {
                compcat : cate,
                compdes : des,
                uid : uid,
                             
            };
            comp_md.postcomp(comp);
 
            res.render("web/bookcomp", { errors: {data : '', error: 'Error' } });
})

router.get('/prdtdet/:brid', function (req, res) {
    console.log('addddd');
    if (req.session.customer) {
        var tid = req.params.brid;
      // res.json({"message": "This is Admin Page"});
        var data = login_md.productdet(tid);
        console.log(data);
        data.then(function (product) {
            var data = {
                product : product,
                error: false
            };
            res.render("web/prdtdet", { data: data });
            
        }).catch(function (err) {
            res.render("web/prdtdet", { data: { error: "Get Post data is Error" } });
        });
    } 
});

router.post('/prdtdet', function (req, res) {
    var uid = req.session.customer.id;
    var pid = req.body.prdt_id;
    var qt = req.body.qty;
    console.log(pid);
    console.log(uid);
    console.log(qt);
cart={
                
                product_id : pid,
                user_id : uid,
                qty : qt,
                             
            };
            console.log("add");
            login_md.postcart(cart);
            res.render("web/prdtdet",{data : cart} );
            res.redirect("/cart");
})

router.get("/checkout", function (req, res) {
    // res.json({"message": "This is Admin Page"});
    if (req.session.customer) {
        var uid = req.session.customer.id;
        var data = login_md.custprofile(uid);
        var data1= login_md.getcustdet(uid);
        
      //  var data1 = cart_md.create_order();
       // console.log(data1);
 
        data.then(function (prdt) {
          var data = {
              prdt : prdt,
              error: false
          };
          data1.then(function (cust) {
              var data1 = {
                  cust : cust,
                  error: false
              };
              console.log("cat1 product : " +  JSON.stringify(data1));
                      res.render("web/checkout", { data: data, data1 : data1});
          });
        });
    }
 })
  

router.post('/checkout', function (req, res) {
        var uid = req.session.customer.id;
        console.log(uid);
        var em = req.body.email;
        var tprice = req.body.totalprice;
        const todaysDate = new Date();
        const deliverDate = new Date()+3;
        var year =todaysDate.getFullYear();
        var day =todaysDate.getDay;
        var month =todaysDate.getMonth;
        var cdate = year +''+month+'-'+day; 
        orderdet = {
            username : em,
            total_price: tprice,
            Orderdate : cdate,
            estimate_delivery_date : deliverDate,
        };
        var data = cart_md.create_order(orderdet);
        res.redirect('/payment/'+tprice);
        res.render("web/checkout",{data : data});
     })

       
  
        
// router.get("/checkoutform/:brid", function (req, res) {
//     // res.json({"message": "This is Admin Page"});
//       if(req.session.customer){
//       var tid = req.params.brid;
//       var uid = req.session.customer.id;

//       var data = login_md.custprofile(tid);
//       console.log(data);
//       var data1 = login_md.getcustdet(uid);
//       console.log(data1);
      
//       data.then(function (prdt) {
//           var data = {
//               prdt : prdt,
//               error: false
//           };
        
//           data1.then(function (cust) {
//               var data1 = {
//                   cust : cust,
//                   error: false
//               };
//                // console.log("cat1 product : " +  JSON.stringify(catblock));
//                       res.render("web/checkoutform", { data: data,data1 : data1});
//           });
//           });
//         }
//         })


        router.get('/cart', function (req, res) {
            console.log('addddd');
            if (req.session.customer) {
                var uid = req.session.customer.id;
             // res.json({"message": "This is Admin Page"});
                var data = login_md.custprofile(uid);
                console.log(data);
                data.then(function (product) {
                    var data = {
                        product : product,
                        error: false
                    };
                    res.render("web/cart", { data: data });
                }).catch(function (err) {
                    res.render("web/cart", { data: { error: "Get Post data is Error" } });
                });
            }
        });
      
        router.get("/delete_cart_item/:id", function (req, res) {
            if (req.session.customer) {
                var id = req.params.id;
                console.log("order id === " +id);
                // res.json({"message": "This is Admin Page"});
                var data = cart_md.deletecartitems(id);
                res.redirect("/cart");
        
            } else {
                res.redirect("/checkout");
            }
        });

        router.post("/updatecart", function (req, res) {
            if (req.session.customer) {
                var id = req.body.id;
                var qty = req.body.qty;
                // console.log("order id === " +id);
                // res.json({"message": "This is Admin Page"});
                var data = cart_md.updatecartitem(id,qty);
                res.redirect("/cart");
        
            } else {
                res.redirect("/cust_signin");
            }
        });
        
        // router.get('/myorders', function (req, res) {
        //     console.log('addddd');
        //     if (req.session.customer) {
        //         var tid = req.session.customer.id;
        //       // res.json({"message": "This is Admin Page"});
        //         var data = login_md.profcust(tid);
        //         console.log(data);
        //         data.then(function (cust) {
        //             var data = {
        //                 cust : cust,
        //                 error: false
        //             };
        //             res.render("web/myorders", { data: data });
                    
        //         }).catch(function (err) {
        //             res.render("web/myorders", { data: { error: "Get Post data is Error" } });
        //         });
        //     } 
        // });

        // router.get('/profile', function (req, res) {
        //     console.log('addddd');
        //     if (req.session.customer) {
        //         var tid = req.session.customer.id;
        //       // res.json({"message": "This is Admin Page"});
        //         var data = login_md.customerprofile(tid);
        //         console.log('abccccc'+ JSON.stringify(data));
        //         data.then(function (cust) {
        //             var data = {
        //                 cust : cust,
        //                 error: false
        //             };
                    
        //             res.render("web/profile", { data: data });
        //             }).catch(function (err) {
        //             res.render("web/profile", { data: { error: "Get Post data is Error" } });
        //         });
        //     } 
        // });
        
        router.get('/servicerequest', function (req, res) {
            console.log('addddd');
            if (req.session.customer) {
                var tid = req.session.customer.id;
              // res.json({"message": "This is Admin Page"});
                var data = comp_md.getcomp(tid);
                console.log(data);
                data.then(function (comp) {
                    var data = {
                        comp : comp,
                        error: false
                    };
                    res.render("web/servicerequest", { data: data });
                    
                }).catch(function (err) {
                    res.render("web/servicerequest", { data: { error: "Get Post data is Error" } });
                });
            } 
        });
        

        router.get('/viewbill/:compid', function (req, res) {
            console.log('addddd');
            if (req.session.customer) {
                var tid = req.params.compid;
              // res.json({"message": "This is Admin Page"});
                var data = bill_md.viewbill(tid);
                console.log(data);
                data.then(function (comp) {
                    var data = {
                        comp : comp,
                        error: false
                    };
                    res.render("web/viewbill", { data: data });
                    res.redirect("/servicepay");
                    
                }).catch(function (err) {
                    res.render("web/viewbill", { data: { error: "Get Post data is Error" } });
                });
            } 
        });

        router.post('/servicepay', function (req, res) {
                    var amt= req.body.charge;
                    console.log(amt);
                    res.redirect('/payment/'+amt);
        })
        router.post("/search", function(req, res){

            var formvals = req.body;
             var searchval =  formvals.pro;
     
             console.log(searchval);
            // var categoryval =  formvals.category;
  
              var data = brand_md.ProductsSearch(searchval);
             
              data.then(function (product) {
                var data = {
                    product: product,
                    error: false
                };
           
                console.log("CATTTTTTT" +  JSON.stringify(data));
             
              res.render("web/search", { data: data});
          }).catch(function (err) {
              res.render("web/search", { data: { error: "Get Post data is Error" } });
        
      });
     // res.render("web/index1");
  });

  router.post('/testmonial', function (req, res) {

    var cid = req.session.customer.id;
    var message=req.body.msg;
    console.log(message);
    console.log(cid);
    message = {
       userid : cid,
       description : message,
    };
    login_md.postresponse(message);

 res.render("web/testmonial",{ data: message });
})

router.get("/profile", function (req, res) {
    // res.json({"message": "This is Admin Page"});
    if (req.session.customer) {
        var uid = req.session.customer.id;
        var data = login_md.customerprofile(uid);
        var data1 = login_md.profcust(uid);
    
 
        data.then(function (cust) {
          var data = {
              cust : cust,
              error: false
          };
          data1.then(function (customer) {
              var data1 = {
                  customer : customer,
                  error: false
              };
            //   console.log("cat1 product : " +  JSON.stringify(data1));
                      res.render("web/profile", { data: data, data1 : data1});
          });
        });
    }
 })
  


router.get('/logout',function(req,res){
    req.session.destroy();
    res.locals.user="";
    res.redirect('/');
  });

  
module.exports = router;