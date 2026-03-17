// ============================================
// FIREBASE КОНФИГУРАЦИЯ - ВАШИ ДАННЫЕ УЖЕ ВСТАВЛЕНЫ!
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyDYTCaAyGSpUFu6-jKDn_wx_Xl7mP4lG68",
    authDomain: "helpingplantsai.firebaseapp.com",
    projectId: "helpingplantsai",
    storageBucket: "helpingplantsai.firebasestorage.app",
    messagingSenderId: "822289586033",
    appId: "1:822289586033:web:d13cf75c8d9628b9d048d0"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Состояние приложения
let currentUser = null;
let recognitionHistory = [];

// ============================================
// СЛЕДИМ ЗА СОСТОЯНИЕМ ВХОДА (Мгновенное обновление UI)
// ============================================
auth.onAuthStateChanged(function(user) {
    console.log("Статус входа изменился:", user ? "Залогинен" : "Не залогинен");
    currentUser = user;
    
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userAvatar = document.getElementById('userAvatar');
    const userWelcome = document.getElementById('userWelcome');
    const userName = document.getElementById('userName');
    
    if (user) {
        // ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНЕН
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (userAvatar) userAvatar.style.display = 'flex';
        if (userWelcome) userWelcome.style.display = 'block';
        if (userName) {
            userName.textContent = user.displayName || user.email.split('@')[0];
        }
        
        // Анимация для аватара (ВАША АНИМАЦИЯ)
        if (userAvatar) {
            userAvatar.style.animation = 'pulse 1s';
            setTimeout(() => {
                userAvatar.style.animation = '';
            }, 1000);
        }
    } else {
        // ПОЛЬЗОВАТЕЛЬ НЕ ЗАЛОГИНЕН
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userAvatar) userAvatar.style.display = 'none';
        if (userWelcome) userWelcome.style.display = 'none';
    }
});

// ============================================
// ОБРАБОТЧИКИ КНОПОК (Ваши анимации сохранены)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("Страница загружена, ищем кнопки...");
    
    // КНОПКА ВОЙТИ
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        console.log("Кнопка Войти найдена");
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // ВАША АНИМАЦИЯ
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                window.location.href = 'login.html';
            }, 200);
        });
    }
    
    // КНОПКА ВЫЙТИ
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // ВАША АНИМАЦИЯ
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                logout();
            }, 200);
        });
    }
    
    // КНОПКА ИСТОРИЯ
    const historyBtn = document.getElementById('historyNavBtn');
    if (historyBtn) {
        historyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // ВАША АНИМАЦИЯ
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                if (currentUser) {
                    window.location.href = 'history.html';
                } else {
                    showNotification('Сначала войдите в систему', 'info');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }
            }, 200);
        });
    }
    
    // КНОПКА ДОКУМЕНТАЦИЯ
    const docsLink = document.getElementById('docsLink');
    if (docsLink) {
        docsLink.addEventListener('click', function(e) {
            e.preventDefault();
            // ВАША АНИМАЦИЯ
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                // ЗДЕСЬ ВСТАВЬТЕ ССЫЛКУ НА ВАШ ДИСК
                window.open('https://drive.google.com/drive/folders/ВАША_ССЫЛКА', '_blank');
            }, 200);
        });
    }
    
    // КНОПКА СОХРАНИТЬ РЕЗУЛЬТАТ
    const saveBtn = document.getElementById('saveResultBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // ВАША АНИМАЦИЯ
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                saveToHistory();
            }, 200);
        });
    }
});

