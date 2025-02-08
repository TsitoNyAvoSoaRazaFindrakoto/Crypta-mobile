import * as Crypto from 'expo-crypto';

export async function hashPassword(input: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    input
  );
}

export async function comparePassword(input: string, hashed: string): Promise<boolean> {
  const inputHash = await hashPassword(input);
  return inputHash === hashed;
}