const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SalesVisitationDetail extends Model {
    static associate({ tenant: models }) {
      this.belongsTo(models.SalesVisitation, { onDelete: 'CASCADE' });

      this.belongsTo(models.Item, { as: 'item', onDelete: 'RESTRICT' });
    }
  }
  SalesVisitationDetail.init(
    {
      salesVisitationId: {
        type: DataTypes.INTEGER,
      },
      itemId: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.DECIMAL,
      },
      unit: {
        type: DataTypes.STRING,
      },
      converter: {
        type: DataTypes.DECIMAL,
      },
      price: {
        type: DataTypes.DECIMAL,
      },
      expiryDate: {
        type: DataTypes.DATE,
      },
      productionNumber: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {},
      sequelize,
      modelName: 'SalesVisitationDetail',
      tableName: 'pin_point_sales_visitation_details',
      underscored: true,
      timestamps: false,
    }
  );
  return SalesVisitationDetail;
};