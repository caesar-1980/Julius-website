// Select elements
const addMemberForm = document.getElementById('addMemberForm');
const memberName = document.getElementById('memberName');
const memberContact = document.getElementById('memberContact');
const memberPhoto = document.getElementById('memberPhoto');
const attendanceTableBody = document.querySelector('#attendanceTable tbody');
const searchBox = document.getElementById('searchBox');
const totalPresentRow = document.getElementById('totalPresentRow');

// Store members
let members = [];
let memberCounter = 1;

// Add Member
addMemberForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = memberName.value.trim();
  const contact = memberContact.value.trim();
  const photoFile = memberPhoto.files[0];

  if (!name || !contact) return;

  const memberId = `M${String(memberCounter).padStart(3, '0')}`;
  memberCounter++;

  const photoURL = photoFile ? URL.createObjectURL(photoFile) : 'https://via.placeholder.com/50';

  const newMember = {
    id: memberId,
    name,
    contact,
    photo: photoURL,
    present: false,
    totalPresent: 0
  };

  members.push(newMember);
  renderTable();
  addMemberForm.reset();
});

// Render Table
function renderTable() {
  attendanceTableBody.innerHTML = '';

  members.forEach((member, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${member.id}</td>
      <td><img src="${member.photo}" class="member-photo" alt="Photo"></td>
      <td>${member.name}</td>
      <td>${member.contact}</td>
      <td>
        <input type="checkbox" ${member.present ? 'checked' : ''} data-index="${index}" class="present-checkbox">
      </td>
      <td>${member.totalPresent}</td>
      <td>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>
    `;

    attendanceTableBody.appendChild(row);
  });

  updateTotalPresent();
}

// Update total present
function updateTotalPresent() {
  const count = members.filter(m => m.present).length;
  totalPresentRow.textContent = `Total Present Today: ${count}`;
}

// Checkbox for present
attendanceTableBody.addEventListener('change', (e) => {
  if (e.target.classList.contains('present-checkbox')) {
    const index = e.target.dataset.index;
    members[index].present = e.target.checked;
    if (e.target.checked) {
      members[index].totalPresent++;
    }
    renderTable();
  }
});

// Delete member
attendanceTableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    members.splice(index, 1);
    renderTable();
  }
});

// Edit member
attendanceTableBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const index = e.target.dataset.index;
    const newName = prompt('Edit Name:', members[index].name);
    if (newName) members[index].name = newName;
    const newContact = prompt('Edit Contact:', members[index].contact);
    if (newContact) members[index].contact = newContact;
    renderTable();
  }
});

// Search
searchBox.addEventListener('input', () => {
  const searchText = searchBox.value.toLowerCase();
  document.querySelectorAll('#attendanceTable tbody tr').forEach(row => {
    const nameCell = row.cells[2].textContent.toLowerCase();
    row.style.display = nameCell.includes(searchText) ? '' : 'none';
  });
});
