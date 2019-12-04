import ProductModel from '../models/product.model'

export default {
    getAll : async(req, res) => {
        let products = await ProductModel.findAndCountAll()

        res.json({
            success : true,
            count : products.count,
            data : products.rows
        })
    },
    getById : async(req, res) => {
        const id = req.params.id

        let product = await ProductModel.findOne({ where : { id_product : id } })

        if (product == null) {
            return res.status(404).json({
                success : false,
                message : "Product not found"
            })
        }
        res.json({
            success : true,
            data : product
        })
    },
    create : async(req, res) => {
        if(!req.body.title || !req.body.description || !req.body.city || !req.body.province){
            return res.status(400).json({
                success : false,
                message : "Invalid data"
            })
        }

        let data = {
            title : req.body.title,
            description : req.body.description,
            city : req.body.city,
            province : req.body.province
        }

        let product = await ProductModel.create(data)
        res.json({
            success : true,
            data : product
        })
        
    },
    update : async(req, res) => {

        let updateData = {}
        if (req.body.title) updateData.title = req.body.title
        if (req.body.description) updateData.description = req.body.description
        if (req.body.city) updateData.city = req.body.city
        if (req.body.province) updateData.province = req.body.province

        if (updateData.length) return res.status(400).json({ success : false, message : "Data can't empthy" })
        updateData.updatedAt = Date.now()

        const id = req.params.id
        let update = await ProductModel.update(updateData, {
            where : {
                id_product : id
            },
            new : true
        })

        if (update[0] == 1) {
            res.json({
                success : true,
                message : "Data updated succefully"
            })
        }else{
            res.status(400).json({
                success : false,
                message : "Fail update data"
            })
        }
    },
    delete : async(req, res) => {
        const id = req.params.id

        let deleted = await ProductModel.destroy({ where : { id_product : id } })
        if (deleted == 0) {
            res.status(400).json({
                success : false,
                message : "Fail delete product"
            })
        }else if (deleted == 1) {
            res.json({
                success : true,
                message : "Success delete product"
            })
        }
    }
}