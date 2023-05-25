import { CandidateSkill, Skill } from '../../models'
import { useParams } from 'react-router-dom';
import { getById, singleKey, useCandidateQuery } from '../../core/services/useCandidateService';
import { useSkillQuery, key, getAll, useAssignSkillMutation, useUnassignSkillMutation } from '../../core/services/useSkillService';
import { useEffect, useState } from 'react';

const CandidateSkills = () => {

    const { id } = useParams();

    const { data: candidate, isLoading, isError } = useCandidateQuery(singleKey, () => getById(id), { enabled: true, staleTime: 10000 });

    const assignSkillMutation = useAssignSkillMutation(singleKey);
    const unassignSkillMutation = useUnassignSkillMutation(singleKey);

    const { data: skills } = useSkillQuery(key, getAll, { enabled: true, staleTime: 10000 });

    const [ renderSkills, setRenderSkills ] = useState<Skill[]>(skills)

    const setSkillStatus = () => {
        setRenderSkills(_ => {
            return skills?.map((skill: Skill) => {
                return {
                    ...skill,
                    status: candidate.skills?.find((candidateSkill: Skill) => candidateSkill.id == skill.id) ? true : false
                };
            });
        })        
    }

    useEffect(() => {
        setSkillStatus();    
    }, [candidate])



    const handleAssignSkill = (skillId: number, skilStatus: boolean | undefined) => {

        const candidateSkill: CandidateSkill = {
            candidatesId: candidate.id,
            skillsId: skillId
        }

        if (!skilStatus)
            assignSkillMutation.mutateAsync(candidateSkill).then(_=>{
                setSkillStatus();  
            });
        else
            unassignSkillMutation.mutateAsync(candidateSkill).then(_=>{
                setSkillStatus();  
            });
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :</p>;

    return (
        <>
            <h3> {candidate.name}</h3>
            <a> {candidate.email}</a>
            <div> {candidate.summary}</div>

            <div className="skills">
                {
                    renderSkills?.map((skill: Skill) => (
                        <button key={skill.id} onClick={() => handleAssignSkill(skill.id, skill.status)} className={`btn-skill ${skill.status ? 'active' : 'inactive'}`}>
                            {skill.name}
                        </button>
                    ))
                }

            </div >

        </>
    )
}

export default CandidateSkills