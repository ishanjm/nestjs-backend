export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    secret: process.env.SECRET,
    // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,DATABASE_HOST=mongodb+srv://ishanjm:ism%40123456789@cluster0.26gylt1.mongodb.net/test
  },
});
