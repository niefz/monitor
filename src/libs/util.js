/**
 * Created by NieFZ on 2017/6/4.
 */

const util = {
  getUrlParam: (name) => {
    const reg = new RegExp(`(.*)${name}=([^&]*)(&|$)`);
    const result = window.location.href.match(reg);
    if (result !== null && result.toString().length) {
      return decodeURI(result[2]);
    }
    return null;
  },
};

module.exports = util;