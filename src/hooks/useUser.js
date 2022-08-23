import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useUser = () => {
    const { data } = useQuery(ME)
    return data
}

export default useUser
