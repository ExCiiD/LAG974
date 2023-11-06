import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { Evenement } from '../models/Evenement.js';
import { Jeu } from '../models/jeu.js';
import { Partenaire } from '../models/partenaire.js';
import { Joueur } from '../models/joueur.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadRouter = express.Router();

// Configuration de Multer pour l'upload des fichiers.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../public/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

uploadRouter.post('/:model/:id/:imageField', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Cartographie entre les paramètres de modèle et vos modèles Mongoose
    const modelMap = {
        'evenement': Evenement,
        'jeu': Jeu,
        'partenaire': Partenaire,
        'joueur': Joueur,
        // Ajoutez d'autres modèles ici si nécessaire
    };

    // Cartographie des champs d'images valides pour chaque modèle
    const validImageFields = {
        'evenement': ['thumbnailEvent'],
        'jeu': ['thumbnailJeu', 'iconJeu'],
        'partenaire': ['logoPartenaire'],
        'joueur': ['photoJoueur'],
        // Ajoutez d'autres champs d'image ici si nécessaire
    };

    const model = modelMap[req.params.model];
    const imageField = req.params.imageField;

    // Vérifiez si le champ d'image est valide pour le modèle spécifié
    if (model && validImageFields[req.params.model].includes(imageField)) {
        try {
            // Trouvez l'instance du modèle par ID et mettez à jour le champ d'image spécifié
            const doc = await model.findByIdAndUpdate(req.params.id, {
                [imageField]: `/uploads/${req.file.filename}`,
            }, { new: true });

            if (doc) {
                res.status(200).json({ imageUrl: doc[imageField] });
            } else {
                res.status(404).send('Document not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else {
        res.status(400).send('Invalid model type or image field.');
    }
});

export default uploadRouter;