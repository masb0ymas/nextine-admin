import { createStyles, Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons'
import _ from 'lodash'
import {
  OpenDeleteModalEntity,
  OpenDeleteSelectedModalEntity,
} from './interface'

/**
 * Use Style Modal
 */
export const useStyleModal = createStyles((theme) => ({
  modal: { width: 800 },
  modalTitle: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    fontWeight: 700,
  },
  modalLabel: { width: 150, fontWeight: 600 },
}))

/**
 * Open Delete Modal
 * @param values
 * @returns
 */
export const openDeleteModal = (values: OpenDeleteModalEntity) => {
  const { id, mutation, query } = values

  return openConfirmModal({
    title: 'Delete Data',
    centered: true,
    children: <Text size="sm">Are you sure you want to delete this data?</Text>,
    labels: { confirm: 'Confirm Delete', cancel: "No don't delete" },
    confirmProps: { color: 'red' },
    onCancel: () => null,
    onConfirm: async () => {
      try {
        const response = await mutation.mutateAsync(id)
        const message = _.get(response, 'data.message', '')

        showNotification({
          title: 'Berhasil!',
          message,
          icon: <IconCheck size={16} />,
          color: 'green',
        })
      } catch (error) {
        const description = _.get(error, 'response.data.message', '')
        console.log(description)
      } finally {
        query.refetch()
      }
    },
  })
}

/**
 *
 * @param values
 * @returns
 */
export const openDeleteSelectedModal = (
  values: OpenDeleteSelectedModalEntity
) => {
  const { ids, mutation, query } = values

  return openConfirmModal({
    title: 'Delete Selected Data',
    centered: true,
    children: (
      <Text size="sm">Are you sure you want to delete selected data?</Text>
    ),
    labels: { confirm: 'Confirm Delete', cancel: "No don't delete" },
    confirmProps: { color: 'red' },
    onCancel: () => null,
    onConfirm: async () => {
      try {
        const response = await mutation.mutateAsync(ids)
        const message = _.get(response, 'data.message', '')

        showNotification({
          title: 'Berhasil!',
          message,
          icon: <IconCheck size={16} />,
          color: 'green',
        })
      } catch (error) {
        const description = _.get(error, 'response.data.message', '')
        console.log(description)
      } finally {
        query.refetch()
      }
    },
  })
}
