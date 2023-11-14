import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateModelImage = async (Model, itemId, imagePath, imageNameField = 'thumbnail') => {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return { success: false, message: 'Invalid item ID.' };
    }

    try {
        const itemToUpdate = await Model.findById(itemId);

        if (itemToUpdate) {
            // Build the absolute path to the public directory
            const publicPath = path.join(__dirname, '../../../public');

            // Check si l'image existe et le supprime
            const oldImagePath = itemToUpdate[imageNameField] ? path.join(publicPath, itemToUpdate[imageNameField]) : null;
            if (oldImagePath && fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            // Update le chemin 
            itemToUpdate[imageNameField] = imagePath;

            // Sauvegarde 
            await itemToUpdate.save();

            return { success: true, item: itemToUpdate };
        } else {
            return { success: false, message: 'Item not found.' };
        }

        return { success: false, message: 'Item not found.' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error', error };
    }
};

export default updateModelImage;
