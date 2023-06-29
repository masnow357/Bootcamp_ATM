const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm
  let user;
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
  
    user = new User(username, password);
    try {
      const isValid = await user.validate();
      console.log(isValid);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.replace("/html/manage.html");
    } catch (error) {
      handleException(error);
    }
  });
}
