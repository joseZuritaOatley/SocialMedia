const express = require('express')

const app = express(); 
app.get('/', (req, res) => res.send('API Running') )

//if no env set, it will default to 5000
const PORT = process.env.PORT || 6000;

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`)); 