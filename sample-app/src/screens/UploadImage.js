import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View,StyleSheet, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {TextBolder, ButtonFullWidth, SpinnerWithLabel} from '../components/common'

import theme from '../styles/themeStyle'
import { UPLOAD_PHOTO } from '../utils/ApiUrls'
import StorageUtils from '../utils/StorageUtils'
import { updateSavedPhoto } from '../redux/actions';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class UploadImage extends Component {

  constructor(props){
    super(props);
    this.state={
      isSubmitting: false,
      uploadNumber: 0
    }
  }

  selectImageFromCamera = () => {
    const photoList = [];
    ImagePicker.openCamera({
      width: height,
      height: width,
    }).then(image => {
      photoList.push(image);
      this.uploadImage(photoList);
    });
  }


  selectImageFromGallery = () => {
    const photoList = [];
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      images.forEach((image) => {
        photoList.push(image)
      });

      this.uploadImage(photoList);
    });
  }

  uploadImage = async (photoList) => {
    this.setState({ isSubmitting: true });

    photoList.forEach((image, index) => {
      this.setState({uploadNumber: index})
    const path = image.path;

    ApiUtil.RNFetchBlobCreateRequest(UPLOAD_PHOTO, 'POST',{
        filename: image.filename,
        data: RNFetchBlob.wrap(path)
      }).then(responseJson => {
        console.log(responseJson);
        const savedPhotoList = StorageUtils.getSavedPhotoUriList();
        savedPhotoList.push(path);
        StorageUtils.savePhotoUriList(savedPhotoList);
        this.props.updateSavedPhoto();
      });
    });
    this.setState({isSubmitting: false,uploadNumber: 0})
  };


  renderHeader = () => {
    return <TextBolder style={styles.headerStyle}>Upload Image</TextBolder>;
  };

  renderSelectPhotoFromCameraButton = () => {
    return <ButtonFullWidth disabled = {this.state.isSubmitting} containerStyle={styles.buttonStyle} onPress={()=>{this.selectImageFromCamera()}}>Select From Camera</ButtonFullWidth>;
  };

  renderSelectPhotoFromGalleryButton = () => {
    return <ButtonFullWidth disabled = {this.state.isSubmitting} containerStyle={styles.buttonStyle} onPress={()=>{this.selectImageFromGallery()}}>Select From Gallery</ButtonFullWidth>;
  };

  renderUploadImageProgressBar = () => {
    if(this.isSubmitting) {

    return(<SpinnerWithLabel label = {`${this.state.uploadNumber}th photo is getting uploaded`}/>)
  } else {
      return <View/>
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderSelectPhotoFromCameraButton()}
        {this.renderSelectPhotoFromGalleryButton()}
        {this.renderUploadImageProgressBar()}
      </View>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  { updateSavedPhoto }
)(UploadImage);

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.WHITE_COLOR
  },
  headerStyle:{
    marginTop:50,
    fontSize: theme.FONT_SIZE_LARGE
  },
  buttonStyle: {
    marginTop: 20
  }
});
