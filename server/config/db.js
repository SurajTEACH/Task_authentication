const mongoose = require('mongoose');

const connectDB = async () => {
  const MAX_RETRIES = 5;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      attempt++;
      console.error(`❌ MongoDB attempt ${attempt}/${MAX_RETRIES} failed: ${error.message}`);
      if (attempt >= MAX_RETRIES) {
       
        
        process.exit(1);
      }
      // Wait 3 seconds before retrying
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
};

module.exports = connectDB;
