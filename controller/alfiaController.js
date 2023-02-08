var express = require('express');
const { Alfia } = require("../models");
const validator = require('fastest-validator');
const v = new validator();
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_API_KEY,
});

async function getAlfia(req, res) {
    try {
        let alfia = await Alfia.findAll();

        return res.json({
            status: 200,
            message: "Success Show Alfia",
            data: alfia
        });
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function saveAlfia(req, res) {
    const schema = {
        nameAlfia: "string",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate);
    }

    try {
        let body = req.body;
        body.slugAlfia = body.nameAlfia.toLowerCase().trim().replace(/[\s_-]+/g, '-');
        const newAlfia = await Alfia.create(body);

        if (newAlfia) {
            return res.status(201).json({
                status: 201,
                message: "Success Create Alfia",
                data: newAlfia
            });
        } else {
            return res.status(401).json({ status: 401, message: "Gagal Create Alfia" });
        }
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function updateAlfia(req, res) {
    const schema = {
        nameAlfia: "string",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json(validate);
    }

    try {
        let body = req.body;
        const { slug } = req.params;
        const data = await Alfia.findOne({ where: { slugAlfia: slug } });
        if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
        body.slugAlfia = body.nameAlfia.toLowerCase().trim().replace(/[\s_-]+/g, '-');
        const editAlfia = await Alfia.update(body, { where: { slugAlfia: slug } });
        if (editAlfia) {
            return res.json({
                status: 200,
                message: "Success Update Alfia"
            });
        } else {
            return res.status(401).json({ status: 401, message: "Gagal Update Alfia" });
        }
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function deleteAlfia(req, res) {
    try {
        const data = await Alfia.findOne({ where: { slugAlfia: req.params.slug } });
        if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
        await Alfia.destroy({ where: { slugAlfia: req.params.slug } });
        return res.json({
            status: 200,
            message: "Success Delete Alfia"
        });
    } catch (er) {
        console.log(er);
        return res.status(442).json({ er });
    }
}

module.exports = { getAlfia, saveAlfia, updateAlfia, deleteAlfia };