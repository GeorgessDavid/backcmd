function especialidadDatabase(sequelize, DataTypes){
    alias = 'Especialidad';

    cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    };

    config = {freezeTableName: true, timestamps:false, camelCase: false} 

    const especialidad = sequelize.define(alias, cols, config);

    especialidad.Associate = function(models){
        
        especialidad.belongsToMany(models.Profesional), {
            as: 'profesionales',
            through: 'Profesional_Especialidad',
            foreignKey: 'Especialidad_id',
            otherKey: 'Profesional_id'
        }
    }

    return especialidad

}

module.exports = especialidadDatabase;
