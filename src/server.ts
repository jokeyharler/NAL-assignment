import app from './app';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config()

mongoose.connect(process.env.DATABASE_URL);

const connection = mongoose.connection;
connection.once("open", () => console.log("mongodb connect succeed", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}));

const PORT = process.env.PORT || 5000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error occurs: ${error.message}`);
}
