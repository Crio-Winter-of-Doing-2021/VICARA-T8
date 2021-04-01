import React from 'react';
import FileIcon, { ColorScheme, IconStyle } from 'react-fileicons';
const FileThumbnail = ({ ext }) => {
  const constant = {
    text: ColorScheme.blue,
    image: ColorScheme.green,
    video: ColorScheme.red,
    application: ColorScheme.yellow,
  };
  return (
    <div>
      <FileIcon
        extension={ext}
        colorScheme={constant[ext]}
        iconStyle={IconStyle.gradient}
        size={26}
        background="#efefef"
      />
    </div>
  );
};

export default FileThumbnail;
