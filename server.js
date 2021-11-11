const fs = require('fs')
const express = require('express')
const multer = require('multer')

const listen = ({port = 3000, path: currentPath = './'}) => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    const upload = multer({ dest: currentPath })
    
    app.post('/', upload.single('file'), (req, res) => {
        const { path, originalname } = req.file
        fs.renameSync(path, `${currentPath}/${originalname}`)
        console.log({ file: req.file })
        res.status(201).json({ message: "ok" })
    })
    
    app.get('/:file', function(req, res){
        const { file } = req.params
        const src = `${currentPath}/${file}`
        res.download(src)
    })
    
    app.get('/', (_, res) => {
        fs.readdir(currentPath, (err, files) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(files)
            }
        })
    })

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port} and path ${currentPath}`)
    })
}

module.exports = { listen }

