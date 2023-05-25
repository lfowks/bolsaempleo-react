import { Candidate } from "../../models";
import { key, getAll, useCandidateQuery } from "../../core/services/useCandidateService";
import { Link } from "react-router-dom";

const ListCandidates = () => {

    const { data: candidates, isLoading, isError } = useCandidateQuery(key, getAll ,{ enabled: true, staleTime: 10000 });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :</p>;

    return (
        <>
            <table>
                <thead className="thead">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Summary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates?.map((candidate: Candidate) => (
                        <tr key={candidate.id}>
                            <th>{candidate.id}</th>
                            <th>{candidate.name}</th>
                            <th>{candidate.email}</th>
                            <th>{candidate.summary}</th>
                            <th className="action-buttons">
                            <Link to={`/candidate/${candidate.id}`}><button title="View and Edit" ><i className="bi bi-pencil-fill"></i></button></Link>
                                <button title="Edit Skills"><i className="bi bi-clipboard2-plus-fill"></i></button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table></>

    );
}

export default ListCandidates;
