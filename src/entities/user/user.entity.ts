import type { RoleType } from '@/features/domain/types/user/role.type.ts'
import type { GenderType } from '@/features/domain/types/user/gender.type.ts'

export default class UserEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly name: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly birthDate: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly gender: GenderType,
    public readonly role: RoleType,
  ) {}
}
