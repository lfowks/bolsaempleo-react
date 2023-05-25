import { QueryFunction, useMutation, useQuery, useQueryClient } from "react-query";
import { Candidate } from "../../models";
import api from "../api/config"

export const key = 'candidates';
export const singleKey = 'candidate';
export const mutationKey = 'candidate';

//HTTP Requests
export const create = async (candidate: Candidate): Promise<Candidate> => {
    const result = await api.post(`/${key}`, candidate)
    return result.data
}
    
export const getAll = async (): Promise<Candidate[]> => {
    const result = await api.get(`/${key}`)
    return result.data
}

export const getById = async (id: string | undefined): Promise<Candidate> => {
    const result = await api.get(`/${key}/${id}`)
    return result.data
}
    

//ReactQuery Hooks
export const useCandidateQuery = (queryKey:string, queryFunction: QueryFunction, options: any) => {
    return useQuery<any>(queryKey, queryFunction, options);
};

export const useCandidateMutation = (queryKey:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (candidate: Candidate) => {
            return create(candidate)
        }, onSettled: () => queryClient.invalidateQueries(queryKey), mutationKey: mutationKey
    })
};
