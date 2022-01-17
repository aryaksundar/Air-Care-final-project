var db = require("../common/database");
var q = require('q');

var conn = db.getConnection();

function complaintbook(id){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM users_res,complaint where users_res.id=complaint.uid and users_res.user_type="custo" and id='+id , function(err, compbook) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(compbook);
        }
 });

    return defer.promise;
}

function postcomp(comp) {

    if (comp) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO complaint SET ?', comp, function (err, result) {
            console.log(query);
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    return false;
}

function viewcomp(){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM complaint', function(err, vcomp) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(vcomp);
        }
 });

    return defer.promise;
}

function viewcompind(id){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM users_res,complaint where users_res.id=complaint.uid and users_res.user_type="custo"  and compid='+id, function(err, compind) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(compind);
        }
 });

    return defer.promise;
}

function techind(){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM users_res where users_res.user_type="techn" ' , function(err,tech) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(tech);
        }
 });

    return defer.promise;
}

function savecomp(comp) {

    if (comp) {
        var defer = q.defer();

        var query = conn.query('UPDATE complaint SET status=?  WHERE compid= ? ',[comp.status,comp.compid], function (err, result) {
        console.log(query);
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    return false;
}

function assigncomplaint(asscomp) {

    if (asscomp) {
        var defer = q.defer();


                 var query2 = conn.query('UPDATE complaint SET techid= ?  WHERE compid= ?',[asscomp.techid,asscomp.compid], function (err, result)  {
           
                    if(err){
                        defer.reject(err);
                    }else{
                        defer.resolve(result);
                    }
                });
         
        
        return defer.promise;
    }
    return false;
}


// function techmainservice(){

//     var defer = q.defer();
//     var query = conn.query('SELECT * FROM users_res,cust_det where users_res.id=cust_det.user_id', function(err, techmain) {
//         console.log(query);
//         if(err){
//             defer.reject(err);
//         }else{
//             defer.resolve(techmain);
//         }
//  });

//     return defer.promise;
// }

function techcompservice(id){

    var defer = q.defer();
    var query = conn.query('SELECT * FROM users_res,complaint,cust_det where complaint.uid=cust_det.user_id and  users_res.id=complaint.uid and complaint.compid='+id, function(err, techcomp) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(techcomp);
        }
 });

    return defer.promise;
}



function maincomplist(id){

    var defer = q.defer();
    var query = conn.query('SELECT * FROM complaint where complaint.techid='+id, function(err,complist) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(complist);
        }
 });

    return defer.promise;
}

function updatecompmain(maincomp) {
    if(maincomp) {
        var defer = q.defer();


                 var query = conn.query('UPDATE complaint SET status = ?  WHERE compid= ?',[maincomp.status,maincomp.compid], function (err, result)  {
                   console.log(query);
                    if(err){
                        defer.reject(err);
                    }else{
                        defer.resolve(result);
                    }
                });
         
        
        return defer.promise;
    }
    return false;
}

function getcomp(cid){

    var defer = q.defer();
    var query = conn.query('SELECT * FROM complaint,users_res where complaint.uid=users_res.id and users_res.id='+cid,  function(err,complist) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(complist);
        }
 });

    return defer.promise;
}

function workupdationmodel(work) {

    if (work) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO workupdation SET ?',work, function (err, result) {
            console.log(query);
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    return false;
}

function getworkupdation(wid){

    var defer = q.defer();
    var query = conn.query('SELECT * FROM workupdation where workupdation.compid='+wid , function(err,complist) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(complist);
        }
 });

    return defer.promise;
}

function updatelabourcharge(charge) {
    if(charge) {
        var defer = q.defer();
var query = conn.query('UPDATE workupdation SET charges = ?  WHERE compid= ?',[charge.charges,charge.compid], function (err, result)  {
                   console.log(query);
                    if(err){
                        defer.reject(err);
                    }else{
                        defer.resolve(result);
      
                    }
                });
         
        
        return defer.promise;
    }
    return false;
}

function workupdationmodel(work,maincomp) {

    if (work) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO workupdation SET ?',work, function (err, result) {
           console.log(query);
            if (err) {
                defer.reject(err);
            } else {
                 var query2 = conn.query('UPDATE complaint SET status = ?  WHERE compid= ?',[maincomp.status,maincomp.compid], function (err, result) {
           
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    return false;
}




module.exports = {
    complaintbook : complaintbook,  
    postcomp : postcomp,
    viewcomp : viewcomp,
    viewcompind : viewcompind,
    savecomp : savecomp,
    techind : techind,
    assigncomplaint : assigncomplaint,
    // techmainservice : techmainservice,
    techcompservice : techcompservice,
    maincomplist : maincomplist,
    updatecompmain : updatecompmain,
    workupdationmodel : workupdationmodel,
    getcomp : getcomp,
    getworkupdation : getworkupdation,
    updatelabourcharge : updatelabourcharge
   }