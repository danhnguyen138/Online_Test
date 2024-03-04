const corsConfig: any = {
  origin: `http://localhost:5173`, // If the port number of the react client is changed, this must be changed accordingly as well
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Accept'], // Need to add more???
  credentials: true
};

export default corsConfig;
