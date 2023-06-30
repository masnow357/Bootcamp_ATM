const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
  
    const USER = new User(username, password);
    try {
      const isValid = await USER.validate();
      console.log(isValid);
      if (!isValid) {
        throw Error('Contraseña incorrecta');
      }  
      localStorage.setItem("user", JSON.stringify(USER));
      window.location.replace("manage.html");
    } catch (error) {
      handleException(error);
    }
  });
}
