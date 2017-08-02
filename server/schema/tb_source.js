/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_source', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    load_time: {
      type: "DOUBLE",
      allowNull: true
    },
    source_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    source_type: {
      type: DataTypes.CHAR(50),
      allowNull: true
    }
  }, {
    tableName: 'tb_source'
  });
};
