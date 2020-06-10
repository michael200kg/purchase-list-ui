const HTTP = 'http://';

const REST_API_PATH = '/service/v';
const REST_API_VERSION = '1';
const REST_API_ENDPOINT = `${ REST_API_PATH }${ REST_API_VERSION }`;

export const LOCAL_SERVER_HOST = 'localhost';
export const LOCAL_SERVER_PORT = '8888';

export const LOCAL_SERVER_BASE_PATH = `${ HTTP }${ LOCAL_SERVER_HOST }:${ LOCAL_SERVER_PORT }${ REST_API_ENDPOINT }`;