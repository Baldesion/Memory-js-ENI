document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const login = document.getElementById("login").value;
    const mdp = document.getElementById("mdp").value;

    console.log("Login:", login);
    console.log("Mot de passe:", mdp);

    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log("Données utilisateur récupérées:", userData);

    if (userData && userData.login === login && userData.mdp === mdp) {
      alert("Connexion réussie !");
      console.log("Redirection vers le jeu");
      window.location.href = "game.html"; // Redirige vers la page du jeu
    } else {
      alert("Login ou mot de passe incorrect !");
      console.log("Échec de la connexion");
    }
  }); //j'ai ajouté des console.log pour débugger, j'ai eu des problèmes lors de la connexion et de la redirectino de la page.
