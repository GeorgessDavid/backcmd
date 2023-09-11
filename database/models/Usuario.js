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
            type: DataTypes.STRING(200),
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
        },
        nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        }
    };
    config = {freezeTableName: true,timestamps: false};

    const usuarios = sequelize.define(alias, cols, config);

    usuarios.associate = function(models) {
        usuarios.belongsTo(models.Obra_Social, {
            as: 'obra_social',
            foreignKey: 'Obra_Social_id'
        })
        usuarios.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'Rol_id'
        })
        usuarios.hasMany(models.Turno, {
            as: 'paciente',
            foreignKey: "Paciente_id"
        })
        usuarios.hasMany(models.Turno, {
            as: 'profesional',
            foreignKey: "Profesional_id"
        })
        usuarios.hasMany(models.Planilla_Horaria, {
            as: 'planilla_horaria',
            foreignKey: 'Profesional_id'
        })
        usuarios.belongsToMany (models.Especialidad, {
            as: 'especialidad',
            through: 'Profesional_Especialidad',
            foreignKey: 'Profesional_id',
            otherKey: 'Especialidad_id',
            timestamps: false
        })

        usuarios.belongsToMany (models.Tratamiento, {
            as: 'tratamiento',
            through: 'Profesional_Tratamiento',
            foreignKey: 'Profesional_id',
            otherKey: 'Tratamiento_id',
            timestamps: false
        })
    }

    return usuarios;

}

module.exports = usuariosDatabase;
