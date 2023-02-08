var express = require('express');
const { Maqalat, Pengguna, Alfia, Taeliq } = require("../models");
const validator = require('fastest-validator');
const v = new validator();
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_API_KEY,
});

async function getMaqalat(req, res) {
    try {
        let maqalat = await Maqalat.findAll({
            include: [
                {
                    model: Alfia,
                    require: true,
                    as: "kategori",
                    attributes: ["nameAlfia", "slugAlfia"]
                },
                {
                    model: Pengguna,
                    require: true,
                    as: "penulis",
                    attributes: ["name"]
                },
            ],
        });

        return res.json({
            status: 200,
            message: "Success Show Maqalat",
            count: maqalat.length,
            data: maqalat
        });
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function getMaqalatWithTaeliq(req, res) {
    try {
        let maqalat = await Maqalat.findAll({
            include: [
                {
                    model: Alfia,
                    require: true,
                    as: "kategori",
                    attributes: ["nameAlfia", "slugAlfia"]
                },
                {
                    model: Pengguna,
                    require: true,
                    as: "penulis",
                    attributes: ["name"]
                },
                {
                    model: Taeliq,
                    require: true,
                    as: "taeliq",
                    attributes: ["nameTaeliq", "emailTaeliq", "taeliq", "statusTaeliq", "createdAt"],
                },
            ],
        });

        return res.json({
            status: 200,
            message: "Success Show Maqalat",
            count: maqalat.length,
            data: maqalat
        });
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function getDetailMaqalat(req, res) {
    try {
        let maqalat = await Maqalat.findOne({
            where: { slugMaqalat: req.params.slug },
            include: [
                {
                    model: Alfia,
                    require: true,
                    as: "kategori",
                    attributes: ["id","nameAlfia", "slugAlfia"]
                },
                {
                    model: Pengguna,
                    require: true,
                    as: "penulis",
                    attributes: ["name"]
                },
                {
                    model: Taeliq,
                    require: true,
                    as: "taeliq",
                    attributes: ["nameTaeliq", "emailTaeliq", "statusTaeliq", "taeliq", "createdAt"],
                },
            ]
        });

        if (maqalat) {
            return res.json({
                status: 200,
                message: "Success Show Maqalat",
                data: maqalat
            });
        } else {
            return res.status(404).json({ message: "data tidak ditemukan" });
        }
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function getDataByAlfia(req, res) {
    try {
        let alfia = await Alfia.findOne({ where: { slugAlfia: req.params.slug } });
        if (!alfia) return res.status(404).json({ message: "data tidak ditemukan" });
        let maqalat = await Maqalat.findAll({
            where: { alfiaId: alfia.id },
            include: [
                {
                    model: Alfia,
                    require: true,
                    as: "kategori",
                    attributes: ["nameAlfia", "slugAlfia"],
                },
                {
                    model: Pengguna,
                    require: true,
                    as: "penulis",
                    attributes: ["name"]
                },
            ],
        });

        if (maqalat) {
            return res.json({
                status: 200,
                message: "Success Show Maqalat",
                count: maqalat.length,
                data: maqalat
            });
        } else {
            console.log(error);
            return res.status(442).json({ error });
        }
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function saveMaqalat(req, res) {
    const schema = {
        titleMaqalat: "string",
        alfiaId: "string",
        contentMaqalat: "string"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate);
    }

    try {
        let body = req.body;

        let user = await Pengguna.findOne({
            where: {
                email: req.email
            },
        });

        let alfia = await Alfia.findOne({
            where: {
                id: req.body.alfiaId
            },
        });

        if (!user || !alfia) return res.status(401).json({ status: 401, message: "Gagal Mendapatkan Data" });

        const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
            folder: "/artikel",
        });

        body.imageMaqalat = secure_url;
        body.slugMaqalat = body.titleMaqalat.toLowerCase().trim().replace(/[\s_-]+/g, '-');
        body.penggunaId = user.id;
        const newMaqalat = await Maqalat.create(body);

        if (newMaqalat) {
            return res.status(201).json({
                status: 201,
                message: "Success Create Maqalat",
                data: newMaqalat
            });
        } else {
            return res.status(401).json({ status: 401, message: "Gagal Create Maqalat" });
        }
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function updateMaqalat(req, res) {
    const schema = {
        titleMaqalat: "string",
        alfiaId: "string",
        contentMaqalat: "string"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate);
    }

    try {
        let body = req.body;
        const { slug } = req.params;
        const data = await Maqalat.findOne({ where: { slugMaqalat: slug } });
        // console.log("--------------------------------------------------------------------");
        // console.log(data);
        // console.log("--------------------------------------------------------------------");
        if (!data) return res.status(404).json({ message: "data tidak ditemukan" });

        let user = await Pengguna.findOne({
            where: {
                email: req.email
            },
        });

        let alfia = await Alfia.findOne({
            where: {
                id: req.body.alfiaId
            },
        });
        if (!user || !alfia) return res.status(401).json({ status: 401, message: "Gagal Mendapatkan Data" });

        if (req.file?.path === undefined) {
            body.imageMaqalat = data.imageMaqalat;
        } else {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
                folder: "/artikel",
            });
            body.imageMaqalat = secure_url;
        }
        body.slugMaqalat = body.titleMaqalat.toLowerCase().trim().replace(/[\s_-]+/g, '-');
        body.penggunaId = user.id;
        const editMaqalat = await Maqalat.update(body, { where: { slugMaqalat: slug } });
        if (editMaqalat) {
            return res.json({
                status: 200,
                message: "Success Update Maqalat"
            });
        } else {
            return res.status(401).json({ status: 401, message: "Gagal Update Maqalat" });
        }
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function deleteMaqalat(req, res) {
    try {
        const data = await Maqalat.findOne({ where: { slugMaqalat: req.params.slug } });
        if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
        const deleteMalaqat = await Maqalat.destroy({ where: { slugMaqalat: req.params.slug } });

        return res.json({
            status: 200,
            message: "Success Delete Maqalat"
        });
    } catch (er) {
        console.log(er);
        return res.status(442).json({ er });
    }
}

module.exports = { getMaqalat, getDetailMaqalat, getDataByAlfia, saveMaqalat, updateMaqalat, deleteMaqalat, getMaqalatWithTaeliq };