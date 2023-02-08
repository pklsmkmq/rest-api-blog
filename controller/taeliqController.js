var express = require('express');
const { Taeliq, Pengguna, Maqalat } = require("../models");
const validator = require('fastest-validator');
const v = new validator();
require("dotenv").config();

async function getTaeliq(req, res) {
    try {
        let user = await Pengguna.findOne({ where: { email: req.email } });
        if (!user) return res.status(401).json({ status: 401, message: "Gagal Mendapatkan Data" });

        let taeliq = await Taeliq.findAll({
            where: { maqalatId: req.params.id },
            order: [['createdAt', 'DESC']]
        });
        return res.json({
            status: 200,
            message: "Success Show Taeliq",
            count: taeliq.length,
            data: taeliq
        });
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function saveTaeliq(req, res) {
    const schema = {
        maqalatId: "string",
        nameTaeliq: "string",
        emailTaeliq: "string",
        taeliq: "string"
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) return res.status(400).json(validate);

    try {
        let body = req.body;
        let maqalat = await Maqalat.findOne({ where: { id: body.maqalatId } });
        if (!maqalat) return res.status(404).json({ message: "data tidak ditemukan" });
        const newTaeliq = await Taeliq.create(body);
        if (newTaeliq) {
            return res.status(201).json({
                status: 201,
                message: "Success Create Taeliq",
                data: newTaeliq
            });
        } else {
            return res.status(401).json({ status: 401, message: "Gagal Create Taeliq" });
        }
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function getNullTaeliq(req, res) {
    try {
        let user = await Pengguna.findOne({ where: { email: req.email } });
        if (!user) return res.status(401).json({ status: 401, message: "Gagal Mendapatkan Data" });

        let taeliq = await Taeliq.findAll({ where: { statusTaeliq: null } });
        return res.json({
            status: 200,
            message: "Success Show Taeliq",
            count: taeliq.length,
            data: taeliq
        });
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function changeStatus(req, res) {
    const schema = {
        statusTaeliq: "boolean",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) return res.status(400).json(validate);

    try {
        let user = await Pengguna.findOne({ where: { email: req.email } });
        let taeliq = await Taeliq.findOne({ where: { id: req.params.id } });
        if (!user || !taeliq) return res.status(401).json({ status: 401, message: "Gagal Mendapatkan Data" });

        taeliq.set({
            statusTaeliq: req.body.statusTaeliq,
            penggunaId: user.id
        });

        const changeTaeliq = await taeliq.save();
        if (changeTaeliq) {
            return res.json({
                status: 200,
                message: "Success Change Taeliq",
            });
        } else {
            return res.status(401).json({ status: 401, message: "Gagal Change Taeliq" });
        }
    } catch (error) {
        console.log(error);
        return res.status(442).json({ error });
    }
}

async function deleteTaeliq(req, res) {
    try {
        const data = await Taeliq.findOne({ where: { id: req.params.id } });
        if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
        const deleteTaeliq = await Taeliq.destroy({ where: { id: req.params.id } });

        return res.json({
            status: 200,
            message: "Success Delete Taeliq"
        });
    } catch (er) {
        console.log(er);
        return res.status(442).json({ er });
    }
}

module.exports = { saveTaeliq, getNullTaeliq, changeStatus, getTaeliq, deleteTaeliq };