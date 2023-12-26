import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import useStore from '../store'
import fetchPartDetails  from '../api/fetchPartDetails'

type PartType = 'cooler' | 'cpu' | 'gpu' | 'motherboard' | 'memory' | 'hdd' | 'ssd' | 'power' | 'pccase' | 'display'

const useEditPart = (partType: PartType, partId: string | number) => {
    const queryKey = ['part', partType, partId]
    const queryFn = () => fetchPartDetails(partType as PartType, parseInt(partId as string))
    const { data: part, isLoading, isError } = useQuery(queryKey, queryFn, {
        enabled: !!partType && !!partId,
    })
    const { updateEditedPart } = useStore()

    useEffect(() => {
        if (part) {
            updateEditedPart(part)
        }
    }, [part, updateEditedPart])

    return { part, isLoading, isError }
}

export default useEditPart