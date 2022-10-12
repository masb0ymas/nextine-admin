import {
  Badge,
  createStyles,
  Group,
  Pagination,
  Skeleton,
  Table as MantineTable,
} from '@mantine/core'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table'
import _ from 'lodash'
import React from 'react'

interface MyTableProps<TData> extends Partial<TableOptions<TData>> {
  columns: ColumnDef<TData, any>[]
  data?: Array<TData>
  total?: number
  isLoading?: boolean
}

const useStyles = createStyles(() => ({
  td: {
    textAlign: 'left',
  },
}))

function MyTable<TData>(props: MyTableProps<TData>) {
  const { data, columns, isLoading = false, total = 0, ...tableProps } = props

  const newData = data ?? []

  const table = useReactTable({
    data: newData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...tableProps,
  })

  const { classes } = useStyles()

  return (
    <Skeleton visible={isLoading}>
      <MantineTable highlightOnHover withColumnBorders verticalSpacing="sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const { columnDef } = cell.column
                const accessorKey = _.get(columnDef, 'accessorKey', '')

                return (
                  <td
                    className={classes.td}
                    key={cell.id}
                    width={cell.column.columnDef.size}
                    style={accessorKey === 'id' ? { textAlign: 'center' } : {}}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </MantineTable>

      <Group mt="md" position="apart">
        <Badge size="lg">{`Total: ${total}`}</Badge>

        <Pagination total={10} position="right" />
      </Group>
    </Skeleton>
  )
}

export default MyTable
