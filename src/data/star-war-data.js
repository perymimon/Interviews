import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

const baseUrl = 'https://swapi.dev/api/'

export function useStarWarData ({entities: endpoints = [], searchQuery}) {
    const uniqueObj = Object.fromEntries(endpoints.map(key => [key, true]))
    return useQuery({
        queryKey: ['starWarsData', uniqueObj, searchQuery], // Unique key for caching
        queryFn: async () => {
            const requests = endpoints.map(entity => axios.get(`${baseUrl}${entity}/?search=${searchQuery}`))
            const responses = await Promise.all(requests)
            return responses.map(res => res.data.results).flat()
        },
        enabled: endpoints.length !== 0,
    })

}

/* Alternative Approach */
export function useStarWarData2 ({entities: endpoints = [], searchQuery}) {

    const planetsQuery = useQuery({
        queryKey: ['planets', searchQuery],
        queryFn: async () => {
            return await axios.get(`https://swapi.dev/api/planets/?search=${searchQuery}`)
                .then(res => res.data.results)
        },
        enabled: endpoints.includes('planets'),
    })

    const peopleQuery = useQuery({
        queryKey: ['people', searchQuery],
        queryFn: async () => {
            return await axios.get(`https://swapi.dev/api/people/?search=${searchQuery}`)
                .then(res => res.data.results)
        },
        enabled: endpoints.includes('people'),
    })

    const filmsQuery = useQuery({
        queryKey: ['films', searchQuery],
        queryFn: async () => {
            return await axios.get(`https://swapi.dev/api/films/?search=${searchQuery}`)
                .then(res => res.data.results)
        },
        enabled: endpoints.includes('films'),
    })

    return {
        isError: [planetsQuery, peopleQuery, filmsQuery].some(q => q.isError),
        isLoading: [planetsQuery, peopleQuery, filmsQuery].some(q => q.isLoading),
        planets: planetsQuery.data,
        people: peopleQuery.data,
        films: filmsQuery.data,
    }

}