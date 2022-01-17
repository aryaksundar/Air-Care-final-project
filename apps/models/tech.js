var db = require("../common/database");
var q = require('q');

var conn = db.getConnection();

function gettechn(){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM users_res where user_type="techn"', function(err, techn) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(techn);
        }
 });

    return defer.promise;
}

function gettechndetails(id){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM users_res,tech_det where users_res.id=tech_det.uid and users_res.user_type="techn" and id='+id, function(err, techn) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(techn);
        }
 });

    return defer.promise;
}

function apprtech(tech) {

    if (tech) {
        var defer = q.defer();

        var query = conn.query('UPDATE users_res SET mainstatus=1  WHERE id= ? ',[tech], function (err, result) {
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

function techprof(){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM tech_det', function(err, techn) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(techn);
        }
 });

    return defer.promise;
}


module.exports = {
    gettechn : gettechn,
    gettechndetails : gettechndetails,
    apprtech : apprtech,
    techprof : techprof,
    
    
    
   }