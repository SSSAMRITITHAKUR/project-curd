const express = require('express');
const app = express();


app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});


app.get('/sync', (req, res) => {
  throw new Error('Synchronous error occurred!');
});

app.get('/async', async (req, res, next) => {
  try {
    
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Asynchronous error occurred!')), 1000);
    });
    res.send(data);
  } catch (err) {
    next(err); 
  }
});


app.get('/custom', (req, res, next) => {
  const err = new Error('Custom error occurred!');
  err.status = 400; 
  next(err);  
});



app.use((err, req, res, next) => {

  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res.status(status).send({ error: message });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
