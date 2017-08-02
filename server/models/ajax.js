/**
 * Created by NieFZ on 2017/6/24.
 */
const db = require('../config/db.js');
const ajaxModel = '../schema/tb_source.js';
const SourceDB = db.source;

const AjaxSource = SourceDB.import(ajaxModel);

const getSourceByType = async (type) => {
  const ajaxSource = await AjaxSource.findOne({
    where: {
      sourceType: type,
    },
  });
  return ajaxSource;
};

module.exports = {
  getSourceByType,
};