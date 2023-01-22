function profesionalTratDatabase(sequelize, DataTypes) {
    alias = 'Profesional_Tratamiento';

    cols = {  
        id: {type: DataTypes.INTEGER, primaryKey: true},
        Profesional_id: {type: DataTypes.INTEGER, allowNull: false},
        Tratamiento_id: {type: DataTypes.INTEGER, allowNull: false},
      }

      config = {camelCase: false, timestamps: false}; //freezeTableName: true


const profesionalTrat = sequelize.define(alias,cols,config) 

profesionalTrat.associate = (models) => {
  profesionalTrat.belongsToMany (models.Usuario, {
    as: 'tratamiento',
    through: 'Profesional_Tratamiento',
    foreignKey: 'Tratamiento_id',
    otherKey: 'Profesional_id+',
    timestamps: false
})
}

return profesionalTrat;
}

module.exports = profesionalTratDatabase;