import { defineStore } from 'pinia'
import UserModel from '@/domain/models/User.ts'

type UserState = {
  id: string
  username: string
  email: string
  birthDate: string
  createdAt: string
  updatedAt: string
  name: string
  surname: string
  role: null
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
      role: null,
    }
  },
  getters: {
    fullName: (state) => {
      return state.name + ' ' + state.surname
    },
  },
  actions: {
    setUser(user: UserModel) {
      this.id = user.getId()
      this.username = user.getUsername()
      this.email = user.getEmail()
      this.birthDate = user.getBirthDate()
      this.createdAt = user.getCreatedAt()
      this.updatedAt = user.getUpdatedAt()
      this.name = user.getName()
      this.surname = user.getSurname()
      this.role = user.getRole()
    },
  },
})
