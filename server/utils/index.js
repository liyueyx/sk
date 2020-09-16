/**
 * Created by Administrator on 2018/7/25.
 */
const crypto = require('crypto');

module.exports = {
  md5: (content) => {
    const md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('base64');
  },
  /**
   * 获取上传目录
   * */
  getUploadDirName:() => {
    const date = new Date();
    let month = Number.parseInt(date.getMonth()) + 1;
    month = month.toString().length > 1 ? month : `0${month}`;
    const dir = `${date.getFullYear()}${month}`;
    return dir;
  }

}
