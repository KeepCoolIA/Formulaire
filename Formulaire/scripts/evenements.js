import Formulaire from "./formulaire.js";

const formulaire = new Formulaire("formulaire");

/*
 * État initial :
 * - particulier est sélectionné par défaut ;
 * - la société est donc cachée ;
 * - l'objet par défaut est "offre_emploi" ;
 * - l'email est donc caché.
 */
formulaire.maskChamp("societe");
formulaire.maskChamp("email");

/*
 * Lorsque l'utilisateur choisit "Particulier",
 * le champ Société disparaît.
 */
formulaire.getElement("particulier").addEventListener("change", () => {
    formulaire.hideChamp("societe");
});

/*
 * Lorsque l'utilisateur choisit "Professionnel",
 * le champ Société apparaît et devient obligatoire.
 */
formulaire.getElement("professionnel").addEventListener("change", () => {
    formulaire.showChamp("societe");
});

/*
 * L'email est demandé seulement lorsque l'objet
 * sélectionné est "Demande de contact".
 */
formulaire.getElement("objet").addEventListener("change", () => {
    formulaire.isSelected(
        "objet",
        "demande_de_contact",
        () => formulaire.showChamp("email"),
        () => formulaire.hideChamp("email")
    );
});

/*
 * Empêche l'envoi réel du formulaire.
 * Affiche un récapitulatif et les valeurs dans la console.
 */
formulaire.formulaireHtml.addEventListener("submit", (event) => {
    event.preventDefault();

    formulaire.affAnswers();

    console.log("Réponses du formulaire :");
    console.table(formulaire.answers);
});