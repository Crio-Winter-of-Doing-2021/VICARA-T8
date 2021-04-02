import React from 'react';
import ContentLoader from 'react-content-loader';

const FileCardLoader = (props) => {
  let height, width;
  switch (props.screen) {
    case 'mobile': {
      height = '100';
      width = '400';
      break;
    }
    case 'desktop': {
      height = '100';
      width = '1060';
      break;
    }
    case 'large-screen': {
      height = '150';
      width = '1920';
      break;
    }
    default: {
      height = '100';
      width = '1060';
      break;
    }
  }
  return (
    <div>
      <div className="wrapper w-full flex flex-row items-center justify-items-center p-2">
        <div className="w-10 h-9 rounded-sm animate "></div>
        <div className="ml-2 rounded-sm w-full h-5 animate "></div>
      </div>
      <span className="relative flex flex-row border-b"></span>
    </div>
  );
};

{
  /* // const ImageList = props => (
//   <React.Fragment>
//     {Array(5) */
}
//       .fill('')
//       .map((e, i) => (
//         <Loader
//           screen="desktop"
//           key={i}
//           style={{ opacity: Number(2 / i).toFixed(1) }}
//           {...props}
//         />
//       ))}
//   </React.Fragment>
// )

// ImageList.metadata = {
//   name: 'Gaurav Agarwal',
//   github: 'gauravagarwal2704',
//   description: 'List with image (rectangle/circle)',
//   filename: 'ImageList',
// }

export default FileCardLoader;
