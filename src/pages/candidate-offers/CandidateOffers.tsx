import { getById, singleKey, useCandidateQuery } from '../../core/services/useCandidateService';
import { useParams } from 'react-router-dom';
import { CandidateOffer, Offer } from '../../models';
import { useUnpplyOfferMutation } from '../../core/services/useOfferService';

const CandidateOffers = () => {

    const { id } = useParams();

    const { data: candidate, isLoading, isError } = useCandidateQuery(singleKey, () => getById(id), { enabled: true, staleTime: 10000 });

    const mutation = useUnpplyOfferMutation(singleKey);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :</p>;

    const handleUnapply = (candidateId: number,offerId: number) =>{
        const candidateOffer:CandidateOffer = {
            candidatesId:candidateId,
            offersId:offerId
        };

        mutation.mutateAsync(candidateOffer);
    }

    return (
        <div>
            <h3> {candidate.name}</h3>
            <a> {candidate.email}</a>
            <div> {candidate.summary}</div>

            <h3 className="subtitle">Applied Offers</h3>
            <div className="list-offers">
                {
                    candidate.offers.map((offer: Offer) => (
                        <div key={offer.id} className="item-offer">
                            <div>
                                <h3>{offer.name}</h3>
                                <i>{new Date(offer.createdDate).toLocaleDateString('en-US')}</i>
                            </div>
                            <span>{offer.description}</span>
                            <div><strong>Company: {offer.company.name}</strong></div>
                            <div className="skills">
                                {
                                    offer.skills.map((skill) => (
                                        <button key={skill.id} className={`btn-skill ${skill.status ? 'active' : 'inactive'}`} >{skill.name}</button>
                                    ))
                                }
                            </div>
                            <div>
                                <button onClick={()=>handleUnapply(candidate.id,offer.id)}>Unapply</button>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default CandidateOffers