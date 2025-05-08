import express from "express";
import path from "path";
// Set Static Folder
app.use(express.static("public"))
const app = express();

const port = 300 || process.env.PORT    

app.listen(port , () =>{
    console.log(`Server is running on port ${port}`);
})

app.get("/" , (req , res) => {
    res.send("Hello World")
})