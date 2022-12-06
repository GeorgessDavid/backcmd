function usuariosDatabase(sequelize, DataTypes) {
    alias = 'Usuario';

    cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        alias: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        dni: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        clave: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING(10),
        },
        sexo: {
            type: DataTypes.BOOLEAN,
        },
        domicilio: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING(80),
        },
        Obra_Social_id: {
            type: DataTypes.INTEGER,
        },
        Rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    config = {freezeTableName: true,timestamps: false};

    const usuarios = sequelize.define(alias, cols, config);

    usuarios.Asociate = function(models) {
        usuarios.belongsTo(models.Obra_Social, {
            as: 'obra_social',
            foreignKey: 'Obra_Social_id'
        })
        usuarios.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'Rol_id'
        })
        turnos.hasMany(models.Turno, {
            as: 'paciente',
            foreignKey: "Paciente_id"
        })
        turnos.hasMany(models.Turno, {
            as: 'profesional',
            foreignKey: "Profesional_id"
        })
        usuarios.hasMany(models.PlanillaHoraria, {
            as: 'planillas_horarias',
            foreignKey: 'Profesional_id'
        })
    }

    return usuarios;

}

module.exports = usuariosDatabase;
