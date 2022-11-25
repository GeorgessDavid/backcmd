function tratamientosDatabase(sequelize, DataTypes) {
    alias = 'Tratamiento';

    cols = {  
        id: {type: DataTypes.INTEGER, primaryKey: true},
        nombre: {type: DataTypes.STRING(30),allowNull: false},
      }

      config = {camelCase: false, timestamps: false,freezeTableName: true}; 


const tratamiento = sequelize.define(alias,cols,config) 


return tratamiento;
}

module.exports = tratamientosDatabase;