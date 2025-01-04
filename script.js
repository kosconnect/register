document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Mencegah form dari reload halaman
  
      const fullName = document.getElementById('full-name').value;
      const email = document.getElementById('email').value;
      let whatsapp = document.getElementById('whatsapp').value;
      const role = document.getElementById('role').value;
      const password = document.getElementById('password').value;
  
      // Tambahkan +62 ke nomor WhatsApp yang dimasukkan
      if (whatsapp && !whatsapp.startsWith('8')) {
        alert('Nomor WhatsApp harus dimulai dengan angka 8');
        return;
      }
  
      // Pastikan nomor WhatsApp dimulai dengan +62
      whatsapp = '+62' + whatsapp;
  
      const data = {
        full_name: fullName,
        email,
        whatsapp,
        role,
        password
      };
  
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
            throw new Error(errorData.message || 'Terjadi kesalahan saat pendaftaran.');
          });
        }
        return response.json();
      })
      .then(result => {
        alert('Registrasi berhasil!'); 
        window.location.href = "https://kosconnect.github.io/login/"; // Redirect ke halaman login setelah registrasi
      })
      .catch(error => {
        alert('Terjadi kesalahan saat mencoba mendaftar.');
        console.error('Error:', error);
      });
    });
  });
  