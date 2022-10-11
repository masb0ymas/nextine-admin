import { createStyles, Table as MantineTable } from '@mantine/core'
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
  data: Array<TData>
  columns: ColumnDef<TData, any>[]
}

const useStyles = createStyles(() => ({
  td: {
    textAlign: 'left',
  },
}))

function MyTable<TData>(props: MyTableProps<TData>) {
  const { data, columns, ...tableProps } = props

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...tableProps,
  })

  const { classes } = useStyles()

  return (
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
  )
}

export default MyTable
