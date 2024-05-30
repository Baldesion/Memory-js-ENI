document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    //variables qui récupères les données d'inscriptions
    const login = document.getElementById("login").value;
    const email = document.getElementById("email").value;
    const mdp = document.getElementById("mdp").value;
    const mdpVerif = document.getElementById("mdpVerif").value;

    if (!verifmdp(mdp, mdpVerif)) {
      //verification du mot de passe avant envoi des données, ne fait rien si les mots de passes de correspondent pas
      return;
    }

    const userData = {
      //données envoyées dans le local storage
      login: login,
      email: email,
      mdp: mdp,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Vos informations ont été enregistrées !"); //alerte pour informer que ça a bien enregistré le formulaire
  });

function verifmdp(mdp, mdpVerif) {
  //fonction pour vérifier le mot de passe
  if (mdp !== mdpVerif) {
    alert("Les mots de passe ne correspondent pas !"); //alerte si les mots de passes ne correspondent pas.
    return false; //return false si la verif est negative
  }
  return true; //return true si les mdp match
}

document.addEventListener("DOMContentLoaded", (event) => {
  const passwordField = document.getElementById("mdp"); //longueur du mdp
  const passwordIndicator = document.getElementById("passwordIndicator"); //indicateur de force du mdp

  passwordField.addEventListener("input", () => {
    const passwordLength = passwordField.value.length;
    updatePasswordIndicator(passwordLength);
  });

  function updatePasswordIndicator(length) {
    if (length === 0) {
      passwordIndicator.value = 0; //barre par défaut
    } else if (length < 6) {
      passwordIndicator.value = 1; //couleur rouge
    } else if (length < 9) {
      passwordIndicator.value = 2; //couleur orange
    } else {
      passwordIndicator.value = 3; //couleur vert
    }
  }
});
