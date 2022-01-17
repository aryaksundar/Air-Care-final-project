var express = require("express");
var router = express.Router();
const {check,validationResult} = require('express-validator');
const multi_upload = require("../middleware/upload");
const { json } = require("express");
const brand = require("../models/brand");
var helper = require("../helpers/helper");
var login_md = require('../models/login');
var brand_md = require("../models/brand");
var tech_md = require("../models/tech");
var prdt_md= require("../models/prdt");
var comp_md= require("../models/comp");
const tech = require("../models/tech");
const comp = require("../models/comp");


console.log('welcome');
router.get('/index', function (err, res) {
    res.render("admin/index");
})
router.get('/login', function (err, res) {
    res.render("admin/login");
})
router.get('/contactform', function (err, res) {
    res.render("admin/contactform");
})
router.get('/form_validation', function (err, res) {
    res.render("admin/form_validation");
})
router.get('/general', function (err, res) {
    res.render("admin/general");
})
router.get('/profile', function (err, res) {
    res.render("admin/profile");
})
router.get('/todo_list', function (err, res) {
    res.render("admin/todo_list");
})
router.get('/mail_compose', function (err, res) {
    res.render("admin/mail_compose");
})
router.get('/mail_view', function (err, res) {
    res.render("admin/mail_view");
})
router.get('/mail_inbox', function (err, res) {
    res.render("admin/mail_inbox");
})
router.get('/chat', function (err, res) {
    res.render("admin/chat");
})
router.get('/google_maps', function (err, res) {
    res.render("admin/google_maps");
})

router.get('/billgeneration_maintenance', function (err, res) {
    res.render("admin/billgeneration_maintenance");
})
router.get("/billgeneration_delivery", function (err, res) {
    res.render("admin/billgeneration_delivery");
})
router.get('/salary', function (err, res) {
    res.render("admin/salary");
})

router.get('/del_management', function (err, res) {
    res.render("admin/del_management");
})
router.get('/main_management', function (err, res) {
    res.render("admin/main_management");
})
router.get('/pay_delivery', function (err, res) {
    res.render("admin/pay_delivery");
})
router.get('/paydelivery_individual', function (err, res) {
    res.render("admin/paydelivery_individual");
})
router.get('/check_pay', function (err, res) {
    res.render("admin/check_pay");
})
router.get('/notification', function (err, res) {
    res.render("admin/notification");
})
router.get('/morris', function (err, res) {
    res.render("admin/morris");
})
router.get('/chart', function (err, res) {
    res.render("admin/chart");
})
router.get('/flot_chart', function (err, res) {
    res.render("admin/flot_chart");
})
router.get('/register', function (err, res) {
    res.render("admin/register",{ data: { }});
})

router.post('/login', function (req, res) {
    //console.log(req.body);
    //console.log(req.body.username);
    var uname=req.body.username;
    var pword=req.body.password;
    console.log(uname);
    console.log(pword);
user = {
                email : uname,
                password : pword,
                             
            };
            login_md.addUser(user);
 
            res.render("web/login", { data: { error: "Please enter your username",username: uname,password: pword } });
})


router.get("/addcat", function (req, res) {
    console.log('addddd');
    if (req.session.admin) {
      
        // res.json({"message": "This is Admin Page"});
        var data = brand_md.getcate();
        console.log(data);
        data.then(function (cate) {
            var data = {
                cate: cate,
                error: false
            };
           // console.log('abccccc'+ JSON.stringify(data));
            res.render("admin/addcat", { data: data });
        }).catch(function (err) {
            res.render("admin/addcat", { data: { error: "Get Post data is Error" } });
        });
    } else {
        res.redirect("/admin/addcat");
    }
});


router.post("/addcat",[
  check('categoryname', 'category name is required').not().isEmpty()
  .trim(),
], function (req, res, next) {
 const result= validationResult(req);
      var errors = result.errors;
        var form_values = req.body;
       console.log(form_values);
    for (var key in errors) {
            console.log(errors[key].value);
      }
          if (!result.isEmpty()) {
            res.render("admin/addcat", { errors });
          }else{
          categorydet = {
                categoryname: form_values.categoryname,
                parent : form_values.parent_category_name,
               };
               
            var results = brand_md.category(categorydet);
            results.then((errors) => {
                res.redirect("/admin/addcat");
            }).catch((err) => {
                console.log(err);
                res.render("admin/addcat", { errors: { error: 'Error' } });
            })
 }
})


router.get("/addprdt", function (req, res) {
    if (req.session.admin) {
      // res.json({"message": "This is Admin Page"});
        var data = prdt_md.getprdt();
        console.log(data);
        data.then(function (prdt) {
            var data = {
                prdt : prdt,
                error: false
            };
            res.render("admin/addprdt", { data: data });
        }).catch(function (err) {
            res.render("admin/addprdt", { data: { error: "Get Post data is Error" } });
        });
    } else {
        res.redirect("/admin/addprdt");
    }
});


