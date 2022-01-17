var db = require("../common/database");
var q = require('q');
const res = require("express/lib/response");

var conn = db.getConnection();


function addUser(user,tech,cust) {

    if (user) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO users_res SET ?', user, function (err, result) {
            console.log(query);
            if (err) {
                defer.reject(err);
            } else {
               
                var uid= result.insertId;
                tech_data = {
        
                    dob : tech.dob,
                    age : tech.age,
                    quali : tech.quali,
                    exp : tech.exp,
                    mobno: tech.mobno,
                    uid: uid,
                   
                };
                var query = conn.query('INSERT INTO tech_det SET ?', tech_data, function (err, result) {
                    console.log(query);
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

function getUserByEmail(email) {
    if (email) {
        var defer = q.defer();

        var query = conn.query('SELECT * FROM users_res WHERE  users_res.email="'+email+'"', function (err, result) {
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

/*
pin : pinc,
state : states,
city : citys,
hno : hnos,
bname : bnames,
rname : rnames,
pname : pnames,
areaname : areanames,
*/

function postuser(user,cust) {

    if (user) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO users_res SET ?', user, function (err, result) {
            console.log(query);
            if (err) {
                defer.reject(err);
            } else {
                var uid = result.insertId;
                console.log("afxhxc"+uid);
                   
                cust = {
                        user_id : uid,
                        pin :cust.pin,
                        state : cust.state,
                        phone : cust.phone,
                        city : cust.city,
                        hno : cust.hno,
                        bname : cust.bname,
                        rname : cust.rname,
                        areaname : cust.areaname,
                        pname : cust.pname,
                        


                    };
                var query1 = conn.query('INSERT INTO cust_det SET ?',cust, function (err, result) {
                console.log(query1);
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
           

function getpicture(cid) {


        var defer = q.defer();

        var query = conn.query('SELECT * FROM tb_product,tb_category,product_photos where tb_product.brid=product_photos.brandid and tb_product.categoryname=tb_category.id and tb_category.id="'+cid+'" GROUP by product_photos.photo_id limit 5'
      

        , function (err, result) {
           console.log(query);
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    

    return false;
}

function productdet(pid) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM tb_product,product_photos where tb_product.brid=product_photos.brandid and tb_product.brid="'+pid+'"', function (err, result) {
       console.log(query);
       
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });

    return defer.promise;


return false;
}
function prodint(id) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM tb_product,product_photos where tb_product.brid=product_photos.brandid and tb_product.brid="'+id+'"', function (err, result) {
       console.log(query);
       
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });

    return defer.promise;


return false;
}

function custprofile(id) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM users_res,tb_product,product_photos,cart where tb_product.brid=product_photos.brandid and tb_product.brid=cart.product_id and users_res.id=cart.user_id and users_res.id="'+id+'"', function (err, result) {
       console.log(query);
       
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });

    return defer.promise;
}

function postcust(cust) {

    if (cust){
        var defer = q.defer();

        var query = conn.query('INSERT INTO cust_det SET ?', cust, function (err, result) {
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

function getcustdet(hid){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM users_res,cust_det where users_res.id=cust_det.user_id and users_res.user_type="custo" and users_res.id='+hid, function(err, custo) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(custo);
        }
 });

    return defer.promise;
}


function postcart(carts) {

    if (carts){
        var defer = q.defer();

        var query = conn.query('INSERT INTO cart SET ?', carts, function (err, result) {
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

function profcust(id) {
    var defer = q.defer();

    var query = conn.query('SELECT * FROM users_res,tb_product,product_photos,orders,order_details where tb_product.brid=product_photos.brandid and orders.order_id = order_details.order_id and product_photos.brandid=order_details.product_id and users_res.id = order_details.user_id and users_res.id='+id, function(err, custo) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(custo);
        }
 });

    return defer.promise;
}

function orderdet() {
    var defer = q.defer();

    var query = conn.query('SELECT * FROM  orders,order_details where orders.order_id=order_details.order_id', function(err, custo) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(custo);
        }
 });

    return defer.promise;
}

function orderindividual(id) {
    var defer = q.defer();

    var query = conn.query('SELECT * FROM tb_product,product_photos,orders,order_details where tb_product.brid=product_photos.brandid and orders.order_id = order_details.order_id and product_photos.brandid=order_details.product_id and order_details.order_id='+id, function(err, custo) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(custo);
        }
 });

    return defer.promise;
}

function updateorder(order) {
       
    if(order){

        var defer = q.defer();

        var query = conn.query('UPDATE orders SET order_status=?  WHERE order_id= ? ',[order.order_status,order.order_id], function (err, result) {
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

function customerprofile(id) {
    var defer = q.defer();

    var query = conn.query('SELECT * FROM users_res,cust_det where users_res.id=cust_det.user_id and users_res.id='+id, function(err, custo) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(custo);
        }
 });

    return defer.promise;
    
    return false;
}


function postresponse(response) {

    if (response){
        var defer = q.defer();

        var query = conn.query('INSERT INTO testmonial SET ?', response, function (err, result) {
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

// function customerprofile1(id,cid) {
// var defer = q.defer();
// var query = conn.query('SELECT * FROM users_res,cust_det where users_res.id=cust_det.user_id and users_res.id='+id, function (err, result) {
//            console.log(query);
//             if (err) {
//                 defer.reject(err);
//             } else {
//                  var query2 = conn.query('SELECT * FROM users_res,tb_product,product_photos,cart where tb_product.brid=product_photos.brandid and tb_product.brid=cart.product_id and users_res.id="'+cid+'"', function (err, customer) {
           
//             if (err) {
//                 defer.reject(err);
//             } else {
//                 defer.resolve(customer);
//             }
//         });
//                 defer.resolve(result);
//             }
//         });

//         return defer.promise;
//     }


function gettest() {
   
        var defer = q.defer();

        var query = conn.query('SELECT * FROM testmonial', function (err, result) {
           console.log(query);
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
 



module.exports = {
    addUser: addUser,
    getUserByEmail: getUserByEmail,
    postuser : postuser,
    getpicture : getpicture,
    productdet : productdet,
    prodint : prodint,
    postcust : postcust,
    custprofile : custprofile,
    getcustdet : getcustdet,
    postcart : postcart,
    profcust : profcust,
    orderdet : orderdet,
    orderindividual : orderindividual,
    updateorder : updateorder,
    customerprofile : customerprofile,
    // customerprofile1 : customerprofile1,
    postresponse : postresponse,
    gettest : gettest,
   
   }

