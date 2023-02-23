const citiesModule = require("../index").citiesDataModel;

module.exports = {

    async saveCitiesData(data) {
        return await citiesModule.create(data);
    },

    async getAllCities(language) {
        console.log('first',language)
        let attribute; 
         language == 'en' ? attribute = ['name_en', 'latitude', "longitude", "isSelected"] : attribute = ['name_hi', 'latitude', "longitude", "isSelected"]

        return await citiesModule.findAll({
            attributes: attribute
        })
    }


}