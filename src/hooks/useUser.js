import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useUser = (variables) => {
    const { data } = useQuery(ME, { variables })
    return { data }
}

export default useUser
