import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import updateModelImage from '../middleware/uploadHelper.js';
import { Evenement } from '../models/Evenement.js';
import { Jeu } from '../models/jeu.js';
import { Partenaire } from '../models/partenaire.js';
import { Joueur } from '../models/joueur.js';
import { requireRole } from '../middleware/permissionsCheck.js';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadRouter = express.Router();

// Configuration de Multer pour l'upload des fichiers.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../public/uploads'));
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });

uploadRouter.post('/:model/:id/:imageField', requireRole(['mainAdmin', 'staff']), upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const modelMap = {
        'evenements': Evenement,
        'jeux': Jeu,
        'partenaires': Partenaire,
        'joueurs': Joueur,
    };

    const validImageFields = {
        'evenements': ['thumbnailEvent'],
        'jeux': ['thumbnailJeu', 'iconeJeu'],
        'partenaires': ['logoPartenaire'],
        'joueurs': ['photoJoueur'],
    };

    const model = modelMap[req.params.model];
    const imageField = req.params.imageField;

    if (!model || !validImageFields[req.params.model].includes(imageField)) {
        fs.unlinkSync(req.file.path); // Supprime le fichier téléchargé si le modèle ou le champ d'image est invalide
        return res.status(400).send('Invalid model type or image field.');
    }

    try {
        const item = await model.findById(req.params.id);

        // Si un fichier pour ce champ existe déjà, il sera remplacé sans demander de confirmation
        const oldImagePath = item && item[imageField] ? item[imageField] : null;
        if (oldImagePath) {
            const oldImageFullPath = path.join(__dirname, '../../../public', oldImagePath);
            if (fs.existsSync(oldImageFullPath)) {
                fs.unlinkSync(oldImageFullPath); // Supprime l'ancien fichier image
            }
        }

        // Définir le nouveau chemin d'image
        const imagePath = `/uploads/${req.file.filename}`;
        item[imageField] = imagePath; // Mise à jour du champ de l'image avec le nouveau chemin
        await item.save(); // Enregistre l'item avec la nouvelle image

        res.status(200).json({ imageUrl: imagePath });
    } catch (error) {
        fs.unlinkSync(req.file.path); // Supprime le fichier téléchargé en cas d'erreur
        res.status(500).send(error.message);
    }
});

uploadRouter.delete('/:model/:id/:imageField', requireRole(['mainAdmin', 'staff']), async (req, res) => {
    const modelMap = {
        'evenements': Evenement,
        'jeux': Jeu,
        'partenaires': Partenaire,
        'joueurs': Joueur,
    };

    const model = modelMap[req.params.model];
    const imageField = req.params.imageField;

    if (!model) {
        return res.status(400).send('Invalid model type.');
    }

    try {
        const item = await model.findById(req.params.id);
        if (!item || !item[imageField]) {
            return res.status(404).send('Item or image not found.');
        }

        const imagePath = item[imageField];
        const fullImagePath = path.join(__dirname, '../../../public', imagePath);

        if (fs.existsSync(fullImagePath)) {
            fs.unlinkSync(fullImagePath); // Supprime le fichier image
        }

        item[imageField] = null; // Met à jour le champ image de l'objet
        await item.save();

        res.status(200).send('Image deleted successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default uploadRouter;