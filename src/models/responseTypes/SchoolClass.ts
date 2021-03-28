import Person from '../Person';

export default interface SchoolClassResponse {
    id:number,
    name:string,
    students: Person[],
    teacher: Person
}
