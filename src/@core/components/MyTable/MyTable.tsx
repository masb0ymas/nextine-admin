import useUrlQuery from '@core/hooks/useUrlQuery/useUrlQuery'
import { ActionIcon, Group } from '@mantine/core'
import { IconEdit, IconEye, IconTrash, IconTrashX } from '@tabler/icons'
import { QueryObserverBaseResult, useMutation } from '@tanstack/react-query'
import { DataTable, DataTableColumn } from 'mantine-datatable'
import Router from 'next/router'
import { useState } from 'react'
import { openDeleteModal, openDeleteSelectedModal } from '../MyModal/MyModal'

type Query = QueryObserverBaseResult & {
  data: any[]
  helpers: ReturnType<typeof useUrlQuery>
  total: number
}

interface MyTableEntity<T> extends ReturnType<typeof DataTable<T>> {
  query: Query
  columns: DataTableColumn<T>[]
  baseURL: string
  softDelete: ReturnType<typeof useMutation>
  multipleSoftDelete: ReturnType<typeof useMutation>
  showModalDetail: (data: T) => void
  isEdit?: boolean
  isDeleted?: boolean
}

function MyTable<T>(props: MyTableEntity<T>) {
  const {
    query,
    columns,
    baseURL,
    softDelete,
    multipleSoftDelete,
    showModalDetail,
    isEdit = true,
    isDeleted = true,
    ...otherProps
  } = props

  const { data, total, isFetching } = query

  const [selectedRecords, setSelectedRecords] = useState<T[]>([])

  // custom columns
  const newColumns: DataTableColumn<T>[] = [
    ...columns,
    {
      accessor: 'actions',
      title: 'Actions',
      textAlignment: 'center',
      width: 150,
      render: (info) => {
        // @ts-expect-error
        const id = String(info.id)

        return (
          <Group spacing={4} position="center" noWrap>
            {/* Check Edit */}
            {isEdit && (
              <ActionIcon
                color="blue"
                component="a"
                href={`${baseURL}/${id}/edit`}
              >
                <IconEdit size={18} />
              </ActionIcon>
            )}

            {/* Check Deleted */}
            {isDeleted && (
              <ActionIcon
                color="red"
                onClick={() =>
                  openDeleteModal({ id, mutation: softDelete, query })
                }
              >
                <IconTrash size={18} />
              </ActionIcon>
            )}
          </Group>
        )
      },
    },
  ]

  return (
    <DataTable
      minHeight={300}
      withBorder={false}
      borderRadius="sm"
      withColumnBorders
      striped={false}
      highlightOnHover
      verticalAlignment="top"
      verticalSpacing="md"
      horizontalSpacing="md"
      fetching={isFetching}
      columns={newColumns}
      records={data ?? []}
      totalRecords={total}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      rowContextMenu={{
        borderRadius: 'md',
        items: (info) => [
          {
            key: 'detail',
            icon: <IconEye size={14} />,
            title: `Detail`,
            onClick: () => showModalDetail(info),
          },
          {
            key: 'edit',
            icon: <IconEdit size={14} />,
            title: `Edit`,
            hidden: !isEdit,
            // @ts-ignore
            onClick: () => Router.push(`${baseURL}/${info.id}/edit`),
          },
          {
            key: 'delete',
            title: `Delete`,
            icon: <IconTrashX size={14} />,
            color: 'red',
            hidden:
              !isDeleted ||
              (selectedRecords.length !== 0 && selectedRecords.length > 1),
            onClick: () =>
              openDeleteModal({
                // @ts-ignore
                id: info.id,
                // @ts-ignore
                mutation: softDelete,
                // @ts-ignore
                query,
              }),
          },
          // @ts-ignore
          { key: 'divider-1', divider: true, color: 'gray' },
          {
            key: 'deleteMany',
            hidden:
              !isDeleted ||
              selectedRecords.length <= 1 ||
              // @ts-ignore
              !selectedRecords.map((r) => r.id).includes(info.id),
            title: `Delete ${selectedRecords.length} selected records`,
            icon: <IconTrash size={14} />,
            color: 'red',
            onClick: () =>
              openDeleteSelectedModal({
                // @ts-ignore
                ids: selectedRecords?.map((e) => e.id),
                // @ts-ignore
                mutation: multipleSoftDelete,
                // @ts-ignore
                query,
              }),
          },
        ],
      }}
      {...otherProps}
    />
  )
}

export default MyTable
