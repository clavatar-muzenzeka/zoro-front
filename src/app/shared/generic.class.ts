export class GenericResponseBody<T>{
    success : boolean;
    metadatas : any;
    payload : T;
    error: string;
}