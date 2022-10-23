import { BaseEntity } from './Base'
import { RoleEntity } from './Role'

export interface UserEntity extends BaseEntity {
  fullName: string
  email: string
  password?: string | null
  phone?: string | null
  tokenVerify?: string | null
  isActive?: boolean
  isBlocked?: boolean
  UploadId?: string | null
  RoleId: string
}

export interface UserRelationEntity extends Partial<UserEntity> {
  Role: Partial<RoleEntity>
}

export type LoginAttributes = Pick<UserEntity, 'email' | 'password'>

export type UserAttributes = Omit<
  UserEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export const defaultUserData = {
  id: null,
  fullName: null,
  email: null,
  password: null,
  phone: null,
  tokenVerify: null,
  isActive: false,
  isBlocked: false,
  UploadId: null,
  RoleId: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
}