router.post("/addprdt",async function (req, res, next) {
 //const result= validationResult(req);
 var photos = '';

     //   var errors = result.errors;
        await multi_upload(req, res);
          
        var form_values = req.body;
       console.log(form_values);
    // for (var key in errors) {
    //         console.log(errors[key].value);
    //   }
    //   if (req.files.length <= 0) {
    //     return res.send(`You must select at least 1 file.`);
    //   }

    var photos = req.files;
    console.log(req.files);
    
    val ={
    categorys:'' }

        
         // if (!result.isEmpty()) {
         
            //  res.render("admin/addprdt", {data: '', errors });
         // }else{
          prdtdet = {
                
                brname : form_values.bname,
                brandname : form_values.mname,
                brmodcode : form_values.mcode,
                color : form_values.color,
                dim : form_values.dim,
                weight : form_values.weight,
                unitinstock : form_values.unitinstock,
                insold : form_values.insold,
                brperunit : form_values.brperunit,
                wperiod :form_values.warranty,
                categoryname: form_values.parent_category_name,
                parent : form_values.categoryname,
                warsum : form_values.warsum,
               
            };
               
            var results = prdt_md.product(prdtdet,photos);

            results.then((errors) => {
                res.redirect("/admin/addprdt");
            }).catch((err) => {
                console.log(err);
                res.render("admin/addprdt", { errors: {data : '', error: 'Error' } });
            })
              //    }
})


router.get("/approvaltech", function (req, res) {
    console.log('addddd');
    if (req.session.admin) {
    
      
     //res.json({"message": "This is Admin Page"});
        var data = tech_md.gettechn();
        console.log(data);
        data.then(function (techn) {
            var data = {
                techn : techn,
                error: false
            };
            //console.log('abccccc'+ JSON.stringify(data));
            res.render("admin/approvaltech", { data: data });
        }).catch(function (err) {
            res.render("admin/approvaltech", { data: { error: "Get Post data is Error" } });
        });
    } else {
        res.redirect("/admin/approvaltech");
    }
});

router.get("/brandlist", function (req, res) {
    console.log('addddd');
    if (req.session.admin) {
    
      
    // res.json({"message": "This is Admin Page"});
        var data = prdt_md.brandlist();
        console.log(data);
        data.then(function (brlist) {
            var data = {
                brlist : brlist,
                error: false
            };
           // console.log('abccccc'+ JSON.stringify(data));
            res.render("admin/brandlist", { data: data });
        }).catch(function (err) {
            res.render("admin/brandlist", { data: { error: "Get Post data is Error" } });
        });
    } else {
        res.redirect("/admin/brandlist");
    }
});


router.get("/techindividual/:id", function (req, res) {
    if (req.session.admin) {
     var tid =  req.params.id;
        // res.json({"message": "This is Admin Page"});
        var data = tech_md.gettechndetails(tid);
        console.log(data);
        data.then(function (techn) {
            var data = {
                techn : techn,
                error: false
            };
           // console.log('abccccc'+ JSON.stringify(data));
            res.render("admin/techindividual", { data: data });
        }).catch(function (err) {
            res.render("admin/techindividual", { data: { error: "Get Post data is Error" } });
        });
    } else {
        res.redirect("/admin/techindividual");
    }
});

router.post('/techindividual', function (req, res) {
 var tid=req.body.techid;
 console.log(tid);
 

//   tech = {
//                 id : tid,
//                 status : '1' ,          
//             };
           
            tech_md.apprtech(tid);
         res.redirect("/admin/approvaltech");
        //   res.render("admin/techindividual");
})

router.get("/updateprdt/:id", function (req, res) {
    console.log('addddd');
    if (req.session.admin) {
     var uid = req.params.id;
        // res.json({"message": "This is Admin Page"});
        var data = prdt_md.getbrandind(uid);
        console.log(data);
        data.then(function (brandind) {
            var data = {
                brandind : brandind,
                error: false
            };
            console.log('abccccc'+ JSON.stringify(data));
            res.render("admin/updateprdt", { data: data });
        }).catch(function (err) {
            res.render("admin/updateprdt", { data: { error: "Get Post data is Error" } });
        });
    } else {
        res.redirect("/admin/updateprdt");
    }
});

router.post('/updateprdt', function(req,res) {
  var upid = req.body.bid;
  var ust = req.body.ustock;
  var ins = req.body.insold;
  var brp = req.body.bprice;
  console.log(upid);
  console.log(ust);
  console.log(ins);
  console.log(brp);
  var sts = 1;

            bd= {
                brid : upid,
                unitinstock : ust,
                insold : ins,
                brperunit : brp,
                status : '1'
                             
            };
            prdt_md.updatebrand(bd);
            res.redirect("/admin/brandlist");
         //  res.render("admin/updateprdt", { data:bd });
})

