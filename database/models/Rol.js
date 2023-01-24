function rolesDatabase(sequelize, DataTypes) {
  alias = 'Rol';

  cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING(70), allowNull: false },
  }

  config = { camelCase: false, timestamps: false, freezeTableName: true };


  const roles = sequelize.define(alias, cols, config);

  roles.Associate = function (models) {

    roles.hasMany(models.Usuario, {
      as: 'usuarios',
      foreignKey: 'Usuario_id',
    })

  }

  return roles;
}

module.exports = rolesDatabase;