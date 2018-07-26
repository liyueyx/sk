/**
 * Created by Administrator on 2018/7/25.
 */
const crypto = require('crypto');

module.exports = {
  md5: (content) => {
    const md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('base64');
  }

}