// ============================================
// ФУНКЦИЯ ВЫХОДА
// ============================================
function logout() {
    auth.signOut().then(function() {
        showNotification('Вы вышли из системы', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }).catch(function(error) {
        showNotification('Ошибка при выходе: ' + error.message, 'error');
    });
}

// ============================================
// ФУНКЦИЯ СОХРАНЕНИЯ В ИСТОРИЮ
// ============================================
function saveToHistory() {
    if (!currentUser) {
        showNotification('Войдите, чтобы сохранить результат', 'info');
        return;
    }
    
    const plantName = document.getElementById('plantName');
    const previewImage = document.getElementById('previewImage');
    
    if (!plantName || !plantName.textContent || plantName.textContent === 'Одуванчик обыкновенный') {
        showNotification('Сначала проанализируйте растение', 'info');
        return;
    }
    
    const result = {
        id: Date.now(),
        plantName: plantName.textContent,
        confidence: document.getElementById('plantConfidence').textContent,
        date: new Date().toLocaleString(),
        image: previewImage ? previewImage.src : ''
    };
    
    recognitionHistory.unshift(result);
    localStorage.setItem(`history_${currentUser.uid}`, JSON.stringify(recognitionHistory));
    showNotification('Результат сохранен!', 'success');
}

// ============================================
// ФУНКЦИЯ ПОКАЗА УВЕДОМЛЕНИЙ (С ВАШИМИ АНИМАЦИЯМИ)
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                         type === 'error' ? 'fa-exclamation-circle' : 
                         'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // ВАШИ СТИЛИ ДЛЯ УВЕДОМЛЕНИЙ
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // ВАША АНИМАЦИЯ ПОЯВЛЕНИЯ
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// КОД ДЛЯ СТРАНИЦЫ ВХОДА (login.html)
// ============================================
if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // ВАША АНИМАЦИЯ ДЛЯ КНОПКИ
                const btn = this.querySelector('button');
                btn.style.transform = 'scale(0.95)';
                
                auth.signInWithEmailAndPassword(email, password)
                    .then(function() {
                        showNotification('Вход выполнен!', 'success');
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1500);
                    })
                    .catch(function(error) {
                        btn.style.transform = '';
                        let message = 'Ошибка входа';
                        if (error.code === 'auth/user-not-found') {
                            message = 'Пользователь не найден';
                        } else if (error.code === 'auth/wrong-password') {
                            message = 'Неверный пароль';
                        }
                        showNotification(message, 'error');
                    });
            });
        }
    });
}

// ============================================
// КОД ДЛЯ СТРАНИЦЫ РЕГИСТРАЦИИ (register.html)
// ============================================
if (window.location.pathname.includes('register.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                
                if (password.length < 6) {
                    showNotification('Пароль должен быть минимум 6 символов', 'error');
                    return;
                }
                
                // ВАША АНИМАЦИЯ ДЛЯ КНОПКИ
                const btn = this.querySelector('button');
                btn.style.transform = 'scale(0.95)';
                
                auth.createUserWithEmailAndPassword(email, password)
                    .then(function(userCredential) {
                        return userCredential.user.updateProfile({
                            displayName: name
                        });
                    })
                    .then(function() {
                        showNotification('Регистрация успешна!', 'success');
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1500);
                    })
                    .catch(function(error) {
                        btn.style.transform = '';
                        let message = 'Ошибка регистрации';
                        if (error.code === 'auth/email-already-in-use') {
                            message = 'Email уже занят';
                        }
                        showNotification(message, 'error');
                    });
            });
        }
    });
}

// ============================================
// КОД ДЛЯ СТРАНИЦЫ ИСТОРИИ (history.html)
// ============================================
if (window.location.pathname.includes('history.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        if (!currentUser) {
            showNotification('Сначала войдите', 'info');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            return;
        }
        
        loadHistory();
        
        const backBtn = document.getElementById('backToMainBtn');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 200);
            });
        }
    });
}

