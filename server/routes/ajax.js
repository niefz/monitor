/**
 * Created by NieFZ on 2017/6/24.
 */

const router = require('koa-router')();
const ajaxController = require('../controllers/ajax.js');

router.get('/ajax/:type', ajaxController.getAjaxSource);

module.exports = router;
