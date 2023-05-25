import Offer from "./offer";

export default interface Company{
    id: number,
    name: string,
    offers: Offer[]
}