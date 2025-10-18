// script.js  ---------------------------------------------------------

// Escape text for safe HTML output
function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Generate a new Member ID: 2 initials + 3-digit serial
function generateMemberID(name) {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  const serial = String(members.length + 1).padStart(3, '0');

  const parts = name.trim().split(/\s+/); // split by spaces
  let initials = '';

  if (parts.length >= 2) {
    initials = parts[0][0] + parts[1][0];
  } else if (parts.length === 1) {
    initials = parts[0].slice(0, 2);
  } else {
    initials = 'XX';
  }

  return (initials.toUpperCase() + serial);
}

// ===============  ADD MEMBER  ==================
function addMember() {
  const name = document.getElementById('name')?.value.trim();
  const age = document.getElementById('age')?.value.trim();
  const gender = document.getElementById('gender')?.value;
  const residence = document.getElementById('residence')?.value;
  const status = document.getElementById('status')?.value;
  const contact = document.getElementById('contact')?.value.trim();
  const position = document.getElementById('Position')?.value;

  if (!name || !age || !gender || !residence || !status || !contact || !position) {
    alert('Please fill in all fields.');
    return;
  }

  let members = JSON.parse(localStorage.getItem('members')) || [];

  const newMember = {
    id: generateMemberID(name),
    name,
    age,
    gender,
    residence,
    status,
    contact,
    position
  };

  members.push(newMember);
  localStorage.setItem('members', JSON.stringify(members));

  alert(`Member ${newMember.id} registered successfully!`);

  document.getElementById('registrationForm').reset();

  // Uncomment next line if you want to jump straight to member list after register
  // window.location.href = 'member.html';
}

// ===============  DELETE MEMBER  ==================
function deleteMember(index) {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  if (index < 0 || index >= members.length) return;

  if (!confirm(`Delete member: ${members[index].name}?`)) return;

  members.splice(index, 1);

  // Re-assign IDs after delete
  members.forEach((m, i) => {
    const parts = m.name.trim().split(/\s+/);
    let initials = (parts[0][0] + (parts[1]?.[0] || parts[0][1] || '')).toUpperCase();
    m.id = initials + String(i + 1).padStart(3, '0');
  });

  localStorage.setItem('members', JSON.stringify(members));
  displayMembers();
}

// ===============  EDIT MEMBER  ==================
function editMember(index) {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  const m = members[index];
  if (!m) return;

  const newName = prompt('Enter new name:', m.name) || m.name;
  const newAge = prompt('Enter new age:', m.age) || m.age;
  const newGender = prompt('Enter new gender (Male/Female/Other):', m.gender) || m.gender;
  const newResidence = prompt('Enter new residence:', m.residence) || m.residence;
  const newStatus = prompt('Enter new status (Single/Married):', m.status) || m.status;
  const newContact = prompt('Enter new contact:', m.contact) || m.contact;
  const newPosition = prompt('Enter new position:', m.position) || m.position;

  m.name = newName.trim();
  m.age = newAge.trim();
  m.gender = newGender.trim();
  m.residence = newResidence.trim();
  m.status = newStatus.trim();
  m.contact = newContact.trim();
  m.position = newPosition.trim();

  // Recalculate ID if name changed
  const parts = m.name.trim().split(/\s+/);
  let initials = (parts[0][0] + (parts[1]?.[0] || parts[0][1] || '')).toUpperCase();
  m.id = initials + String(index + 1).padStart(3, '0');

  localStorage.setItem('members', JSON.stringify(members));
  displayMembers();
}

// ===============  DISPLAY MEMBERS  ==================
function displayMembers(filter = '') {
  const tbody = document.querySelector('#memberList tbody');
  if (!tbody) return;

  const members = JSON.parse(localStorage.getItem('members')) || [];
  tbody.innerHTML = '';

  const searchTerm = filter.toLowerCase();

  members.forEach((m, i) => {
    if (
      m.name.toLowerCase().includes(searchTerm) ||
      m.id.toLowerCase().includes(searchTerm)
    ) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${escapeHtml(m.id)}</td>
        <td>${escapeHtml(m.name)}</td>
        <td>${escapeHtml(m.age)}</td>
        <td>${escapeHtml(m.gender)}</td>
        <td>${escapeHtml(m.position)}</td>
        <td>${escapeHtml(m.residence)}</td>
        <td>${escapeHtml(m.status)}</td>
        <td>${escapeHtml(m.contact)}</td>
        <td>
          <button class="edit-btn" data-index="${i}">Edit</button>
          <button class="delete-btn" data-index="${i}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    }
  });
}

// ===============  SEARCH FILTER  ==================
function initSearch() {
  const searchInput = document.getElementById('searchBox');
  if (!searchInput) return;
  searchInput.addEventListener('input', (e) => {
    displayMembers(e.target.value);
  });
}

// ===============  EXPORT TO CSV  ==================
function exportToCSV() {
  const members = JSON.parse(localStorage.getItem('members')) || [];
  if (members.length === 0) {
    alert('No members to export.');
    return;
  }

  const header = ['ID','Name','Age','Gender','Position','Residence','Status','Contact'];
  const rows = members.map(m => [
    m.id, m.name, m.age, m.gender, m.position, m.residence, m.status, m.contact
  ]);

  const csv = [header, ...rows].map(r => r.map(val => `"${val}"`).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'members.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ===============  INIT ON LOAD  ==================
document.addEventListener('DOMContentLoaded', () => {
  displayMembers();
  initSearch();

  // Event delegation for edit / delete buttons
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.delete-btn')) {
      deleteMember(+e.target.closest('.delete-btn').dataset.index);
    }
    if (e.target.closest('.edit-btn')) {
      editMember(+e.target.closest('.edit-btn').dataset.index);
    }
    if (e.target.closest('#exportBtn')) {
      exportToCSV();
    }
  });
});
