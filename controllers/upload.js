module.exports = { uploading }
const fs = require('fs')

function uploading(req,res)
{
   //finds original file extension
   let ext = req.file.mimetype.split('/');
   //file name assigned by multer in (images) directory
   let oldn = './' + req.file.path;
   //file name with original extention added
   let newn = oldn + '.' + ext[1];
   //redirecting and renaming and then assigning pic stuff
   res.redirect('/');
   fs.rename(oldn, newn, function(err) {if(err)throw err});
   res.json(req.file);
}
//
//this is a template for the form needed to submit pics.
// !the form must include enctype="multipart/form-data" in order for image to properly upload
//
{/* <form action="/upload" method="post" enctype="multipart/form-data">
   <input type="file" accept="image/*" name="photo" />
   <input type="submit" value="upload" />
</form> */}
