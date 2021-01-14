import * as crypto from "crypto";

export const keyStorageKey = "___HEY___";

export const decipherPassword = (password: string, key?: string) => {
  console.log(password, key);
  const iv = "V8MMkXs5pkVxzUr7";
  if (key) {
    const newKey = crypto
      .createHash("md5")
      .update(key)
      .digest("base64")
      .substr(0, 16);
    const cipher = crypto.createDecipheriv("aes-128-cbc", newKey, iv);
    let buffer = cipher.update(password, "hex", "utf8");
    buffer += cipher.final("utf8");
    return buffer;
  } else {
    const passKey = localStorage.getItem(keyStorageKey);
    if (passKey) {
      const newKey = crypto
        .createHash("md5")
        .update(passKey)
        .digest("base64")
        .substr(0, 16);
      const cipher = crypto.createDecipheriv("aes-128-cbc", newKey, iv);
      let buffer = cipher.update(password, "hex", "utf8");
      buffer += cipher.final("utf8");
      return buffer;
    }
  }
  return "Couldn't decipher";
};
