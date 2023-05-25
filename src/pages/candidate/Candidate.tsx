import { key, useCandidateMutation } from '../../core/services/useCandidateService';
import { formToObject } from '../../core/utils/utils';

const Candidate = () => {

    const mutation = useCandidateMutation(key);

    const handleSubmit = (event: any) =>{
        event.preventDefault();
        // eslint-disable-next-line prefer-const
        let newCandidate = {
            id: 0,
            name: "",
            email: "",
            summary: ""
        };

        newCandidate = formToObject(newCandidate,event.target.elements)

        //mutation.mutateAsync(newCandidate);
        console.log(newCandidate)
    }

    return (
        <>
            <div className="candidate-form">
                <h3>Add Candidate</h3>
                <form onSubmit={handleSubmit}>
                    <div className="input-name">
                        <label htmlFor="name">Name </label> <br />
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="input-email">
                        <label htmlFor="email">Email </label> <br />
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className="input-summary">
                        <label htmlFor="summary">Summary </label> <br />
                        <textarea name="summary" id="summary" rows={3}></textarea>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </>
    )
}

export default Candidate