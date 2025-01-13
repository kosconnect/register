document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
  
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah reload halaman
       
        // Ambil nilai input
        const fullName = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;
  
        // Validasi tambahan jika diperlukan
        if (password.length < 6) {
            alert('Kata sandi harus minimal 6 karakter.');
            return;
        }
  
        // Data yang dikirim ke backend
        const data = {
            fullname: fullName,
            email,
            role,
            password
        };
  
        // Kirim data ke endpoint registrasi
        fetch("https://kosconnect-server.vercel.app/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || 'Terjadi kesalahan saat mendaftar.');
                });
            }
            return response.json();
        })
        .then(result => {
            // Menampilkan notifikasi SweetAlert setelah registrasi berhasil
            Swal.fire({
                icon: 'success',
                title: 'Registrasi berhasil!',
                text: 'Silakan cek email Anda untuk memverifikasi akun.',
                showConfirmButton: true
            }).then(() => {
                window.location.href = "https://kosconnect.github.io/login/"; // Redirect ke halaman login
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Gagal Mendaftar',
                text: `Terjadi kesalahan: ${error.message}`,
                showConfirmButton: true
            });
            console.error('Error:', error);
        });
    });
  });
  
  function handleGoogleSignIn() {
      // Redirect pengguna ke endpoint Google OAuth di backend
      window.location.href =
        "https://kosconnect-server.vercel.app/auth/google/login";
  }
  
  // Password visibility toggle
  document.addEventListener("DOMContentLoaded", () => {
      const togglePassword = document.querySelector(".toggle-password");
      const passwordInput = document.querySelector("#password");
  
      togglePassword.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
  
        // Ganti ikon mata
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");
      });
  });
  