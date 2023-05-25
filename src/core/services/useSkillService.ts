import { QueryFunction, useMutation, useQuery, useQueryClient } from "react-query";
import { Skill, CandidateSkill } from "../../models";
import api from "../api/config"

export const key = 'skills';
export const singleKey = 'skill';
export const mutationKey = 'skill';

//HTTP Requests

export const getAll = async (): Promise<Skill[]> => {
    const result = await api.get(`/${key}`)   
    return result.data
}

export const assign = async (candidateSkill:CandidateSkill): Promise<void> => {
    const result = await api.post(`/${key}/assign/`,candidateSkill)
    return result.data
}

export const unassign = async (candidateSkill:CandidateSkill): Promise<void> => {
    const result = await api.post(`/${key}/deassign/`,candidateSkill)
    return result.data
}

//ReactQuery Service Hooks
export const useSkillQuery = (queryKey:string, queryFunction: QueryFunction, options: any) => {
    return useQuery<any>(queryKey, queryFunction, options);
};

export const useAssignSkillMutation = (queryKey:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (candidateSkill: CandidateSkill) => {
            return assign(candidateSkill)
        }, onSettled: () => queryClient.invalidateQueries(queryKey), mutationKey: mutationKey
    })
};

export const useUnassignSkillMutation = (queryKey:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (candidateSkill: CandidateSkill) => {
            return unassign(candidateSkill)
        }, onSettled: () => queryClient.invalidateQueries(queryKey), mutationKey: mutationKey
    })
};
