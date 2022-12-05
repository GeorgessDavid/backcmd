function profesional_especialidadDatabase(sequelize, DataTypes){
   
    alias = 'Profesional_Especialidad';

    cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Profesional_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Especialidad_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    config = {freezeTableName: true, timestamps:false, camelCase: false} 

    const profesional_especialidad = sequelize.define(alias, cols, config);

    return profesional_especialidad

}

module.exports = profesional_especialidadDatabase;