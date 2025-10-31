import type { GenderType } from '@/features/domain/types/user/gender.type.ts'
import type { RoleType } from '@/features/domain/types/user/role.type.ts'

export interface UserResponse {
  id: string
  username: string
  name: string
  surname: string
  email: string
  birth_date: string
  created_at: string
  updated_at: string
  gender: GenderType
  role: RoleType
}
