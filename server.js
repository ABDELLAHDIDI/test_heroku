const express = require('express');
const serverStatic = require('server-static');
const path = require('path'); 

const app = express();
 
app.use('/',serverStatic(path.join(__dirname,'/dist')))

app.get(/.*/, (req, res) => {
 res.sendFile(path.join(__dirname,'/dist/index.html'))
});

 
const PORT = process.env.PORT || 8000;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
