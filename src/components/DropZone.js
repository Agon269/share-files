import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  height: "130px",
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

export default function DropZone({ done }) {
  const [file, setFile] = useState(null);
  const toast = useToast();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ maxFiles: 1, onDrop, maxSize: 200000000 });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  async function onDrop(acceptedFiles, fileRejections) {
    if (fileRejections.length > 0) {
      const message = fileRejections[0].errors[0].message;
      toast({
        title: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setFile(true);
      done(acceptedFiles[0]);
    }
  }
  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <Text m={3} color={"white"} textAlign={"center"}>
          {file === null ? "No files yet" : ""}
        </Text>
      </aside>
    </div>
  );
}
