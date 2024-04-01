const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('joy', 'leo', 'leo', {
    host: 'localhost',
    dialect:'mysql'
});

const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique:true
    },
    phone: {
      type: DataTypes.STRING,
      unique:true
    },
    pass: {
      type: DataTypes.STRING,
    },
});

const Record = sequelize.define('Record', {
    name: {
      type: DataTypes.STRING,
    },
    idNo: {
      type: DataTypes.STRING,
      unique:true
    },
    age: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    sport: {
      type: DataTypes.STRING,
    },
    club: {
      type: DataTypes.STRING,
    },
    grade: {
      type: DataTypes.STRING,
    },
    religion: {
      type: DataTypes.STRING,
    },
    orphan: {
      type: DataTypes.STRING,
    },
    income: {
      type: DataTypes.STRING,
    },
    result:{
      type: DataTypes.STRING,
    },
    reason:{
      type: DataTypes.STRING,
    },
});
const Nationality = sequelize.define('Nationality', {
    value: {
      type: DataTypes.STRING,
    }
});
const Model = sequelize.define('Model', {
    minAge: {
      type: DataTypes.STRING,
    },
    maxAge: {
      type: DataTypes.STRING,
    },
    orphan: {
      type: DataTypes.STRING,
    },
    income: {
      type: DataTypes.STRING,
    },
    grade: {
      type: DataTypes.STRING,
    }
});



module.exports = {
    sequelize,
    User,
    Record,
    Nationality,
    Model
}