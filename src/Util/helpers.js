export const checkAudioFormat = (event) => {
  // const selectedFile = event.target.files[0];
  // const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
  // if (fileExtension === "mp3" || fileExtension === "wav") {
  //     return {
  //         selectedFile: selectedFile,
  //         error: false
  //     }
  // } else {
  //     return {
  //         selectedFile: null,
  //         error: true
  //     }
  // }
  return {
    selectedFile: event.target.files[0],
    error: false,
  };
};
