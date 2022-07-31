import { v4 as uuidv4 } from "uuid";
export const getUuid = () => {
  //先从本次存储获取uuid看看里面是否有uuid
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  if (!uuid_token) {
    // 生成uuid 游客临时身份
    uuid_token = uuidv4();
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  return uuid_token;
};
