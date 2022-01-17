var db = require("../common/database");
var q = require('q');

var conn = db.getConnection();

function getprdt(){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM tb_category', function(err, cate) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(cate);
        }
    });

    return defer.promise;
}



function product(user,photo) {

    if (user) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO tb_product SET ?', user, function (err, result) {
         console.log(query);
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
                var p_id = result.insertId;

                photo.forEach(function(photo){
             
                  console.log('event reg id det = '+ photo.filename);
                   product_photo = {

                          brandid : p_id,
                          photo_name: photo.filename,
                                                       
                         };
                      var query1 = conn.query('INSERT INTO product_photos SET ?', product_photo, function (err, result) {
                        if (err) {
                            defer.reject(err);
                        } else {
                            defer.resolve(result);
                        }
                    });
            // insert query end
        });

            }
        });

        return defer.promise;
    }
    return false;
}


function brandlist(){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM tb_product', function(err, brlist) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(brlist);
        }
 });

    return defer.promise;
}

function getbrandind(id){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM tb_product where brid='+id, function(err, brandind) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(brandind);
        }
 });

    return defer.promise;
}

function updatebrand(brand) {

    if (brand) {
        var defer = q.defer();

        var query = conn.query('UPDATE tb_product SET unitinstock=?,insold=?,brperunit=?,status=?  WHERE brid= ? ',[brand.unitinstock,brand.insold,brand.brperunit,brand.status,brand.brid], function (err, result) {
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
module.exports = {
    getprdt : getprdt,
    product : product,
    brandlist : brandlist,
    getbrandind : getbrandind,
    updatebrand : updatebrand,
   }