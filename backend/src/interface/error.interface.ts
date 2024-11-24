export default interface ICustomError extends Error {
    status: number;
    error_code: string;
    error_description: string;
}