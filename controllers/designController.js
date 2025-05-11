const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;
const designModel = require("../model/designModel");
const userImageModel = require("../model/userImageModel");
const { mongo: { ObjectId } } = require("mongoose");

class designController {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    }

    parseForm(req) {
        return new Promise((resolve, reject) => {
            const form = formidable({ multiples: true });
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });
    }

    create_user_design = async (req, res) => {
        const { _id } = req.userInfo;
        try {
            const { fields, files } = await this.parseForm(req);

            if (!files.image || !files.image[0]) {
                return res.status(400).json({ message: "No image provided" });
            }

            const { url } = await cloudinary.uploader.upload(files.image[0].filepath);

            const design = await designModel.create({
                user_id: _id,
                components: [JSON.parse(fields.design[0])],
                image_url: url,
            });

            return res.status(201).json({ message: "Design created successfully", design });
        } catch (error) {
            console.error(error.stack);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    get_user_design = async (req, res) => {
        const { design_id } = req.params;
        try {
            const design = await designModel.findById(design_id);
            if (!design) {
                return res.status(404).json({ message: "Design not found" });
            }
            return res.status(200).json({ design: design.components });
        } catch (error) {
            console.error(error.stack);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    get_user_designs = async (req, res) => {
        const { _id } = req.userInfo;
        try {
            const designs = await designModel.find({ user_id: new ObjectId(_id) }).sort({ createdAt: -1 });
            return res.status(200).json({ designs });
        } catch (error) {
            console.error(error.stack);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    update_user_design = async (req, res) => {
        const { design_id } = req.params;
        try {
            const { fields, files } = await this.parseForm(req);
            const components = JSON.parse(fields.design[0]);

            const oldDesign = await designModel.findById(design_id);
            if (!oldDesign) {
                return res.status(404).json({ message: "Design Not Found" });
            }

            let imageUrl = oldDesign.image_url;

            if (files.image && files.image[0]) {
                if (oldDesign.image_url) {
                    const imagePublicId = oldDesign.image_url.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(imagePublicId, { invalidate: true });
                }

                const { url } = await cloudinary.uploader.upload(files.image[0].filepath);
                imageUrl = url;
            }

            const updatedDesign = await designModel.findByIdAndUpdate(
                design_id,
                { image_url: imageUrl, components },
                { new: true }
            );

            return res.status(200).json({ message: "Design updated successfully", design: updatedDesign });
        } catch (error) {
            console.error(error.stack);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    delete_user_design = async (req, res) => {
        const { design_id } = req.params;
        try {
            await designModel.findByIdAndDelete(design_id);
            return res.status(200).json({ message: "Design deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    add_user_image = async (req, res) => {
        const { _id } = req.userInfo;
        try {
            const { files } = await this.parseForm(req);

            if (!files.image || !files.image[0]) {
                return res.status(400).json({ message: "No image provided" });
            }

            const { url } = await cloudinary.uploader.upload(files.image[0].filepath);

            const userImage = await userImageModel.create({
                user_id: _id,
                image_url: url,
            });

            return res.status(201).json({ message: "Image uploaded successfully", userImage });
        } catch (error) {
            console.error(error.stack);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    get_user_images = async (req, res) => {
        const { _id } = req.userInfo;
        try {
            const images = await userImageModel.find({ user_id: new ObjectId(_id) }).sort({ createdAt: -1 });
            return res.status(200).json({ images });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    delete_user_image = async (req, res) => {
        const { design_id } = req.params;
        try {
            await userImageModel.findByIdAndDelete(design_id);
            return res.status(200).json({ message: "Image deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
}

module.exports = new designController();
