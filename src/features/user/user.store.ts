import { defineStore } from 'pinia'
import UserEntity from '@/entities/user/user.entity.ts'
import { GenderEnum } from '@/features/domain/enums/user/gender.enum.ts'
import { RoleEnum } from '@/features/domain/enums/user/role.enum.ts'
import type { GenderType } from '@/features/domain/types/user/gender.type.ts'
import type { RoleType } from '@/features/domain/types/user/role.type.ts'

interface UserState {
  id: string
  username: string
  email: string
  birthDate: string
  createdAt: string
  updatedAt: string
  name: string
  surname: string
  gender: GenderType
  role: RoleType
}

export const useUserStore = defineStore('user', {
  state(): UserState {
    return {
      id: '',
      username: '',
      email: '',
      birthDate: '',
      createdAt: '',
      updatedAt: '',
      name: '',
      surname: '',
      gender: GenderEnum.MALE,
      role: RoleEnum.GUEST,
    }
  },
  getters: {
    fullName: (state) => {
      return state.name + ' ' + state.surname
    },
  },
  actions: {
    setUser(user: UserEntity) {
      const newUser: UserEntity = {
        id: user.id,
        username: user.username,
        email: user.email,
        birthDate: user.birthDate,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        name: user.name,
        surname: user.surname,
        gender: user.gender,
        role: user.role,
      }
      this.$state = {
        ...newUser,
      }
    },
  },
})
