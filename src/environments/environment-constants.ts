const HTTP = 'http://';

const REST_API_PATH = '/purchases';
const REST_API_ENDPOINT = `${ REST_API_PATH }`;

//export const LOCAL_SERVER_HOST = 'ec2-3-139-58-139.us-east-2.compute.amazonaws.com';
export const LOCAL_SERVER_HOST = 'localhost';
export const LOCAL_SERVER_PORT = '8888';

export const LOCAL_SERVER_BASE_PATH = `${ HTTP }${ LOCAL_SERVER_HOST }:${ LOCAL_SERVER_PORT }${ REST_API_ENDPOINT }`;