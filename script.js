 document.addEventListener('DOMContentLoaded', function() {
      // Simulate loading process
      const loadingOverlay = document.getElementById('loadingOverlay');
      const progressBar = document.getElementById('progressBar');
      const progressPercent = document.getElementById('progressPercent');
      
      let progress = 0;
      const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(loadingInterval);
          setTimeout(() => {
            loadingOverlay.classList.add('hidden');
          }, 500);
        }
        progressBar.style.width = `${progress}%`;
        progressPercent.textContent = `${Math.round(progress)}%`;
      }, 200);

      // Form steps functionality
      const steps = document.querySelectorAll('.step');
      const nextBtn = document.getElementById('nextBtn');
      const prevBtn = document.getElementById('prevBtn');
      const submitBtn = document.getElementById('submitBtn');
      const sections = document.querySelectorAll('section');
      let currentStep = 0;

      // Show current step
      function showStep(step) {
        steps.forEach((s, i) => {
          if (i === step) {
            s.classList.add('active');
          } else if (i < step) {
            s.classList.remove('active');
            s.classList.add('completed');
          } else {
            s.classList.remove('active', 'completed');
          }
        });

        // Show/hide buttons based on step
        if (step === 0) {
          prevBtn.classList.add('hidden');
        } else {
          prevBtn.classList.remove('hidden');
        }

        if (step === steps.length - 1) {
          nextBtn.classList.add('hidden');
          submitBtn.classList.remove('hidden');
        } else {
          nextBtn.classList.remove('hidden');
          submitBtn.classList.add('hidden');
        }
      }

      // Next button click
      nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
          }
        }
      });

      // Previous button click
      prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });

      // Step validation
      function validateStep(step) {
        let isValid = true;
        
        // Basic validation for demonstration
        if (step === 0) {
          const fullName = document.querySelector('input[name="fullName"]');
          if (!fullName.value.trim()) {
            document.getElementById('fullNameError').classList.remove('hidden');
            isValid = false;
          } else {
            document.getElementById('fullNameError').classList.add('hidden');
          }
        }
        
        return isValid;
      }

      // Toggle section collapse/expand
      document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => {
          const section = header.parentElement;
          section.classList.toggle('collapsed');
        });
      });

      // Generate Patient ID
      document.getElementById('generateIDBtn').addEventListener('click', function() {
        const patientIDField = document.getElementById('patientID');
        const timestamp = new Date().getTime().toString().slice(-6);
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        patientIDField.value = `PAT-${timestamp}-${randomNum}`;
      });

      // Toggle insurance fields based on payment type
      document.getElementById('paymentType').addEventListener('change', function() {
        const insuranceFields = document.getElementById('insuranceFields');
        insuranceFields.classList.toggle('hidden', this.value !== 'Insurance');
      });

      // Toggle priority notice based on patient type
      document.querySelectorAll('input[name="patientType"]').forEach(radio => {
        radio.addEventListener('change', function() {
          const priorityNotice = document.getElementById('priorityNotice');
          priorityNotice.classList.toggle('hidden', this.value !== 'Emergency');
          
          // Update wait time estimate for emergency patients
          if (this.value === 'Emergency') {
            document.getElementById('waitTimeValue').textContent = 'IMMEDIATE';
            document.getElementById('waitTimeSection').classList.remove('hidden');
          }
        });
      });

      // Form submission
      document.getElementById('patientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading overlay again
        loadingOverlay.classList.remove('hidden');
        
        // Simulate form processing
        setTimeout(() => {
          loadingOverlay.classList.add('hidden');
          
          // Show result
          const resultDiv = document.getElementById('result');
          resultDiv.classList.remove('hidden');
          
          // Populate result details
          const formData = new FormData(this);
          let resultHTML = '';
          
          for (let [key, value] of formData.entries()) {
            if (value) {
              const label = document.querySelector(`[name="${key}"]`).previousElementSibling.textContent;
              resultHTML += `
                <div class="result-item">
                  <strong>${label}</strong>: ${value}
                </div>
              `;
            }
          }
          
          document.getElementById('resultDetails').innerHTML = resultHTML;
          
          // Scroll to result
          resultDiv.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
      });

      // Initialize form with first step
      showStep(currentStep);
      
      // Collapse all sections initially
      document.querySelectorAll('section').forEach(section => {
        section.classList.add('collapsed');
      });
    });
 