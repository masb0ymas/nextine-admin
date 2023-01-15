import CustomLoadingOverlay from '@core/components/CustomLoadingOverlay'
import PageHeader from '@core/components/PageHeader'
import { Button, Divider, Grid, Paper, Text, TextInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons'
import { useMutation } from '@tanstack/react-query'
import { RoleAttributes } from 'data/entities/Role'
import useRoleById from 'data/query/Role/useRoleById'
import RoleRepository from 'data/repository/RoleRepository'
import roleSchema from 'data/validation/master/data/role'
import { queryClient } from 'layouts/core'
import { get } from 'lodash'
import Router, { useRouter } from 'next/router'
import { useState } from 'react'

interface AbstractFormProps {
  initialValues: Record<string, any>
  validate: Record<string, any>
  isEdit?: boolean
  pageProps?: any
  mutation: ReturnType<typeof useMutation<any, any, any, any>>
}

function AbstractForm({
  isEdit,
  mutation,
  initialValues,
  validate,
}: AbstractFormProps) {
  const [visible, setVisible] = useState<boolean>(false)

  const baseUrl = `/admin/settings/account?tabs=role`

  const form = useForm({
    initialValues,

    validate,
  })

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
        targetURL={baseUrl}
        title="Account"
        subTitle={`${isEdit ? 'Edit' : 'Add'} Role`}
      />
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Grid gutter="xl" columns={24}>
          <Grid.Col xs={24} md={16}>
            <Paper shadow="sm" radius="md" p="lg">
              <Grid gutter="xl" columns={24}>
                <Grid.Col xs={24} md={12}>
                  <TextInput
                    required
                    label="Nama Role"
                    placeholder="Input Nama Role"
                    {...form.getInputProps('name')}
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
          </Grid.Col>
        </Grid>
      </form>
    </div>
  )
}

function FormAdd() {
  const createData = useMutation(
    (data: RoleAttributes) => RoleRepository.create(data),
    {
      onSettled() {
        queryClient.invalidateQueries(['/role'])
      },
    },
  )

  return (
    <AbstractForm
      initialValues={{
        name: '',
      }}
      validate={yupResolver(roleSchema.create)}
      mutation={createData}
    />
  )
}

function FormEdit(props: any) {
  const { pageProps } = props
  const router = useRouter()

  const id = router?.query?.id
  const isEdit = Boolean(id)

  const queryById = useRoleById(String(id), {}, { enabled: !!id })
  const { isLoading, remove, data } = queryById

  const updateData = useMutation(
    (data: RoleAttributes) => RoleRepository.update(String(id), data),
    {
      onSettled() {
        remove()
        queryClient.invalidateQueries(['/role'])
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
      }}
      validate={yupResolver(roleSchema.update)}
      isEdit={isEdit}
      mutation={updateData}
      pageProps={pageProps}
    />
  )
}

export { FormAdd, FormEdit }
