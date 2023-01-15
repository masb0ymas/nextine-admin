import useUrlQuery from '@core/hooks/useUrlQuery/useUrlQuery'
import { QueryObserverBaseResult, useMutation } from '@tanstack/react-query'

type Query = QueryObserverBaseResult & {
  data: any[]
  helpers: ReturnType<typeof useUrlQuery>
  total: number
}

export interface OpenModalEntity {
  query: Query
  mutation: ReturnType<typeof useMutation>
}

export interface OpenDeleteModalEntity extends OpenModalEntity {
  id: string
}

export interface OpenDeleteSelectedModalEntity extends OpenModalEntity {
  ids: string[]
}
