import Company from "./company";
import Skill from "./skill";

export default interface Offer{
    id: number,
    name: string,
    description: string,
    company: Company,
    createdDate: Date,
    skills: Skill[]
}