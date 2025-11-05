// ======== QUẢN LÝ NGƯỜI DÙNG ========

// Lấy/sửa user trong localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser") || "null");
}
function saveLoggedInUser(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
}
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// Khởi tạo admin mặc định (chỉ 1 lần)
(function initAdmin() {
  const users = getUsers();
  if (!users.some(u => u.role === "admin")) {
    users.push({
      id: Date.now(),
      name: "Admin",
      phone: "admin",
      password: "admin123",
      role: "admin",
      status: "active",
      address: "",
      birthday: "",
      balance: 0
    });
    saveUsers(users);
  }
})();

// ======== ĐĂNG KÝ ========
const formRegister = document.getElementById("form-register");
if(formRegister){
  formRegister.addEventListener("submit", function(e){
    e.preventDefault();

    const fullname = this.fullname.value.trim();
    const phone = this.phone.value.trim();
    const password = this.password.value.trim();
    const confirm = this.confirm_password.value.trim();

    // Kiểm tra số điện thoại
    const phoneRegex = /^(0|\+84)(\d{9})$/;
    if(!phoneRegex.test(phone)){
      alert("❌ Số điện thoại không hợp lệ! (VD: 0901234567 hoặc +84901234567)");
      return;
    }

    // Kiểm tra mật khẩu (ít nhất 5 ký tự)
    const passwordRegex = /^.{5,}$/;
    if(!passwordRegex.test(password)){
      alert("❌ Mật khẩu phải có ít nhất 5 ký tự!");
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if(password !== confirm){
      alert("❌ Mật khẩu không khớp!");
      return;
    }

    let users = getUsers();

    // Kiểm tra trùng số điện thoại
    if(users.some(u => u.phone === phone)){
      alert("⚠️ Số điện thoại đã tồn tại!");
      return;
    }

    // Kiểm tra trùng tên đăng nhập
    if(users.some(u => u.name.toLowerCase() === fullname.toLowerCase())){
      alert("⚠️ Tên đăng nhập đã tồn tại!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: fullname,
      phone,
      password,
      role: "customer",
      status: "active",
      address: "",
      birthday: "",
      balance: 0
    };

    users.push(newUser);
    saveUsers(users);
    saveLoggedInUser(newUser);

    alert("✅ Đăng ký thành công!");
    window.location.href = "home.html";
  });
}

// ======== ĐĂNG NHẬP ========
const formLogin = document.getElementById("form-login");
if (formLogin) {
  formLogin.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = this.username.value.trim();
    const password = this.password.value.trim();
    const users = getUsers();

    const user = users.find(u => 
      (u.phone === username || u.name.toLowerCase() === username.toLowerCase()) 
      && u.password === password
    );

    if (!user) return alert("Sai thông tin đăng nhập!");
    if (user.status === "locked") return alert("Tài khoản bị khóa!");

    saveLoggedInUser(user);
    alert("Đăng nhập thành công!");

    if (user.role === "admin") window.location.href = "admin.html";
    else window.location.href = "home.html";
  });
}



