import jwt from 'jsonwebtoken';

export const requireRole = (allowedRoles) => {
    // Si allowedRoles est une chaîne, convertissez-la en tableau
    if (typeof allowedRoles === 'string') {
        allowedRoles = [allowedRoles];
    }

    return function (req, res, next) {
        // Récupérer le token depuis l'en-tête de la requête
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Authentification requise. Token manquant.' });
        }

        try {
            // Vérifier la validité du token et décrypter son contenu
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Vérifier si le rôle du token est inclus dans le tableau des rôles autorisés
            if (allowedRoles.includes(decodedToken.role)) {
                // Stocker l'information de l'utilisateur dans l'objet 'req' pour une utilisation ultérieure
                req.user = decodedToken;
                next();
            } else {
                return res.status(403).json({ message: 'Accès refusé. Vous n\'avez pas les autorisations nécessaires.' });
            }
        } catch (error) {
            console.error('Erreur de vérification du token JWT:', error);
            return res.status(401).json({ message: 'Authentification requise. Token invalide.' });
        }
    };
};