router.get("/view_comp", function (req, res) {
    if (req.session.admin) {
      // res.json({"message": "This is Admin Page"});
        var data = comp_md.viewcomp();
        console.log(data);
        data.then(function (comp) {
            var data = {
                comp : comp,
                error: false
            };
            res.render("admin/view_comp", { data: data });
        }).catch(function (err) {
            res.render("admin/view_comp", { data: { error: "Get Post data is Error" } });
        });
    } else {
        res.redirect("/admin/view_comp");
    }
});
// router.get("/viewcompind/:compid", function (req, res) {
//     if (req.session.admin) {
//         var tid=req.params.compid;
//       // res.json({"message": "This is Admin Page"});
//         var data = comp_md.viewcompind(tid);
//         console.log(data);
//         data.then(function (compind) {
//             var data = {
//                 compind : compind,
//                 error: false
//             };
//             res.render("admin/viewcompind", { data: data });
//         }).catch(function (err) {
//             res.render("admin/viewcompind", { data: { error: "Get Post data is Error" } });
//         });
//     } else {
//         res.redirect("/admin/viewcompind");
//     }
// });

router.get("/viewcompind/:compid", function (req, res) {
    // res.json({"message": "This is Admin Page"});
    if (req.session.admin) {
        var tid=req.params.compid;
       

        var data = comp_md.viewcompind(tid);
        console.log(data);
        var data1 = comp_md.techind();
        console.log(data1);
        
        data.then(function (compind) {
            var data = {
                compind : compind,
                error: false
            };
            data1.then(function (tech) {
                var data1 = {
                    tech : tech,
                    error: false
                };

                      res.render("admin/viewcompind", { data: data,data1 : data1});
    
          });
          });
          
        }
  })
  router.post('/viewcompind', function(req,res) {
    var fid = req.body.compid;
    var teid = req.body.techname;
    console.log(fid);
    console.log(teid);
  
    asscomp= {
                compid : fid,
                techid : teid,
             };
           comp_md.assigncomplaint(asscomp);
         res.render("admin/viewcompind");
         res.redirect("/admin/view_comp");
})

// router.post('/viewcompind', function(req,res) {
   
//     var teid = req.body.tid;
//     td = {
//         techid : teid
//     };
//     comp_md.postcomp(td);

//     var fid = req.body.compid;
//     var teid = req.body.tid;
//     console.log(fid);
//     var sts = 1;

//             fd= {
//                 compid : fid,
//                 status : '1'
                             
//             };
//             comp_md.savecomp(fd);
//             res.redirect("/admin/view_comp");
//            res.render("admin/viewcompind", { data : fd,td });
// })

router.get('/vieworder/:order_id', function (req, res) {
    console.log('addddd');
    if (req.session.admin) {
        var oid = req.params.order_id;
      // res.json({"message": "This is Admin Page"});
        var data = login_md.orderindividual(oid);
        console.log(data);
        data.then(function (orderind) {
            var data = {
                orderind : orderind,
                error: false
            };
            res.render("admin/vieworder", { data: data });
            
        }).catch(function (err) {
            res.render("admin/vieworder", { data: { error: "Get Post data is Error" } });
        });
    } 
});
router.post('/vieworder', function(req,res) {
  var fid = req.body.orderid;
  console.log(fid);
  var sts = 1;

            fd = {
                order_id : fid,
                order_status : 1,
                             
            };
            console.log("add");
            login_md.updateorder(fd);
            res.redirect("/admin/order");
           res.render("admin/vieworder", { data:fd });
})

router.get('/order', function (req, res) {
    console.log('addddd');
    if (req.session.admin) {
      // res.json({"message": "This is Admin Page"});
        var data = login_md.orderdet();
        console.log(data);
        data.then(function (order) {
            var data = {
                order : order,
                error: false
            };
            res.render("admin/order", { data: data });
            
        }).catch(function (err) {
            res.render("admin/order", { data: { error: "Get Post data is Error" } });
        });
    } 
});

router.get("/bill_generate/:compid", function (req, res) {
    console.log("add");
    var cid = req.params.compid;
      // res.json({"message": "This is Admin Page"});
       // var fid=req.session.technician.id;
        var data = comp_md.getworkupdation(cid);
        console.log(data);
        data.then(function (comp) {
            var data = {
                comp : comp,
                error: false
            };
            res.render("admin/bill_generate", { data : data });

            res.redirect("/admin/bill_generate")
        })
});

router.post('/updatelabourcharge', function(req,res) {
    var cid = req.body.cid;
    var amt = req.body.charge;
    console.log(amt);

  
              fd = {
                  charges : amt,
                  compid : cid,
                               
              };
              console.log("add");
              comp_md.updatelabourcharge(fd);
           res.redirect("/admin/updatelabourcharge");
        res.render("admin/updatelabourcharge", { data:fd });
  })

router.post('/check_pay', function (req, res) {
    console.log(req.body);
});



router.get("/testimonial", function (req, res) {
    console.log('addddd');
    if (req.session.admin) {
    
      
    // res.json({"message": "This is Admin Page"});
        var data = login_md.gettest();
        console.log(data);
        data.then(function (cust) {
            var data = {
                cust : cust,
                error: false
            };
           // console.log('abccccc'+ JSON.stringify(data));
            res.render("admin/testimonial", { data: data });
        }).catch(function (err) {
            res.render("admin/testimonial", { data: { error: "Get Post data is Error" } });
        });
    } else {
        res.redirect("/admin/testimonial");
    }
});


router.get('/logout',function(req,res){
    req.session.destroy();
    res.locals.admin="";
    res.redirect('/index');
  });

module.exports = router;