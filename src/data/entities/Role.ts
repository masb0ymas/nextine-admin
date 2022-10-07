export interface RoleEntity {
  id: string
  name: string
  createdAt: Date | string
  updatedAt: Date | string
  deletedAt?: Date | string | null
}