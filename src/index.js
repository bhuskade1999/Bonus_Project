const express = require('express');
const route  = require("./routes/route");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://nishant55:1234@nishant99.et97kst.mongodb.net/BP5", { useNewUrlParser: true })
.then(()=>console.log("connected successfully"))
.catch(err => console.log(err));

app.use("/",route)

app.get("/", (req,res)=>{
        res.send("server is Connected")
})

app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
});
