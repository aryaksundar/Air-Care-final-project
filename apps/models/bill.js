var db = require("../common/database");
var q = require('q');

var conn = db.getConnection();

function viewbill(id){
    var defer = q.defer();

    var query = conn.query('SELECT * FROM workupdation,cust_det,complaint where cust_det.user_id=complaint.uid and complaint.compid=workupdation.compid and workupdation.compid='+id , function(err, compbook) {
        console.log(query);
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(compbook);
        }
 });

    return defer.promise;
}
module.exports = {
        viewbill : viewbill,
}
