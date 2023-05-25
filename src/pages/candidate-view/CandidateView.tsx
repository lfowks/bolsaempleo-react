import { Link, useParams } from "react-router-dom";
import { getById, singleKey, useCandidateQuery } from "../../core/services/useCandidateService";
import { Skill } from "../../models";

const CandidateView = () => {

    const { id } = useParams();

    const { data: candidate, isLoading, isError } = useCandidateQuery(singleKey,() => getById(id),{ enabled: true, staleTime: 10000 });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :</p>;
    return (
        <div>

            <h3> {candidate.name} </h3>
            <a> {candidate.email} </a>
            <div> {candidate.summary} </div>
            <div className="skills">
                {
                    candidate.skills.map((skill:Skill)=>(
                        <button key={skill.id} className="btn-skill default" >{skill.name}</button>
                    ))
                }                
            </div>

            <div className="actions">
            <Link to={`/candidate-offers/${candidate.id}`}>View my applications</Link>
            </div>
        </div>
    )
}

export default CandidateView