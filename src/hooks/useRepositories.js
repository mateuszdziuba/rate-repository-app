// import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
    //   const [repositories, setRepositories] = useState();
    //   const [loading, setLoading] = useState(false);

    //   const fetchRepositories = async () => {
    //     setLoading(true);

    //     // Replace the IP address part with your own IP address!
    //     const response = await fetch('http:///172.18.204.117:5000/api/repositories');
    //     const json = await response.json();

    //     setLoading(false);
    //     setRepositories(json);
    //   };

    // useEffect(() => {
    //   fetchRepositories();
    // }, []);

    // return { repositories, loading, refetch: fetchRepositories };

    console.log(variables && { variables })

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        ...(variables && { variables }),
    })

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage
        
        if (!canFetchMore) {
            return;
        }

        fetchMore({ variables: {
            after: data.repositories.pageInfo.endCursor,
            ...variables
        }})
    }


    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        ...result
    }
}

export default useRepositories
