function planillaHorariaDatabase(sequelize, DataTypes) {
  alias = 'Planilla_Horaria';

  cols = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dia_semana: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    duracion:{
      type: DataTypes.TINYINT,
      allowNull: false
    },
    Profesional_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },

  config = {freezeTableName: true,timestamps: false};

    const planilla_horaria = sequelize.define(alias, cols, config);

    planilla_horaria.Associate = function(models) {

      planilla_horaria.belongsTo(models.Usuario, {
          as: 'profesional',
          foreignKey: 'Profesional_id'
      })

    }

    return planilla_horaria;
}

module.exports = planillaHorariaDatabase;
