import fs from 'fs';
import path from 'path';

const updateModelImage = async (Model, itemId, imagePath, imageNameField = 'thumbnail') => {
    try {
        const itemToUpdate = await Model.findById(itemId);

        if (itemToUpdate) {
            // Supprimez l'ancienne image si elle existe
            if (itemToUpdate[imageNameField] && fs.existsSync(path.join(__dirname, '../../../public', itemToUpdate[imageNameField]))) {
                fs.unlinkSync(path.join(__dirname, '../../../public', itemToUpdate[imageNameField]));
            }

            // Mettez à jour le chemin de l'image dans le document
            itemToUpdate[imageNameField] = imagePath;

            // Enregistrez le document mis à jour dans la base de données
            await itemToUpdate.save();

            return { success: true, item: itemToUpdate };
        }

        return { success: false, message: 'Item not found.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error', error };
    }
};

export default updateModelImage;
