const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|es|net|org|edu)$/;
const phoneRegex = /^\+504\s?[0-9]{4}-[0-9]{4}$/;

document.addEventListener("DOMContentLoaded", () => {
  const formDemo = document.getElementById("formDemo");
  if (formDemo) {
    const txtNombre = document.getElementById("txtNombre");
    const txtApellido = document.getElementById("txtApellido");
    const txtEmail = document.getElementById("txtEmail");
    const txtPhone = document.getElementById("txtPhone");

    formDemo.addEventListener("submit", (e) => {
      clearErrors();
      let hasError = false;

      function validarTexto(input, campo) {
        const valor = input.value.trim();
        if (valor === "") {
          showError(input, `${campo} es requerido.`);
          return false;
        }
        if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor)) {
          showError(input, `${campo} solo puede contener letras y espacios.`);
          return false;
        }
        return true;
      }

      if (!validarTexto(txtNombre, "El nombre")) hasError = true;
      if (!validarTexto(txtApellido, "El apellido")) hasError = true;

      if (!emailRegex.test(txtEmail.value.trim())) {
        showError(txtEmail, "Correo inválido (ej: nombre@dominio.com).");
        hasError = true;
      }

      if (!phoneRegex.test(txtPhone.value.trim())) {
        showError(txtPhone, "Número inválido para Honduras (ej: +504 9999-9999).");
        hasError = true;
      }

      if (hasError) e.preventDefault();
    });

    function showError(input, message) {
      input.classList.add("error");
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.innerText = message;
      input.parentNode.appendChild(errorDiv);
    }

    function clearErrors() {
      document.querySelectorAll(".error-message").forEach(el => el.remove());
      document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
    }
  }

  const donationForm = document.getElementById("donationForm");
  if (donationForm) {
    const nombreInput = document.getElementById("nombre");
    const montoInput = document.getElementById("monto");
    const mensajeDonacion = document.getElementById("mensajeDonacion");

    donationForm.addEventListener("submit", e => {
      e.preventDefault();
      clearErrorsDonation();
      mensajeDonacion.textContent = "";

      let valid = true;

      if (!nombreInput.value.trim()) {
        showErrorDonation(nombreInput, "Por favor ingresa tu nombre.");
        valid = false;
      }

      const montoVal = parseFloat(montoInput.value);
      if (!montoInput.value.trim() || isNaN(montoVal) || montoVal < 1) {
        showErrorDonation(montoInput, "Por favor ingresa un monto válido (mayor a 0).");
        valid = false;
      }

      if (valid) {
        mensajeDonacion.textContent = `¡Gracias, ${nombreInput.value.trim()}! Tu donación de L${montoVal.toFixed(2)} ha sido completada.`;
        donationForm.reset();
      }
    });

    function showErrorDonation(input, message) {
      input.classList.add("error");
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.innerText = message;
      input.parentNode.appendChild(errorDiv);
    }

    function clearErrorsDonation() {
      document.querySelectorAll("#donationForm .error-message").forEach(el => el.remove());
      document.querySelectorAll("#donationForm .error").forEach(el => el.classList.remove("error"));
    }
  }
});
