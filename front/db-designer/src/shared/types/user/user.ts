export type User = {
    'id'?: number,
    'first_name': string,
    'last_name': string,
    'email': string,
    'refresh': string | null;
    'access': string | null;
    'password'?: string,
    're_password'?: string,
}