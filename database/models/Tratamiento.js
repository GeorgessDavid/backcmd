function tratamientosDatabase(sequelize, DataTypes) {
    alias = 'Tratamiento';

    cols = {  
        id: {type: DataTypes.INTEGER, primaryKey: true},
        nombre: {type: DataTypes.STRING(30),allowNull: false},
      }

      config = {camelCase: false, timestamps: false}; 


const tratamientos = sequelize.define(alias,cols,config) 


return tratamientos;
}

module.exports = tratamientosDatabase;