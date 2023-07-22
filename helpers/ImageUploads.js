const multer = require('multer')
const path = require('path')

//destination to store the images
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ''
       
        if (req.baseUrl.includes('users')) {
            folder = 'user'
        } else if (req.baseUrl.includes('cars')){
            folder = 'cars'
        } else if (req.baseUrl.includes('assistance')){
            folder = 'assistance'
        }

        cb(null, `public/images/${folder}`)

    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
      if (!file.originalname.match(/\.(png|jpg)$/)) {
        return cb(new Error('Por favor envie apenas imagens jpg ou png.'))        
      }  
      cb(undefined, true)
    }
})
module.exports = { imageUpload }