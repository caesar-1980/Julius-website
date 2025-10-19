document.getElementById('eventRegistrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const selectedEvent = document.getElementById('selectedEvent').value;
    const attendees = document.getElementById('attendees').value;

    // Generate receipt number: EV + 4-digit number
    let receiptCounter = localStorage.getItem('receiptCounter') || 1;
    const receiptNo = `EV${String(receiptCounter).padStart(4, '0')}`;
    receiptCounter++;
    localStorage.setItem('receiptCounter', receiptCounter);

    // Get current date
    const date = new Date().toLocaleString();

    // Create registration object
    const registration = {
        receiptNo,
        fullName,
        email,
        phone,
        selectedEvent,
        attendees,
        date
    };

    // Save to localStorage
    let registrations = JSON.parse(localStorage.getItem('eventRegistrations')) || [];
    registrations.push(registration);
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations));

    // Confirmation message
    const confirmationMessage = `
        <strong>Thank you, ${fullName}!</strong><br>
        Your registration for <strong>${selectedEvent}</strong> is successful.<br>
        Receipt Number: <strong>${receiptNo}</strong><br>
        A confirmation has been recorded.
    `;
    document.getElementById('confirmationMessage').innerHTML = confirmationMessage;

    // Clear form
    document.getElementById('eventRegistrationForm').reset();
});


document.getElementById('eventRegistrationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Existing fields
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const selectedEvent = document.getElementById('selectedEvent').value;
  const attendees = document.getElementById('attendees').value;

  // New payment fields
  const paymentMethod = document.getElementById('paymentMethod').value;
  const transactionId = document.getElementById('transactionId').value.trim();
  const amountPaid = parseFloat(document.getElementById('amountPaid').value);

  // Receipt number
  let receiptCounter = localStorage.getItem('receiptCounter') || 1;
  const receiptNo = `EV${String(receiptCounter).padStart(4, '0')}`;
  localStorage.setItem('receiptCounter', parseInt(receiptCounter) + 1);

  const date = new Date().toLocaleString();

  const registration = {
    receiptNo,
    fullName,
    email,
    phone,
    selectedEvent,
    attendees,
    paymentMethod,
    transactionId,
    amountPaid,
    date
  };

  let registrations = JSON.parse(localStorage.getItem('eventRegistrations')) || [];
  registrations.push(registration);
  localStorage.setItem('eventRegistrations', JSON.stringify(registrations));

  document.getElementById('confirmationMessage').innerHTML = `
      <strong>Thank you, ${fullName}!</strong><br>
      Your registration for <strong>${selectedEvent}</strong> is successful.<br>
      Receipt No: <strong>${receiptNo}</strong><br>
      Payment: <strong>${amountPaid} GHS (${paymentMethod})</strong>
  `;

  document.getElementById('eventRegistrationForm').reset();
});
