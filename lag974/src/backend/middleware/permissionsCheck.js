import jwt from 'jsonwebtoken';

export const requireRole = (role) => {
    return function (req, res, next) {
        // Récupérer le token depuis l'en-tête de la requête
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Authentification requise. Token manquant.' });
        }

        try {
            // Vérifier la validité du token et décrypter son contenu
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Comparer le rôle de l'utilisateur avec le rôle requis pour la route
            if (decodedToken.role === role) {
                // Stocker l'information de l'utilisateur dans l'objet 'req' pour une utilisation ultérieure
                req.user = decodedToken;

                // L'utilisateur a le bon rôle, on appelle 'next()' pour passer au prochain middleware/contrôleur
                next();
            } else {
                // L'utilisateur n'a pas le bon rôle, on bloque l'accès
                return res.status(403).json({ message: 'Accès refusé. Vous n\'avez pas les autorisations nécessaires.' });
            }
        } catch (error) {
            console.error('Erreur de vérification du token JWT:', error);
            return res.status(401).json({ message: 'Authentification requise. Token invalide.' });
        }
    };
};