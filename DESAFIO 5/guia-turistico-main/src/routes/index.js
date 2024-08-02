import express from "express";
import destinos from "./destinos.route.js";
import atrativos from "./atrativos.route.js";


const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("API Trilhas"));

    app.use(express.json(), destinos, atrativos);
};

export default routes;