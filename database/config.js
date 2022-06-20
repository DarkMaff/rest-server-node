const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {


    await mongoose.connect( process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       // useCreativeIndex:true,
        //useFindAndModify: false
    });
    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar la base de datos');
    }
    console.log('Base de datos online');

}

module.exports = { 
    dbConnection
}
