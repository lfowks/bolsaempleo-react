import { QueryFunction, useMutation, useQuery, useQueryClient } from "react-query";
import { Offer, CandidateOffer } from "../../models";
import api from "../api/config"

export const key = 'offers';
export const singleKey = 'offer';
export const mutationKey = 'offer';

//HTTP Requests

export const getAll = async (): Promise<Offer[]> => {
    const result = await api.get(`/${key}`)
    return result.data
}

export const apply = async (candidateOffer:CandidateOffer, email: string): Promise<void> => {
    const options = {
        headers:{
            email: email
        }
    }
    const result = await api.post(`/candidates/apply/`,candidateOffer,options)
    return result.data
}

export const unapply = async (candidateOffer:CandidateOffer): Promise<void> => {
    const result = await api.post(`/candidates/unapply/`,candidateOffer)
    return result.data
}

//ReactQuery Service Hooks
export const useOfferQuery = (queryKey:string, queryFunction: QueryFunction, options: any) => {
    return useQuery<any>(queryKey, queryFunction, options);
};

export const useApplyOfferMutation = (queryKey:string, email: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (candidateOffer: CandidateOffer) => {
            return apply(candidateOffer, email)
        }, onSettled: () => queryClient.invalidateQueries(queryKey), mutationKey: mutationKey
    })
};

export const useUnpplyOfferMutation = (queryKey:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (candidateOffer: CandidateOffer) => {
            return unapply(candidateOffer)
        }, onSettled: () => queryClient.invalidateQueries(queryKey), mutationKey: mutationKey
    })
};
