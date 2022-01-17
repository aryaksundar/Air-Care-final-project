var db = require("../common/database");
var q = require('q');

var conn = db.getConnection();

function getcate(){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM tb_category', function(err, cate) {
       // console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(cate);
        }
    });

    return defer.promise;
}



function category(user) {

    if (user) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO tb_category SET ?', user, function (err, result) {
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

function ProductsSearch11(pro) {
    var defer = q.defer();

        var sql ='SELECT * FROM tb_product,product_photos where tb_product.brid=product_photos.brandid  and tb_product.brname  LIKE"%'+pro+'%"  GROUP BY product_photos.photo_id  ORDER BY brperunit ASC';
       var query = conn.query(sql, function (err, users) {
       console.log(query);
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(users);
        }
    });

    return defer.promise;
}


function ProductsSearch(pro){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM tb_product,product_photos where tb_product.brid=product_photos.brandid  and tb_product.brname  LIKE"%'+pro+'%"  GROUP BY product_photos.photo_id  ORDER BY brperunit ASC', function(err, cate) {
       // console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(cate);
        }
    });

    return defer.promise;
}


module.exports = {
    getcate : getcate,
    category : category,
    ProductsSearch : ProductsSearch,
    
    
   }