import * as crypto from "crypto";

export const keyStorageKey = "___HEY___";

export const decipherPassword = (password: string) => {
  const iv = "V8MMkXs5pkVxzUr7";
  const key = localStorage.getItem(keyStorageKey);
  if (key) {
    const cipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let buffer = cipher.update(password, "hex", "utf8");
    buffer += cipher.final("utf8");
    return buffer;
  }
  return "Couldn't decipher";
};
