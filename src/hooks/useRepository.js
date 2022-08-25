import { useQuery } from '@apollo/client'

import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (id) => {
    const { data } = useQuery(GET_REPOSITORY, {
        variables: { repositoryId: id },
        fetchPolicy: 'cache-and-network',
    })

    return {
        repository: data?.repository,
    }
}

export default useRepository
