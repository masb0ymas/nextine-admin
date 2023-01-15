import CustomLoadingOverlay from '@core/components/CustomLoadingOverlay'
import PageHeader from '@core/components/PageHeader'
import Lists from '@core/helpers/Lists'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Paper,
  PasswordInput,
  Select,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons'
import { useMutation } from '@tanstack/react-query'
import { UserAttributes } from 'data/entities/User'
import useRole from 'data/query/Role/useRole'
import useUserById from 'data/query/User/useUserById'
import UserRepository from 'data/repository/UserRepository'
import { get } from 'lodash'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

interface AbstractFormProps {
  initialValues: Record<string, any>
  validate: Record<string, any>
  isEdit?: boolean
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
}

function AbstractForm({
  isEdit,
  mutation,
  initialValues,
  validate,
}: AbstractFormProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const [visiblePass, { toggle: togglePass }] = useDisclosure(false)
  const [visibleCPass, { toggle: toggleCPass }] = useDisclosure(false)

  const baseUrl = '/admin/settings/account'

  const form = useForm({
    initialValues,

    validate,
  })

  const queryRole = useRole({
    query: {
      defaultValue: {
        page: 1,
        pageSize: 999,
      },
    },
  })

  const optRole = Lists.transform(queryRole.data || [], 'name', 'id')

  const onFormSubmit = async () => {
    setVisible(true)

    try {
      const response = await mutation.mutateAsync(form.values)
      const message = get(response, 'data.message', '') as string
      showNotification({
        title: 'Submit Successfully',
        message,
        icon: <IconCheck size={16} />,
        color: 'green',
      })
      Router.back()
    } catch (error) {
      const description = get(error, 'response.data.message', '')

      console.log(description)
    } finally {
      setVisible(false)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <CustomLoadingOverlay visible={visible} />

      <PageHeader
        targetURL={`${baseUrl}?tabs=user`}
        title="Account"
        subTitle={`${isEdit ? 'Edit' : 'Add'} User`}
      />
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Grid gutter="xl" columns={24}>
          <Grid.Col xs={24} md={16}>
            <Paper shadow="sm" radius="md" p="lg">
              <Grid gutter="xl" columns={24}>
                <Grid.Col xs={24} md={12}>
                  <TextInput
                    required
                    label="Fullname"
                    placeholder="Your full name"
                    {...form.getInputProps('fullName')}
                  />
                </Grid.Col>

                <Grid.Col xs={24} md={12}>
                  <TextInput
                    required
                    label="Email"
                    placeholder="you@mantine.dev"
                    {...form.getInputProps('email')}
                  />
                </Grid.Col>

                <Grid.Col span={24}>
                  <TextInput
                    label="Phone"
                    placeholder="0816442*****"
                    {...form.getInputProps('phone')}
                  />
                </Grid.Col>

                <Grid.Col xs={24} md={12}>
                  <PasswordInput
                    label="Password"
                    required={!isEdit}
                    visible={visiblePass}
                    onVisibilityChange={togglePass}
                    {...form.getInputProps('newPassword')}
                  />
                </Grid.Col>

                <Grid.Col xs={24} md={12}>
                  <PasswordInput
                    label="Confirm password"
                    required={!isEdit}
                    visible={visibleCPass}
                    onVisibilityChange={toggleCPass}
                    {...form.getInputProps('confirmNewPassword')}
                  />
                </Grid.Col>

                <Grid.Col xs={24}>
                  <Select
                    required
                    label="Role"
                    placeholder="Pilih Role"
                    data={optRole}
                    {...form.getInputProps('RoleId')}
                  />
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>

          <Grid.Col xs={24} md={8}>
            <Paper shadow="sm" radius="md" p="lg">
              <Text mb="md" size="md" weight="bold">
                Action
              </Text>

              <Divider variant="dashed" />

              <Button fullWidth mt="xl" radius="md" type="submit">
                {isEdit ? 'Submit Changes' : 'Submit'}
              </Button>
            </Paper>

            <Divider my="lg" variant="dotted" />

            <Paper shadow="sm" radius="md" p="lg">
              <Text mb="md" size="md" weight="bold">
                Additional
              </Text>

              <Divider my="md" variant="dashed" />

              <Grid>
                <Grid.Col xs={24}>
                  <Checkbox
                    label="Aktif"
                    checked={form.values.isActive}
                    {...form.getInputProps('isActive')}
                  />
                </Grid.Col>

                <Grid.Col xs={24}>
                  <Checkbox
                    label="Block"
                    checked={form.values.isBlocked}
                    {...form.getInputProps('isBlocked')}
                  />
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        </Grid>
      </form>
    </div>
  )
}

function FormAdd() {
  const createData = useMutation((data: UserAttributes) =>
    UserRepository.create(data),
  )

  return (
    <AbstractForm
      initialValues={{
        fullName: '',
        newPassword: '',
        email: '',
        RoleId: '',
        phone: '',
        confirmNewPassword: '',
        isActive: false,
      }}
      validate={{
        fullName: (value: string) =>
          value.length < 3 ? 'Nama minimal 3 karakter' : null,
        email: (value: string) =>
          /^\S+@\S+$/.test(value) ? null : 'Invalid email',
        newPassword: (value: string) =>
          value.length < 6 ? 'Password minimal 6 karakter' : null,
        confirmNewPassword: (value: string, values: any) =>
          value !== values.newPassword ? 'Passwords did not match' : null,
        RoleId: (value: string) =>
          value.length < 1 ? 'Role harus diisi' : null,
      }}
      mutation={createData}
    />
  )
}

function FormEdit() {
  const router = useRouter()
  const id = router?.query?.id
  const isEdit = Boolean(id)

  const queryUserById = useUserById(String(id), {}, { enabled: !!id })
  const { isLoading, remove, data } = queryUserById

  const updateData = useMutation(
    (data: UserAttributes) => UserRepository.update(String(id), data),
    {
      onSettled() {
        remove()
      },
    },
  )

  if (isLoading) {
    return (
      <div>
        <CustomLoadingOverlay visible />
      </div>
    )
  }

  return (
    <AbstractForm
      initialValues={{
        ...data,
        newPassword: undefined,
        confirmNewPassword: undefined,
      }}
      validate={{
        fullName: (value: string) =>
          value.length < 3 ? 'Nama minimal 3 karakter' : null,
        email: (value: string) =>
          /^\S+@\S+$/.test(value) ? null : 'Invalid email',
        confirmNewPassword: (value: string, values: any) =>
          value !== values.newPassword ? 'Passwords did not match' : null,
        RoleId: (value: string) =>
          value.length < 1 ? 'Role harus diisi' : null,
      }}
      isEdit={isEdit}
      mutation={updateData}
    />
  )
}

export { FormAdd, FormEdit }
