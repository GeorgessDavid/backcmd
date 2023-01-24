function obrasSocialesDatabase(sequelize, DataTypes) {
    alias = 'Obra_Social';

    cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    };
    config = {freezeTableName: true,timestamps: false};

    const obras_sociales = sequelize.define(alias, cols, config);

    obras_sociales.Associate = function(models) {

        obras_sociales.hasMany(models.Usuario, {
            as: 'obra_social',
            foreignKey: 'Obra_Social_id'
        })
        obras_sociales.belongsToMany(models.Profesional, {
            as: 'profesionales',
            through: 'Obra_Social_Adherida',
            foreignKey: 'Obra_Social_id',
            otherKey: 'Profesional_id',
            timestamps: false
        })
    }

    return obras_sociales;

}

module.exports = obrasSocialesDatabase;