// ============================================
// ЗАГРУЗКА ИСТОРИИ
// ============================================
function loadHistory() {
    if (!currentUser) return;
    
    const saved = localStorage.getItem(`history_${currentUser.uid}`);
    recognitionHistory = saved ? JSON.parse(saved) : [];
    
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    if (recognitionHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-leaf"></i>
                <p>История пуста</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = recognitionHistory.map(item => `
        <div class="history-item" style="animation: slideIn 0.3s">
            <img src="${item.image || 'default-plant.jpg'}" alt="${item.plantName}">
            <div class="history-item-info">
                <h4>${item.plantName}</h4>
                <p>${item.confidence}</p>
                <small>${item.date}</small>
            </div>
            <button class="history-item-delete" onclick="deleteHistoryItem(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// ============================================
// УДАЛЕНИЕ ИЗ ИСТОРИИ
// ============================================
window.deleteHistoryItem = function(id) {
    if (!currentUser) return;
    
    recognitionHistory = recognitionHistory.filter(item => item.id !== id);
    localStorage.setItem(`history_${currentUser.uid}`, JSON.stringify(recognitionHistory));
    loadHistory();
    showNotification('Удалено', 'info');
// ПРОСТАЯ РАБОЧАЯ ЗАГРУЗКА ФАЙЛОВ
function initializeImageUpload() {
    console.log("Запуск загрузчика...");
    
    // Находим элементы
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const previewImage = document.getElementById('previewImage');
    const imagePreview = document.getElementById('imagePreview');
    const removePreviewBtn = document.getElementById('removePreviewBtn');
    
    // Проверяем, нашли ли элементы
    if (!fileInput) {
        console.log("ОШИБКА: Не найден fileInput!");
        return;
    }
    
    if (!uploadArea) {
        console.log("ОШИБКА: Не найден uploadArea!");
        return;
    }
    
    console.log("Элементы найдены, добавляем обработчики");
    
    // Делаем всю область кликабельной
    uploadArea.style.cursor = 'pointer';
    
    // 1. КЛИК ПО ОБЛАСТИ
    uploadArea.onclick = function() {
        console.log("Клик по области");
        fileInput.click();
    };
    
    // 2. ИЗМЕНЕНИЕ ФАЙЛА
    fileInput.onchange = function(event) {
        console.log("Файл выбран");
        
        const file = event.target.files[0];
        if (!file) return;
        
        // Проверяем, что это картинка
        if (!file.type.startsWith('image/')) {
            alert('Пожалуйста, выберите изображение');
            return;
        }
        
        // Читаем файл
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log("Файл загружен");
            
            // Показываем превью
            if (previewImage) previewImage.src = e.target.result;
            if (imagePreview) imagePreview.style.display = 'block';
            if (uploadArea) uploadArea.style.display = 'none';
            
            // Показываем результат с Циннией
            setTimeout(function() {
                const resultCard = document.getElementById('resultCard');
                if (resultCard) {
                    resultCard.style.display = 'block';
                    
                    // Заполняем данные о Циннии
                    document.getElementById('plantName').textContent = 'Цинния (Zinnia)';
                    document.getElementById('plantConfidence').textContent = 'Точность: 99%';
                    document.getElementById('plantCareText').textContent = 'Яркое солнце, полив умеренный, не заливать. Цветет все лето.';
                    document.getElementById('lightInfo').textContent = 'Яркое солнце';
                    document.getElementById('waterInfo').textContent = 'Умеренный полив';
                    document.getElementById('tempInfo').textContent = '20-25°C';
                    document.getElementById('familyInfo').textContent = 'Астровые';
                    document.getElementById('soilInfo').textContent = 'Плодородная почва';
                    
                    // Добавляем здоровье
                    const extraInfo = document.getElementById('plantExtraInfo');
                    if (extraInfo) {
                        extraInfo.innerHTML = `
                            <div class="info-item" style="background: #f0fdf4; padding: 10px; border-radius: 8px;">
                                <i class="fas fa-heartbeat" style="color: #10b981;"></i>
                                <span>Здоровье: <strong style="color: #10b981;">Здорова</strong></span>
                            </div>
                        `;
                    }
                }
            }, 1000);
        };
        
        reader.readAsDataURL(file);
    };
    
    // 3. УДАЛЕНИЕ ПРЕВЬЮ
    if (removePreviewBtn) {
        removePreviewBtn.onclick = function() {
            console.log("Удаление превью");
            if (imagePreview) imagePreview.style.display = 'none';
            if (uploadArea) uploadArea.style.display = 'block';
            fileInput.value = '';
            
            const resultCard = document.getElementById('resultCard');
            if (resultCard) resultCard.style.display = 'none';
        };
    }
}
};

// ============================================
// ВАШИ ОСТАЛЬНЫЕ ФУНКЦИИ (Сенсоры, графики и т.д.)
// ============================================
// Здесь добавьте ваши существующие функции для:
// - updateSensorData()
// - initializeChart()
// - initializeImageUpload()
// - loadRecommendations()
// и т.д.

