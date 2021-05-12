import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Text } from "@chakra-ui/react";
import { firebase } from "../firebase";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
//================================================================
function FileUpload(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ maxFiles: 1, onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}-{file.size} bytes
    </li>
  ));
  const upload = async (acceptedFiles) => {
    let bucketName = "files";
    let file = acceptedFiles[0];
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    await storageRef.put(file);
    let download = await storageRef.getDownloadURL();
    console.log(download);
    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
    //   let downloadUrl = uploadTask.snapshot.downloadURL;
    //   console.log(downloadUrl);
    // });
  };
  async function onDrop(acceptedFiles) {
    await upload(acceptedFiles);
  }
  return (
    <div className="container" style={{ paddingTop: "180px" }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <Text pt={8} color={"gray.500"}>
          No files yet
        </Text>
        <p>{files}</p>
      </aside>
    </div>
  );
}

export default FileUpload;
