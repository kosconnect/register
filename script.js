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
          alert('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
          window.location.href = "https://kosconnect.github.io/login/"; // Redirect ke halaman login
      })
      .catch(error => {
          alert(`Gagal mendaftar: ${error.message}`);
          console.error('Error:', error);
      });
  });
});

function handleGoogleSignIn() {
    // Redirect pengguna ke endpoint Google OAuth di backend
    window.location.href =
      "https://kosconnect-server.vercel.app/auth/google/login";
  }