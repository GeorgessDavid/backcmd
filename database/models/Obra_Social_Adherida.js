function obraSocialAdheridaDatabase(sequelize, DataTypes) {
    alias = 'Obra_Social_Adherida';

    cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        Obra_Social_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Profesional_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    config = {freezeTableName: true,timestamps: false};

    const obras_sociales_adheridas = sequelize.define(alias, cols, config);



    return obras_sociales_adheridas;

}

module.exports = obraSocialAdheridaDatabase;
