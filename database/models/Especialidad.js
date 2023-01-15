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

    especialidad.associate = function(models){
        
        especialidad.belongsToMany(models.Usuario, {
            as: 'especialidad',
            through: 'Profesional_Especialidad',
            foreignKey: 'Especialidad_id',
            otherKey: 'Profesional_id',
            timestamps: false
        })
    }

    return especialidad

}

module.exports = especialidadDatabase;
