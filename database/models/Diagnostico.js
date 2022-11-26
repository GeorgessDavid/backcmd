function diagnosticoDatabase(sequelize, DataTypes){
    alias = 'Diagnostico'

    cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nombre_adjunto: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        Paciente_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Profesional_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Turno_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    };
    
    config = {freezeTableName: true, timestamps:false, camelCase: false}    

    const diagnostico = sequelize.define(alias, cols,config);

    diagnostico.Associate = function(models){

        diagnostico.hasMany(models.Usuario, {
            as: "paciente",
            foreignKey: "Paciente_id"
        })

        diagnostico.hasMany(models.Usuario, {
            as: "profesional",
            foreignKey: "Profesional_id"
        })

        diagnostico.hasMany(models.Turno, {
            as: "turno",
            foreignKey: "Turno_id"
        })
    }

    return diagnostico
}

module.exports = diagnosticoDatabase;