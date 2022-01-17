var db = require("../common/database");
var q = require('q');

var conn = db.getConnection();


function create_order(orderdet,uid) {

    if (orderdet) {
        var defer = q.defer();
             var query = conn.query('INSERT INTO orders SET ?', orderdet, function (err, result) {
                 console.log(query)
            if (err) {
                defer.reject(err);
            } else {
  var order_id = result.insertId;
  var uid = result.insertId;
  var query4=conn.query("SELECT * FROM cart where cart.user_id="+uid, function (err, result) {
      console.log(query4);
    if (err) throw err;
        for (var i = 0; i < result.length; i++) {
       var row = result[i];
       console.log(row.product_id, "costs qty ", row.qty, "and its from category"  );
        cart_det = {
             
                product_id:row.product_id,
                qty:row.qty,
                user_id:uid,
                order_id: order_id

            };
  // console.log("cart ----  det    ------------ "+cart_det);
   // console.log("edata is tim tim  ===="+JSON.stringify(cart_det));

       var queryy = conn.query('INSERT INTO order_details SET ?', cart_det, function (err, result) {
            console.log(queryy);
            if (err) {
                defer.reject(err);
            } else {

            }
             });
}  
 
      });
             
                // var query3 = conn.query('UPDATE cart SET order_id = ? WHERE user_id = ?',
         //[order_id,   uid], function(err, result) {
            var query3 = conn.query('delete from cart where user_id='+uid, function(err, result) {
             console.log(query3);
            if(err){
                defer.reject(err);
            }else{
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


function deletecartitems(id){
    if(id){
        var defer = q.defer();

        var query = conn.query('DELETE FROM cart WHERE id = ? ', [id], function(err, result) {
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


function updatecartitem(id,qty){
    if(id){
        var defer = q.defer();


    var query =conn.query('UPDATE cart SET ? WHERE id = '+id , [{qty:qty}], function(err, result) {
       
 //console.log(query);
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




module.exports = {
    create_order : create_order,
    deletecartitems : deletecartitems,
    updatecartitem : updatecartitem,
    }

