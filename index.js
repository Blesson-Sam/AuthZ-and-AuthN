
const express=require('express');
var cors = require('cors');
require('dotenv').config();
const routes=require('./Routes/route');
const app=express();
const PORT=process.env.PORT || 3001;
const dbConnect=require('./Config/database');

    
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:'*',
    })
)
app.use('/api/v1',routes);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

dbConnect();

app.get("/", (req, res) => {
    res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
  });

