export interface Iresponse<T> extends express.Response {
    query: T
}