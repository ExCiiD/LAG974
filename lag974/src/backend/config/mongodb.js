import mongoose from 'mongoose'

/* export const connectDB = async () => {
    //encoder le mot de passe afin de le rendre valide dans l'url
    const adminPassword = encodeURIComponent(process.env.ADMIN_PASSWORD)
    //modification de l'url qiu permettra de se connecter a la base de données
    const url = 'mongodb+srv://admin:' + adminPassword + process.env.HOST + '/' + process.env.DB_NAME;
    console.log(url);
    try {
        await mongoose.connect(url, {});
    } catch (error) {
        console.log(error)
    }
}  */