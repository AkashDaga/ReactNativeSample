import Config from 'react-native-config';

const BASE_URL = Config.SERVER_BASE_URL;

console.log('BASE_URL', BASE_URL);

export const UPLOAD_PHOTO = `${BASE_URL}/emenator-api/v1/emenator/multiple-fileuploads.php`;
