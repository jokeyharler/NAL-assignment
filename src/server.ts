import app from './app';
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/Events');

const connection = mongoose.connection;
connection.once("open", () => console.log("mongodb connect succeed"));

const PORT = 5000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error occurs: ${error.message}`);
}
