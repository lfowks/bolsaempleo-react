import Offer from "./offer";
import Skill from "./skill";

export default interface Candidate{
    id:number,
    name:string,
    email:string,
    summary:string,
    skills?: Skill[],
    offers?: Offer[]
}