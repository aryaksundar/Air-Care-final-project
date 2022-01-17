var helper = require("../helpers/helper");
var login_md = require('../models/login');
var comp_md = require('../models/comp');
var tech_md = require('../models/tech');
const {check,validationResult} = require('express-validator');
var express = require("express");
var router = express.Router();
router.get('/index', function (err, res) {
    res.render("technician/index");
});

router.get('/view', function (err, res) {
    res.render("technician/view");
});
router.get('/del_ser', function (err, res) {
    res.render("technician/del_ser");
});

router.get("/main_ser/:compid", function (req, res) {
    console.log("add");
    var cid = req.params.compid;
      // res.json({"message": "This is Admin Page"});
       // var fid=req.session.technician.id;
        var data1 = comp_md.techcompservice(cid);
        console.log(data1);
        data1.then(function (techcomp) {
            var data1 = {
                techcomp : techcomp,
                error: false
            };
            res.render("technician/main_ser", { data1 : data1 });

            res.redirect("/technician/workupdation")
        })
});

router.get("/workupdation/:compid", function (req, res) {
        var cid = req.params.compid;
      // res.json({"message": "This is Admin Page"});
       // var fid=req.session.technician.id;
        var data = comp_md.getcomp(cid);
        console.log(data);
        data.then(function (comp) {
            var data = {
                comp : comp,
                error: false
            };
            res.render("technician/workupdation", { data : data });

            res.redirect("/technician/workupdation")
        })
});

router.post('/workupdation', function (req, res) {

    var cmid = req.body.compid;
    var wrk= req.body.duration;
    var rec=req.body.compdes;
    var rem=req.body.remark;
    console.log(cmid);
    console.log(wrk);
    console.log(rec);
    console.log(rem);
   
    workupdate = {
                compid : cmid,
                work : wrk,
                compdes : rec,
                remark : rem,
               };
    
    updatework ={
                compid : cmid,
                status :'1'
               };
        comp_md.workupdationmodel(workupdate,updatework);
        res.redirect("/technician/workupdation/"+cmid)
       // res.render("technician/workupdation",{data : data});
     })

       

// router.post('/main_ser', function(req,res) {
//     var fid = req.body.cid;
//     console.log(fid);
//     var sts = 1;
    
//     maincomp= {
//                 compid : fid,
//                 status : '1'
//              };
//            comp_md.updatecompmain(maincomp);
//          res.render("technician/main_ser");
    
// })

// router.get("/main_ser/:id", function (req, res) {
//     // res.json({"message": "This is Admin Page"});
//       if(req.session.technician){
//       var tid = req.body.uid;
//       var hid = req.session.technician.id;

//       var data = comp_md.techmainservice(tid);
//       console.log(data);
//       var data1 = comp_md.techcompservice(hid);
//       console.log(data1);
      
//       data.then(function (techmain) {
//           var data = {
//               techmain : techmain,
//               error: false
//           };
        
//           data1.then(function (techcomp) {
//               var data1 = {
//                   techcomp : techcomp,
//                   error: false
//               };
//                // console.log("cat1 product : " +  JSON.stringify(catblock));
//                       res.render("web/checkoutform", { data: data,data1 : data1});
//           });
//           });
//         }
//         })

router.get("/maintainlist", function (req, res) {
    console.log("add");
      // res.json({"message": "This is Admin Page"});
        var techid=req.session.technician.id;
        var data = comp_md.maincomplist(techid);
        console.log(data);
        data.then(function (complist) {
            var data = {
                complist : complist,
                error: false
            };
            res.render("technician/maintainlist", { data : data });
        })
});

router.get("/profile", function (req, res) {
      // res.json({"message": "This is Admin Page"});
       
        var data1 = tech_md.techprof();
        console.log(data1);
        data1.then(function (techcomp) {
            var data1 = {
                techcomp : techcomp,
                error: false
            };
            res.render("technician/profile", { data1 : data1 });
        })
});

router.get('/logout',function(req,res){
    req.session.destroy();
    res.locals.technician="";
    res.redirect('/');
  });


module.exports = router;