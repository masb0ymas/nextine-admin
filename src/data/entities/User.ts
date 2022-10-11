import { BaseEntity } from './Base'
import { RoleEntity } from './Role'

interface UserEntity extends BaseEntity {
  fullName: string
  email: string
  password: string
  phone?: string | null
  isActive: boolean
  isBlocked: boolean
  tokenVerify: string
  RoleId: string
}

export interface UserRelationEntity extends Partial<UserEntity> {
  Role: Partial<RoleEntity>
}
