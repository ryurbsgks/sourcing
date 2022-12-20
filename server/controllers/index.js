module.exports = {

  signup: require("./user/signup"),
  login: require("./user/login"),
  checkID: require("./user/checkID"),
  checkNickname: require("./user/checkNickname"),
  auth: require("./user/auth"),
  signupSMS: require("./user/signupSMS"),
  verify: require("./user/verify"),
  signupEmail: require("./user/signupEmail"),
  findID: require("./user/findID"),
  findPW: require("./user/findPW"),
  list: require("./product/list"),
  new: require("./product/new"),
  editor: require("./product/editor"),
  detail: require("./product/detail")
  
};