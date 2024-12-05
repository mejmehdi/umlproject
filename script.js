const canvas = document.getElementById("umlCanvas");
const ctx = canvas.getContext("2d");

let elements = []; // Stockage des classes UML
let isAddingRelation = false;
let selectedElement = null;

// Classe UML avec attributs et méthodes
class UMLClass {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 150;
        this.name = name;
        this.attributes = []; // Liste des attributs
        this.methods = []; // Liste des méthodes
    }

    draw() {
        // Dessiner le rectangle principal
        ctx.fillStyle = "lightblue";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Dessiner les bordures
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Dessiner le nom de la classe
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.name, this.x + this.width / 2, this.y + 20);

        // Dessiner les séparateurs
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 30); // Ligne sous le nom
        ctx.lineTo(this.x + this.width, this.y + 30);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height / 2); // Ligne entre attributs et méthodes
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.stroke();

        // Dessiner les attributs
        ctx.textAlign = "left";
        this.attributes.forEach((attr, index) => {
            ctx.fillText(
                attr,
                this.x + 10,
                this.y + 45 + index * 15 // Placer chaque attribut
            );
        });

        // Dessiner les méthodes
        this.methods.forEach((method, index) => {
            ctx.fillText(
                method,
                this.x + 10,
                this.y + this.height / 2 + 15 + index * 15 // Placer chaque méthode
            );
        });
    }

    contains(x, y) {
        return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
    }
}

// Ajouter une nouvelle classe UML
function addClass() {
    const className = prompt("Nom de la classe :");
    if (className) {
        const newClass = new UMLClass(100, 100, className);
        elements.push(newClass);
        console.log("Classe ajoutée: ", className); // Debug log
        render();
    }
}

// Ajouter un attribut à une classe UML
function addAttribute() {
    const className = prompt("Nom de la classe pour ajouter un attribut :");
    const classObj = elements.find((el) => el.name === className);

    if (classObj) {
        const attribute = prompt("Entrez l'attribut (e.g., - name: String) :");
        if (attribute) {
            classObj.attributes.push(attribute);
            console.log("Attribut ajouté: ", attribute); // Debug log
            render();
        }
    } else {
        alert("Classe non trouvée !");
    }
}

// Ajouter une méthode à une classe UML
function addMethod() {
    const className = prompt("Nom de la classe pour ajouter une méthode :");
    const classObj = elements.find((el) => el.name === className);

    if (classObj) {
        const method = prompt("Entrez la méthode (e.g., + getName(): String) :");
        if (method) {
            classObj.methods.push(method);
            console.log("Méthode ajoutée: ", method); // Debug log
            render();
        }
    } else {
        alert("Classe non trouvée !");
    }
}

// Redessiner tous les éléments
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((element) => element.draw());
}

// Ajouter une relation
function addRelation() {
    alert("Cliquez sur deux classes pour les relier.");
    isAddingRelation = true;
}

canvas.addEventListener("click", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    const clickedElement = elements.find((element) => element.contains(x, y));

    if (clickedElement && isAddingRelation) {
        if (!selectedElement) {
            selectedElement = clickedElement;
        } else {
            ctx.beginPath();
            ctx.moveTo(
                selectedElement.x + selectedElement.width / 2,
                selectedElement.y + selectedElement.height / 2
            );
            ctx.lineTo(
                clickedElement.x + clickedElement.width / 2,
                clickedElement.y + clickedElement.height / 2
            );
            ctx.strokeStyle = "black";
            ctx.stroke();

            selectedElement = null;
            isAddingRelation = false;
        }
    }
});

// Sauvegarder le diagramme
function saveDiagram() {
    const link = document.createElement("a");
    link.download = "diagram.png";
    link.href = canvas.toDataURL();
    link.click();
}
