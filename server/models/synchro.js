const {sequelize,User,Record,Nationality,Model} = require("./index")

Model.hasMany(Nationality)

const sychroModel = async () => {
    try {
        await sequelize.sync({force:true})
        console.log("Synched")
    } catch (error) {
        console.log(error.message)
    }
}

sychroModel()
