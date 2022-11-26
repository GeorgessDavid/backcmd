function TrabajadorClinicDatabase(sequelize, DataTypes) {
    alias = 'TrabajadoresClinica';

    cols = {  
        id: {type: DataTypes.INTEGER, primaryKey: true},
        fechaInicio: {type: DataTypes.DATE, allowNull: false}, 
        fechaFin: {type: DataTypes.DATE}, 
        Usuario_id: {type: DataTypes.INTEGER}, 
        Clinica_id: {type: DataTypes.INTEGER}, 
      }

      config = {camelCase: false, timestamps: false}; 


const TrabajadorClinic = sequelize.define(alias,cols,config) 


return TrabajadorClinic;
}

module.exports = TrabajadorClinicDatabase;