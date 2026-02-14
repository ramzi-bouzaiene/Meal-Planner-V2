import { Table } from 'antd'
import type { TableColumnsType } from 'antd'

interface Props<T> {
  data: T[]
  columns: TableColumnsType<T>
}

export const DataTable = <T extends object>({ data, columns }: Props<T>) => {
  return <Table<T> columns={columns} dataSource={data} />
}
