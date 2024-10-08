const testMongoConnection = async () => {
    console.log('Testing MongoDB connection...');
    try {
        const connection = await mongoose.connection;
        if (connection.readyState === 1) {
            console.log('MongoDB connection is active');
        } else {
            console.log('MongoDB connection is not active. Ready state:', connection.readyState);
        }
    } catch (error) {
        console.error('Error testing MongoDB connection:', error.message);
    }
};

// Call this function after attempting to connect
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        testMongoConnection(); // Check connection status after connection
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message)
    });
