// import React, { useState } from "react";
// import { Flex, Button, Box, Container } from "@chakra-ui/react";
// import FileUpload from "../components/FileUpload";
// import Download from "../components/Download";
// function Home() {
//   const [usage, setUsage] = useState(null);

//   const choose = () => {
//     if (usage === null) {
//       return null;
//     } else if (usage === "download") {
//       return <Download />;
//     } else if (usage === "upload") {
//       return <FileUpload />;
//     }
//   };

//   return (
//     <>
//       <Container>
//         {" "}
//         {choose()}
//         <Flex minH={"70vh"} align={"center"} justify={"center"} mt={"-20"}>
//           <Box>
//             <Button
//               bg="teal.700"
//               mr="4"
//               onClick={() => {
//                 setUsage("upload");
//               }}
//             >
//               Upload
//             </Button>
//             <Button bg="teal.700" onClick={() => setUsage("download")}>
//               Download
//             </Button>
//           </Box>
//         </Flex>
//       </Container>
//     </>
//   );
// }

// export default Home;
// {
//   /* <FileUpload />
//         <Download /> */
// }
