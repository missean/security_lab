/********************************************************************************/
/*										*/
/*		memos.js							*/
/*										*/
/*	Handle memos pages							*/
/*										*/
/********************************************************************************/


var db = require("./database.js");



/********************************************************************************/
/*										*/
/*	Hnadle adding a memo							*/
/*										*/
/********************************************************************************/

function addMemos(req,res,next)
{
   var memo = escapeHTML(req.body.memo);
   var q = "INSERT INTO Memos(memo) VALUES ( '" + memo + "' )";
   db.query(q,function(e1,d1) { addMemos1(req,res,next,e1,d1); });
}

function escapeHTML (unsafe_str) {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
}




function addMemos1(req,res,next,err,data)
{
   if (err) return next(err);

   displayMemos(req,res,next);
}




/********************************************************************************/
/*										*/
/*	Handle displaying memos 						*/
/*										*/
/********************************************************************************/

function displayMemos(req,res,next)
{
   var q = "SELECT * FROM Memos ORDER BY memotime DESC";
   db.query(q,function (e1,d1) { displayMemos1(req,res,next,e1,d1); } );
}



function displayMemos1(req,res,next,err,data)
{
    if (err) next(err);

    var doc = { memosList: data.rows, userId : req.session.userId };

    return res.render("memos",doc);
}



/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/

exports.addMemos = addMemos;
exports.displayMemos = displayMemos;




/* end of memos.js */
