const notificationModel = require("../models/notificationModel");

async function add(req, res) {
    try {
        console.log('data', req.body.name)
        const notification = new notificationModel(req.body)
        await notification.save();
        res.status(200).send("add good")
    } catch (err) {
        res.status(400).send({ error: err });
        console.log()
    }
}
async function getall(req, res) {
    try {
        const data = await notificationModel.find();

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function updateNotification(req, res) {
    try {
        await notificationModel.findByIdAndUpdate(
            req.params.id,
            req.body);
        res.status(200).send("data updated")

    } catch (err) {
        res.status(400).json(err);
    }
}
async function getbyid(req, res) {
    try {
        const data = await notificationModel.findById(req.params.id);

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
}
async function deleteNotification(req, res) {
    try {
        await notificationModel.findByIdAndDelete(req.params.id);
        res.status(200).send("notification deleted")

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { add, getall, getbyid, updateNotification, deleteNotification }