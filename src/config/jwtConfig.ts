export default (): {
  jwtConfig: {
    secret: string;
    signOptions: { expiresIn: string };
  };
} => ({
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRE },
  },
});
