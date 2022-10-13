import { BASE_API_URL } from '@core/constants/ConstBaseURL'
import useUrlQuery, {
  UseUrlQueryOptions,
} from '@core/hooks/useUrlQuery/useUrlQuery'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserRelationEntity } from 'data/entities/User'
import UserRepository from 'data/repository/UserRepository'

type UseUserResult = {
  data: UserRelationEntity[]
  total: number
}

type TQueryFnData = UseUserResult
type TError = AxiosError

// endpoint API
const endpointURL = `${BASE_API_URL}/auth/verify-session?`

function useVerifySession(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<TQueryFnData, TError>(
    urlQuery.transformKey('/auth/verify-session'),
    () =>
      UserRepository.api
        .get(urlQuery.transformUrl(endpointURL))
        .then((res) => res.data),

    {
      retry: (failureCount, error: AxiosError) => {
        if (error?.response?.status === 401) {
          return false
        }
        return failureCount <= 3
      },
      ...options,
    },
  )

  return {
    ...query,

    data: query.data?.data,
    total: query.data?.total,
    helpers: urlQuery,
  }
}

export default useVerifySession
