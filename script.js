// ============================================
// FIREBASE НАСТРОЙКИ
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyDYTCaAyGSpUFu6-jKDn_wx_Xl7mP4lG68",
    authDomain: "helpingplantsai.firebaseapp.com",
    projectId: "helpingplantsai",
    storageBucket: "helpingplantsai.firebasestorage.app",
    messagingSenderId: "822289586033",
    appId: "1:822289586033:web:d13cf75c8d9628b9d048d0"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ============================================
// СОСТОЯНИЕ
// ============================================
let currentUser = null;

// ============================================
// СЛЕДИМ ЗА ВХОДОМ
// ============================================
auth.onAuthStateChanged(function(user) {
    currentUser = user;
    
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userAvatar = document.getElementById('userAvatar');
    const userWelcome = document.getElementById('userWelcome');
    const userName = document.getElementById('userName');
    
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (userAvatar) userAvatar.style.display = 'flex';
        if (userWelcome) userWelcome.style.display = 'block';
        if (userName) userName.textContent = user.displayName || user.email;
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userAvatar) userAvatar.style.display = 'none';
        if (userWelcome) userWelcome.style.display = 'none';
    }
});

// ============================================
// КНОПКИ
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Вход
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
    
    // Выход
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            auth.signOut().then(() => {
                window.location.href = 'index.html';
            });
        });
    }
    
    // История
    const historyBtn = document.getElementById('historyNavBtn');
    if (historyBtn) {
        historyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentUser) {
                window.location.href = 'history.html';
            } else {
                alert('Сначала войдите');
                window.location.href = 'login.html';
            }
        });
    }
    
    // Сохранить
    const saveBtn = document.getElementById('saveResultBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveToHistory);
    }
});

// ============================================
// ВХОД (login.html)
// ============================================
if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                auth.signInWithEmailAndPassword(email, password)
                    .then(() => {
                        alert('Вход выполнен!');
                        window.location.href = 'index.html';
                    })
                    .catch(error => {
                        alert('Ошибка: ' + error.message);
                    });
            });
        }
    });
}

// ============================================
// РЕГИСТРАЦИЯ (register.html)
// ============================================
if (window.location.pathname.includes('register.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('registerForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const name = document.getElementById('registerName').value;
                
                auth.createUserWithEmailAndPassword(email, password)
                    .then(userCredential => {
                        return userCredential.user.updateProfile({
                            displayName: name
                        });
                    })
                    .then(() => {
                        alert('Регистрация успешна!');
                        window.location.href = 'index.html';
                    })
                    .catch(error => {
                        alert('Ошибка: ' + error.message);
                    });
            });
        }
    });
}

// ============================================
// СОХРАНЕНИЕ В ИСТОРИЮ
// ============================================
function saveToHistory() {
    if (!currentUser) {
        alert('Войдите, чтобы сохранить');
        window.location.href = 'login.html';
        return;
    }
    
    const plantName = document.getElementById('plantName').textContent;
    if (!plantName || plantName === 'Одуванчик обыкновенный') {
        alert('Сначала проанализируйте растение');
        return;
    }
    
    const result = {
        name: plantName,
        confidence: document.getElementById('plantConfidence').textContent
    };
    
    let history = JSON.parse(localStorage.getItem('history') || '[]');
    history.push(result);
    localStorage.setItem('history', JSON.stringify(history));
    
    alert('Сохранено!');
}

// ============================================
// ЗАГРУЗКА ФАЙЛОВ
// ============================================
// ЗАГРУЗКА ФОТО (РАБОТАЕТ НА ТЕЛЕФОНЕ)
function initializeImageUpload() {
    console.log("Загрузчик запущен");
    
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const imagePreview = document.getElementById('imagePreview');
    const removePreviewBtn = document.getElementById('removePreviewBtn');
    const resultCard = document.getElementById('resultCard');
    
    if (!uploadArea || !fileInput) return;
    
    // Для телефона - используем touch события
    uploadArea.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.98)';
        this.style.backgroundColor = '#e0f2e9';
    });
    
    uploadArea.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '#f9fafb';
        fileInput.click();
    });
    
    // Для компьютера
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Обработка выбора файла
    fileInput.addEventListener('change', function(e) {
        e.preventDefault();
        
        const file = e.target.files[0];
        if (!file) return;
        
        // Проверка на изображение
        if (!file.type.startsWith('image/')) {
            alert('Пожалуйста, выберите изображение');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadArea.style.display = 'none';
            
            // Показываем результат через 1.5 секунды
            setTimeout(() => {
                resultCard.style.display = 'block';
                
                // Данные о Циннии
                document.getElementById('plantName').textContent = '🌼 Цинния (Zinnia)';
                document.getElementById('plantConfidence').textContent = 'Точность: 99%';
                document.getElementById('plantCareText').textContent = 'Яркое солнце, полив умеренный. Цветет все лето.';
                document.getElementById('lightInfo').textContent = '☀️ Яркое солнце';
                document.getElementById('waterInfo').textContent = '💧 Умеренный, раз в 3 дня';
                document.getElementById('tempInfo').textContent = '20-28°C';
                document.getElementById('familyInfo').textContent = 'Астровые';
                document.getElementById('soilInfo').textContent = 'Плодородная, рыхлая';
                
                // Здоровье
                const extraInfo = document.getElementById('plantExtraInfo');
                if (extraInfo) {
                    extraInfo.innerHTML = `
                        <div style="background: #f0fdf4; padding: 15px; border-radius: 10px; grid-column: span 3;">
                            <i class="fas fa-heartbeat" style="color: #10b981;"></i>
                            <strong>Здоровье:</strong> Отличное! Растение здорово
                        </div>
                    `;
                }
            }, 1500);
        };
        reader.readAsDataURL(file);
    });
    
    // Удаление превью
    if (removePreviewBtn) {
        removePreviewBtn.addEventListener('click', function() {
            imagePreview.style.display = 'none';
            uploadArea.style.display = 'block';
            resultCard.style.display = 'none';
            fileInput.value = '';
        });
        
        // Для телефона
        removePreviewBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        });
        
        removePreviewBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
            imagePreview.style.display = 'none';
            uploadArea.style.display = 'block';
            resultCard.style.display = 'none';
            fileInput.value = '';
        });
    }
}

// ============================================
// ВАШИ ОСТАЛЬНЫЕ ФУНКЦИИ (Сенсоры, графики и т.д.)
// ============================================
// Здесь добавьте ваши существующие функции для:
// - updateSensorData()
// - initializeChart()
// - initializeImageUpload()
// - loadRecommendations()
// и т.д.

