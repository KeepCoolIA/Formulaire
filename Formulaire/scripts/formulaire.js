export default class Formulaire {
    constructor(id) {
        this.id = id;
        this.formulaireHtml = document.getElementById(this.id);

        if (!this.formulaireHtml) {
            throw new Error(
                `Le formulaire avec l'identifiant "${this.id}" est introuvable.`
            );
        }

        this.formdata = new FormData(this.formulaireHtml);
        this.answers = [];
    }

    getElement(id) {
        const element = document.getElementById(id);

        if (!element) {
            throw new Error(`L'élément avec l'identifiant "${id}" est introuvable.`);
        }

        return element;
    }

    getDiv(id) {
        return this.getElement(id).parentNode;
    }

    maskChamp(id) {
        const div = this.getDiv(id);
        const element = this.getElement(id);

        div.classList.add("masque");
        div.classList.remove("app");
        div.classList.remove("disp");

        element.required = false;
        element.value = "";
    }

    showChamp(id) {
        const div = this.getDiv(id);
        const element = this.getElement(id);

        div.classList.remove("masque");
        div.classList.remove("disp");
        div.classList.add("app");

        element.required = true;
    }

    hideChamp(id) {
        const div = this.getDiv(id);
        const element = this.getElement(id);

        div.classList.remove("app");
        div.classList.add("disp");

        element.required = false;
        element.value = "";

        window.setTimeout(() => {
            div.classList.add("masque");
        }, 300);
    }

    isSelected(id, value, action, otherAction) {
        this.formdata = new FormData(this.formulaireHtml);

        if (this.formdata.get(id) === value) {
            action();
        } else {
            otherAction();
        }
    }

    getAnswers() {
        this.formdata = new FormData(this.formulaireHtml);
        this.answers = [];

        this.formdata.forEach((value, key) => {
            if (value !== "") {
                this.answers.push([key, value]);
            }
        });

        return this.answers;
    }

    affAnswers() {
        let chaine = "Récapitulatif du formulaire\n\n";

        for (const ligne of this.getAnswers()) {
            chaine += `${ligne[0]} : ${ligne[1]}\n`;
        }

        alert(chaine);
    }
}