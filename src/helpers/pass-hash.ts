import { compare, getRounds, hash } from "bcryptjs";

export class PassHash {
  async verifyOrHash(rawPassword: string) {
    const passwordHash = getRounds(rawPassword);

    if (!passwordHash) {
      return await hash(rawPassword, 12);
    }
    return rawPassword;
  }

  async verifyPassCompare(rawPassword: string, passwordHash: string) {
    return await compare(rawPassword, passwordHash);
  }
}
