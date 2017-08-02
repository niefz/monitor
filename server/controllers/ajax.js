/**
 * Created by NieFZ on 2017/6/24.
 */

const ajax = require('../models/ajax.js');

const getAjaxSource = async (ctx, next) => {
  const sourceType = this.params.sourceType;
  const result = await ajax.getSourceByType(sourceType);
  ctx.body = {
    success: true,
    data: result,
  };
};

module.exports = {
  getAjaxSource,
};