// ======== bật/tắt hiển thị mật khẩu ========
document.querySelectorAll(".toggle-password").forEach(icon=>{
  icon.addEventListener("click", ()=>{
    const input = icon.closest(".password-group").querySelector("input");
    if(input.type==="password"){
      input.type="text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type="password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});

// ======== QUÊN MẬT KHẨU ========
const formForgot = document.getElementById("form-forgot");
if(formForgot){
  formForgot.addEventListener("submit", function(e){
    e.preventDefault();
    const phone = this.phone.value.trim();
    if(phone === "admin"){
      alert("Admin không thể sử dụng chức năng quên mật khẩu!");
      switchForm("form-login");
      return;
    }

    const users = getUsers();
    const user = users.find(u=>u.phone===phone);
    if(!user) return alert("Không tìm thấy tài khoản!");
    alert("Mật khẩu của bạn là: " + user.password);
    switchForm("form-login");
  });
}

// ======== ĐẶT LẠI MẬT KHẨU ========
const formReset = document.getElementById("form-reset");
if(formReset){
  formReset.addEventListener("submit", function(e){
    e.preventDefault();
    const new_pass = this.new_password.value.trim();
    const confirm = this.confirm_password.value.trim();
    if(new_pass !== confirm) return alert("Mật khẩu không khớp!");

    let user = getLoggedInUser();
    let users = getUsers();
    users = users.map(u=>u.id===user.id?{...u,password:new_pass}:u);
    saveUsers(users);
    user.password = new_pass;
    saveLoggedInUser(user);
    alert("Cập nhật mật khẩu thành công!");
    switchForm("form-login");
  });
}

// ======== SWITCH FORM ========
function switchForm(formId){
  const forms = document.querySelectorAll(".form-container");
  forms.forEach(f=>{
    f.classList.remove("active");
    f.reset && f.reset();
  });
  document.getElementById(formId).classList.add("active");
}

// ======== ADMIN QUẢN LÝ USER ========
function renderUserList(){
  const users = getUsers();
  const table = document.getElementById("userTable");
  if(!table) return;

  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Tên</th>
      <th>Số điện thoại</th>
      <th>Quyền</th>
      <th>Trạng thái</th>
      <th>Thao tác</th>
    </tr>
  `;

  users.forEach(u => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.phone}</td>
      <td>${u.role}</td>
      <td>${u.status}</td>
      <td>
        ${
          u.role !== "admin" ? `
            <button class="lock-btn" onclick="toggleLock(${u.id})">
              ${u.status === "locked" ? "Mở khóa" : "Khóa"}
            </button>
            <button class="reset-btn" onclick="resetPassword(${u.id})">Reset MK</button>
            <button class="delete-btn" onclick="deleteUser(${u.id})">Xóa</button>
          ` : "(admin)"
        }
      </td>
    `;
    table.appendChild(row);
  });
}

function toggleLock(id){
  let users = getUsers();
  users = users.map(u => {
    if(u.id === id) u.status = (u.status === "locked") ? "active" : "locked";
    return u;
  });
  saveUsers(users);
  renderUserList();
}

function resetPassword(id) {
  let users = getUsers();
  const user = users.find(u => u.id === id);
  if (!user) return;

  const passwordRegex = /^.{5,}$/; // ít nhất 5 ký tự

  let newPassword = prompt(`Nhập mật khẩu mới cho ${user.name}:`);
  if (!newPassword) return;

  if (!passwordRegex.test(newPassword)) {
    alert("❌ Mật khẩu phải có ít nhất 5 ký tự!");
    return;
  }

  const confirmPassword = prompt(`Xác nhận mật khẩu mới cho ${user.name}:`);
  if (newPassword !== confirmPassword) {
    alert("❌ Mật khẩu không khớp!");
    return;
  }

  user.password = newPassword;
  saveUsers(users);
  alert(`Đã reset mật khẩu cho ${user.name} thành "${newPassword}"`);
  renderUserList();
}

// ======== Xóa user ========
function deleteUser(id){
  let users = getUsers();
  const userToDelete = users.find(u => u.id === id);
  if(!userToDelete) return;

  // Không cho xóa admin
  if(userToDelete.role === "admin") {
    alert("❌ Không thể xóa admin!");
    return;
  }

  if(!confirm(`Bạn có chắc muốn xóa tài khoản ${userToDelete.name}?`)) return;

  // Xóa user
  users = users.filter(u => u.id !== id);
  saveUsers(users);

  // Cập nhật lại danh sách
  renderUserList();
}




// ======== FORM PROFILE ========
function renderProfileForm(){
  const user = getLoggedInUser();
  if(!user) return;

  const form = document.getElementById("profileForm");
  if(!form) return;

  // Điền thông tin vào form
  form.name.value = user.name;
  form.phone.value = user.phone;
  form.address.value = user.address;
  form.birthday.value = user.birthday;
  form.balance.value = user.balance; 

  // Nếu là admin thì disable tất cả input
  if(user.role === "admin"){
    form.querySelectorAll("input").forEach(input => input.disabled = true);
  }

  // Remove listener cũ nếu có
  const newForm = form.cloneNode(true);
  form.replaceWith(newForm);

  // Gắn listener submit 1 lần
  newForm.addEventListener("submit", function(e){
    e.preventDefault();
    if(user.role === "admin") return alert("Admin không thể chỉnh sửa thông tin!");

    const updatedUser = {
      ...user,
      name: newForm.name.value.trim(),
      phone: newForm.phone.value.trim(),
      address: newForm.address.value.trim(),
      birthday: newForm.birthday.value.trim()
    };

    let users = getUsers();
    users = users.map(u => u.id === user.id ? updatedUser : u);
    saveUsers(users);
    saveLoggedInUser(updatedUser);

    alert("Cập nhật thông tin thành công!");
  });
}

// Gọi render profile khi DOM load xong
document.addEventListener("DOMContentLoaded", function(){
  renderProfileForm();
});


