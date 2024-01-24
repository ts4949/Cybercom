$(document).ready(function() {
    $('#patientForm').on('submit', function(event) {
      event.preventDefault();
  
      var isValid = true;
  
      var patientGender = $('#patientGender').val();
      if (patientGender === null || patientGender === '') {
        alert('Please select a patient gender.');
        isValid = false;
      }

      var patientName = $('#firstName').val() + ' ' + $('#lastName').val();
      if (patientName === ' ') {
        alert('Please enter both a first name and a last name.');
        isValid = false;
      }
  
      var patientBirthDate = $('#month').val() + '/' + $('#day').val() + '/' + $('#year').val();
      if (patientBirthDate === '//') {
        alert('Please select a patient birth date.');
        isValid = false;
      }
  
      var patientHeight = $('#patientHeight').val();
      if (isNaN(patientHeight) || patientHeight === '') {
        alert('Please enter a valid patient height.');
        isValid = false;
      }
  
      var patientWeight = $('#patientWeight').val();
      if (isNaN(patientWeight) || patientWeight === '') {
        alert('Please enter a valid patient weight.');
        isValid = false;
      }
  
      var patientEmail = $('#patientEmail').val();
      var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(patientEmail)) {
        alert('Please enter a valid patient email address.');
        isValid = false;
      }
  
      var patientReason = $('#patientReason').val();
      if (patientReason === '') {
        alert('Please enter a reason for seeing the doctor.');
        isValid = false;
      }
  
      var patientHistory = $('#patientHistory').val();
      if (patientHistory === '') {
        alert('Please list any drug allergies.');
        isValid = false;
      }
  
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
  
      var patientOtherIllness = $('#patientOtherIllness').val();
      if (patientOtherIllness === '') {
        alert('Please enter any other illnesses.');
        isValid = false;
      }
  
      var patientOperations = $('#patientOperations').val();
      if (patientOperations === '') {
        alert('Please list any operations and dates of each.');
        isValid = false;
      }
  
      var patientMedications = $('#patientMedications').val();
      if (patientMedications === '') {
        alert('Please list your current medications.');
        isValid = false;
      }
  
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
  
      var patientOtherComments = $('#patientOtherComments').val();
      if (patientOtherComments === '') {
        alert('Please include any other comments regarding your medical history.');
        isValid = false;
      }
  
      if (isValid) {
        $(this).off('submit').submit();
      }
    });
  });
