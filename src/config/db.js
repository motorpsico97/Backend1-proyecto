import mongoose from 'mongoose';

// 4 - Conectamos a la base de datos MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB');
        process.exit(1); // Salir del proceso en caso de error
    }
};

export default connectMongoDB;