import { useState } from 'react';
import { getAll, key, useApplyOfferMutation, useOfferQuery } from '../../core/services/useOfferService';
import { CandidateOffer, Offer } from '../../models';

const ListOffers = () => {

    const { data: offers, isLoading, isError } = useOfferQuery(key, getAll, { enabled: true, staleTime: 10000 });
    const [email, setEmail] = useState("")
    const [offerId, setOfferID] = useState(0)

    const mutation = useApplyOfferMutation(key, email);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :</p>;

    const handleOpenDialog = (offerId: number) => {
        setOfferID(offerId)
        document.getElementById('offer-dialog')?.showModal();
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value)
    }

    const handleConfirm = () => {
        const candidateOffer: CandidateOffer = {
            candidatesId: 0,
            offersId: offerId
        }
        mutation.mutateAsync(candidateOffer);
    };

    const handleCloseModal = () => {
        setEmail("");
    };


    return (
        <>
            <div className="list-offers">
                {
                    offers.map((offer: Offer) => (

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
                                        <button key={skill.id} className="btn-skill inactive">{skill.name}</button>
                                    ))
                                }
                            </div>

                            <div>
                                <div>
                                    <button onClick={() => handleOpenDialog(offer.id)}>Apply</button>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
            <dialog id="offer-dialog">
                <div className="offer-dialog">
                    <h2>Apply to this offer!</h2>
                    <form method="dialog" className="dialog-form">
                        <input onChange={handleEmailChange} type="text" name="email" id="email" />
                        <button onClick={handleConfirm}>Confirm</button>
                        <button onClick={handleCloseModal} className="btn-secondary">Close</button>
                    </form>
                </div>
            </dialog>
        </>

    )
}

export default ListOffers