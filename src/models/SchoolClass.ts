import Person from './Person';

export default interface SchoolClass {
    id:number,
    name:string,
    students: Person[],
    teacher: Person
}
