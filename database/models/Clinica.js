function clinicDatabase(sequelize, DataTypes) {
    alias = 'ClinicaCmd';

    cols = {  
        id: {type: DataTypes.INTEGER, primaryKey: true},
        nombre: {type: DataTypes.STRING(60),allowNull: false}, 
        direccion: {type: DataTypes.STRING(50),allowNull: false},
      }

      config = {camelCase: false, timestamps: false}; 


const clinic = sequelize.define(alias,cols,config) 

clinic.Associate = function(models){
        
  clinic.hasMany(models.Trabajador_Clinica, {
      as: 'TrabajadoresClinica',
      foreignKey: 'Clinica_id',
    })
     ///// hacer modelo Registro_Caja
    clinic.belongsToMany(models.Registro_Caja, {
      as: 'RegistrosCaja',                            
      through: 'Registro_Caja',
      foreignKey: 'Clinica_id',
      otherKey: 'Usuario_id',
    })
}
return clinic;
}

module.exports = clinicDatabase;