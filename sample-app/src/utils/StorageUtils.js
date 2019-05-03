import { AsyncStorage } from 'react-native';

class StorageUtils {
  getSavedPhotoUriList = async () => {
    let photoList = await AsyncStorage.getItem('PHOTO_LIST');
    photoList = JSON.parse(photoList);
    return photoList;
  };

  savePhotoUriList = async photoList => {
    await AsyncStorage.setItem('PHOTO_LIST', JSON.stringify(photoList));
  };
}

const storageUtils = new StorageUtils();

export default storageUtils;
