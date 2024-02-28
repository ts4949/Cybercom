$(document).ready(function() {
    $('#patientForm').on('submit', function(event) {
      event.preventDefault();
  
      var isValid = true;
  
      // Validate patientGender select field
      var patientGender = $('#patientGender').val();
      if (patientGender === null || patientGender === '') {
        alert('Please select a patient gender.');
        isValid = false;
      }
  
      // Validate patientName input fields
      var patientName = $('#firstName').val() + ' ' + $('#lastName').val();
      if (patientName === ' ') {
        alert('Please enter both a first name and a last name.');
        isValid = false;
      }
  
      // Validate patientBirthDate select fields
      var patientBirthDate = $('#month').val() + '/' + $('#day').val() + '/' + $('#year').val();
      if (patientBirthDate === '//') {
        alert('Please select a patient birth date.');
        isValid = false;
      }
  
      // Validate patientHeight input field
      var patientHeight = $('#patientHeight').val();
      if (isNaN(patientHeight) || patientHeight === '') {
        alert('Please enter a valid patient height.');
        isValid = false;
      }
  
      // Validate patientWeight input field
      var patientWeight = $('#patientWeight').val();
      if (isNaN(patientWeight) || patientWeight === '') {
        alert('Please enter a valid patient weight.');
        isValid = false;
      }
  
      // Validate patientEmail input field
      var patientEmail = $('#patientEmail').val();
      var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(patientEmail)) {
        alert('Please enter a valid patient email address.');
        isValid = false;
      }
  
      // Validate patientReason input field
      var patientReason = $('#patientReason').val();
      if (patientReason === '') {
        alert('Please enter a reason for seeing the doctor.');
        isValid = false;
      }
  
      // Validate patientHistory textarea field
      var patientHistory = $('#patientHistory').val();
      if (patientHistory === '') {
        alert('Please list any drug allergies.');
        isValid = false;
      }
  
      // Validate anemiaCheckbox, cancerCheckbox, diabetesCheckbox, goutCheckbox, and heartAttackCheckbox checkboxes
      var hasIllness = false;
      $('.form-check-input').each(function() {
        if ($(this).is(':checked')) {
          hasIllness = true;
          return false;
        }
      });
      if (!hasIllness) {
        alert('Please select at least one illness.');
        isValid = false;
      }
  
      // Validate patientOtherIllness input field
      var patientOtherIllness = $('#patientOtherIllness').val();
      if (patientOtherIllness === '') {
        alert('Please enter any other illnesses.');
        isValid = false;
      }
  
      // Validate patientOperations textarea field
      var patientOperations = $('#patientOperations').val();
      if (patientOperations === '') {
        alert('Please list any operations and dates of each.');
        isValid = false;
      }
  
      // Validate patientMedications textarea field
      var patientMedications = $('#patientMedications').val();
      if (patientMedications === '') {
        alert('Please list your current medications.');
        isValid = false;
      }
  
      // Validate exercise, diet, alcoholConsumption, caffeineConsumption, and smoke radio buttons
      var hasExercise = false;
      var hasDiet = false;
      var hasAlcoholConsumption = false;
      var hasCaffeineConsumption = false;
      var hasSmoke = false;
      $('.form-check-input').each(function() {
        if ($(this).is(':checked')) {
          if ($(this).attr('name') === 'exercise') {
            hasExercise = true;
          } else if ($(this).attr('name') === 'diet') {
            hasDiet = true;
          } else if ($(this).attr('name') === 'alcoholConsumption') {
            hasAlcoholConsumption = true;
          } else if ($(this).attr('name') === 'caffeineConsumption') {
            hasCaffeineConsumption = true;
          } else if ($(this).attr('name') === 'smoke') {
            hasSmoke = true;
          }
        }
      });
      if (!hasExercise || !hasDiet || !hasAlcoholConsumption || !hasCaffeineConsumption || !hasSmoke) {
        alert('Please select an option for each question.');
        isValid = false;
      }
  
      // Validate patientOtherComments textarea field
      var patientOtherComments = $('#patientOtherComments').val();
      if (patientOtherComments === '') {
        alert('Please include any other comments regarding your medical history.');
        isValid = false;
      }
  
      // If all validation checks pass, submit the form
      if (isValid) {
        $(this).off('submit').submit();
      }
    });
  });