// functionality to enable and disable the button based on if inputs are complete in sign up form.
//NOT WORKING RIGHT NOW. CHAT CODE NEED TO FIX/CHANGE. 
document.addEventListener("DOMContentLoaded", function() {
    // Reference to the form and the Sign Up button.
    const form = document.getElementById('signUp_form');
    const signUpButton = document.getElementById('signUp_button');
    
    // Select all input fields inside the form.
    const inputs = form.querySelectorAll('input');
    
    // Function to check if all fields have a value.
    function checkInputs() {
      let allFilled = true;
      
      inputs.forEach((input) => {
        // If any input is empty, set allFilled to false.
        if (input.value.trim() === "") {
          allFilled = false;
        }
      });
      
      // Enable the button if all fields are filled; otherwise disable it.
      signUpButton.disabled = !allFilled;
    }
    
    // Attach the checkInputs function to the input event of every field.
    inputs.forEach((input) => {
      input.addEventListener('input', checkInputs);
    });
  });
  