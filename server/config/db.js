/**
 * Created by NieFZ on 2017/6/24.
 */

const Sequelize = require('sequelize');

const source = new Sequelize('mysql://root:nfz123.@localhost/monitor', {
  define: {
    timestamps: false,
  },
});

module.exports = {
  source,
};
