import './image-upload.scss';
import React, { Props } from 'react';
import { Media, Label } from 'reactstrap';
import { AvField } from 'availity-reactstrap-validation';

import { setFileData, byteSize } from 'react-jhipster';

export interface IImageUploadState {
  imagePreviewUrl: any;
}

export interface IImageUploadProps {
  onPreviewLoadEnd: Function;
  initFileURL?: string;
}

class ImageUpload extends React.Component<IImageUploadProps, IImageUploadState> {
  public static defaultProps: Partial<IImageUploadProps> = {
    initFileURL: null
  };

  state: IImageUploadState = {
    imagePreviewUrl: null
  };

  handleImageChange = e => {
    e.preventDefault();
    setFileData(e, (contentType, data) => this.props.onPreviewLoadEnd(data, contentType), true);
    const imgFile = e.target.files[0];
    this.props.onPreviewLoadEnd(imgFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(imgFile);
  };

  render() {
    const imagePreviewUrl = this.state.imagePreviewUrl;
    let imagePreview = <Label>Please select an Image for Preview</Label>;
    if (imagePreviewUrl !== null) {
      imagePreview = <Media src={imagePreviewUrl} className="thumbnail" alt="image" />;
    } else if (this.props.initFileURL) {
      imagePreview = <Media src={this.props.initFileURL} className="thumbnail" alt="image" />;
    }

    return (
      <div>
        <div>{imagePreview}</div>
        <AvField name="imageupload" type="file" onChange={this.handleImageChange} />
      </div>
    );
  }
}

export default ImageUpload;
