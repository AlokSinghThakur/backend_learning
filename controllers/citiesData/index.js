// const citiesDataQueries = require("../../models/queries/cities")
const cityQuries = require('../../models/queries/cities')

module.exports = {

    async saveCitiesData(req, res) {
        let name_en = req.body.name_en
        let name_hi = req.body.name_hi
        let isSelected = req.body.isSelected
        let latitude = req.body.latitude
        let longitude = req.body.longitude
        try {
            let data = {
                name_en: name_en,
                name_hi: name_hi,
                isSelected: isSelected,
                latitude: latitude,
                longitude: longitude
            }
            await cityQuries.saveCitiesData(data)
            return res.status(200).send({ code: 422, status: "success", msg: "city data added successFully" })

        } catch (err) {
            console.log("error : ", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });

        }
    },

    async getCityData(req, res) {
        let language = req.query.lang;

        try {
            let citiesData = await cityQuries.getAllCities(language)
            return res.status(200).send({ code: 200, staus: "success", data: citiesData })

        } catch (err) {
            console.log("error : ", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message })

        }
    }

}