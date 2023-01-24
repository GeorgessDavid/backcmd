function tratamientosDatabase(sequelize, DataTypes) {
  alias = 'Tratamiento';

  cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING(30), allowNull: false },
  }

  config = { camelCase: false, timestamps: false, freezeTableName: true };


  const tratamiento = sequelize.define(alias, cols, config)

  tratamiento.associate = (models) => {
    tratamiento.belongsToMany(models.Usuario, {
      as: 'tratamiento',
      through: 'Profesional_Tratamiento',
      foreignKey: 'Tratamiento_id',
      otherKey: 'Profesional_id',
      timestamps: false
    }),
    
    tratamiento.hasMany(models.Turno, {
      as: 'practicaMedica', 
      foreignKey: 'Tratamiento_id'
    })
  }

  return tratamiento;
}

module.exports = tratamientosDatabase;