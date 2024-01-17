/**
 * @jest-environment jsdom
 */

import { decrypt, encrypt, getHashDigest } from "@/utils";
import { describe, expect, test } from "@jest/globals";
import { generateRandomString } from "../test_utils";

describe("utils tests", () => {
  test("encrypt/decrypt", () => {
    const plainText = generateRandomString(3000);
    const secret = generateRandomString(256);
    const cipherText = encrypt(plainText, secret);
    expect(decrypt(cipherText, secret)).toStrictEqual(plainText);
  });
  test("hashDigest", () => {
    const plainText = generateRandomString(3000);
    const secret = generateRandomString(256);
    const nonce = generateRandomString(64);
    const hastDigest1 = getHashDigest(nonce, plainText, secret);
    const hashDigest2 = getHashDigest(nonce, plainText, secret);
    expect(hastDigest1).toEqual(hashDigest2);
  });
});
