function turnoDatabase(sequelize, DataTypes){
    alias = 'Turno';

    cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Paciente_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Profesional_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fecha_cancelacion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fecha_turno: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Tratamiento_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        presente: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }

    config = {freezeTableName: true, timestamps:false, camelCase: false} 

    const turnos = sequelize.define(alias, cols, config)

    turnos.associate = function(models){

        turnos.belongsTo(models.Usuario, {
          as: 'paciente',
          foreignKey: "Paciente_id"  
        })

        turnos.belongsTo(models.Usuario, {
            as: 'profesional',
            foreignKey: "Profesional_id"
        })

        turnos.belongsTo(models.Tratamiento, {
            as: "tratamiento",
            foreignKey: "Tratamiento_id"
        })
    }

    return turnos
}

module.exports = turnoDatabase