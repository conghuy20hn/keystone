/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ft_crawler', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TYPE: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sourcode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    book_slug: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    STATUS: {
      type: DataTypes.INTEGER(9),
      allowNull: true,
      defaultValue: '1'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'ft_crawler'
  });
};
