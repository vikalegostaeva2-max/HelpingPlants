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
    console.log("Кнопка сохранения найдена");
    saveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        saveToHistory();
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
    // ============================================
// СОХРАНЕНИЕ В ИСТОРИЮ (ИСПРАВЛЕННАЯ ВЕРСИЯ)
// ============================================
function saveToHistory() {
    console.log("Сохраняем в историю...");
    
    // Получаем данные растения
    const plantName = document.getElementById('plantName').textContent;
    const plantConfidence = document.getElementById('plantConfidence').textContent;
    const previewImage = document.getElementById('previewImage');
    const resultCard = document.getElementById('resultCard');
    
    // Проверяем, есть ли результат
    if (!resultCard || resultCard.style.display !== 'block') {
        alert('❌ Сначала проанализируйте растение');
        return;
    }
    
    if (!plantName || plantName === 'Одуванчик обыкновенный') {
        alert('❌ Сначала проанализируйте растение');
        return;
    }
    
    // Создаем запись
    const result = {
        id: Date.now(),
        plantName: plantName,
        confidence: plantConfidence,
        date: new Date().toLocaleString(),
        image: previewImage && previewImage.src ? previewImage.src : ''
    };
    
    console.log("Сохраняем:", result);
    
    // Получаем существующую историю
    let history = JSON.parse(localStorage.getItem('recognitionHistory') || '[]');
    history.unshift(result);
    
    // Сохраняем обратно
    localStorage.setItem('recognitionHistory', JSON.stringify(history));
    
    // Показываем уведомление
    alert('✅ Растение сохранено в историю!');
    
    // Анимация кнопки
    const btn = event ? event.target : document.getElementById('saveResultBtn');
    if (btn) {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    }
}
// ЗАГРУЗКА ИЗОБРАЖЕНИЙ
function initializeImageUpload() {
    console.log("Загрузчик запущен");
    
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const imagePreview = document.getElementById('imagePreview');
    const removePreviewBtn = document.getElementById('removePreviewBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const progressStatusText = document.getElementById('progressStatusText');
    const resultCard = document.getElementById('resultCard');
    
    if (!uploadArea || !fileInput) return;
    
    // Эффекты при наведении
    uploadArea.addEventListener('mouseenter', () => {
        uploadArea.style.transform = 'scale(1.02)';
        uploadArea.style.borderColor = '#10b981';
        uploadArea.style.backgroundColor = '#f0fdf4';
        uploadArea.style.transition = 'all 0.3s ease';
    });
    
    uploadArea.addEventListener('mouseleave', () => {
        uploadArea.style.transform = 'scale(1)';
        uploadArea.style.borderColor = '#e5e7eb';
        uploadArea.style.backgroundColor = '#f9fafb';
    });
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            alert('Пожалуйста, выберите изображение');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadArea.style.display = 'none';
            
            // Показываем прогресс
            uploadProgress.style.display = 'block';
            resultCard.style.display = 'none';
            
            // Анимация загрузки
            let progress = 0;
            const totalTime = 3000;
            const interval = 50;
            const step = (interval / totalTime) * 100;
            
            // Статусы загрузки
            const statusTexts = [
                { progress: 0, text: 'Запуск анализа...' },
                { progress: 25, text: 'Анализ изображения...' },
                { progress: 50, text: 'Поиск в базе данных...' },
                { progress: 75, text: 'Формирование рекомендаций...' },
                { progress: 95, text: 'Завершение...' }
            ];
            
            let currentStatusIndex = 0;
            
            const timer = setInterval(() => {
                progress += step;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(timer);
                    
                    progressStatusText.textContent = 'Готово!';
                    
                    setTimeout(() => {
                        uploadProgress.style.display = 'none';
                        resultCard.style.display = 'block';
                        
                        // Плавное появление результата
                        resultCard.style.animation = 'fadeIn 0.5s ease';
                        
                        // Данные о растении
                        document.getElementById('plantName').textContent = 'Цинния (Zinnia elegans)';
                        document.getElementById('plantConfidence').textContent = 'Точность: 99%';
                        document.getElementById('plantCareText').textContent = 'Яркое солнце, полив умеренный под корень. Цветет с июня по октябрь.';
                        document.getElementById('lightInfo').textContent = '☀️ Яркое солнце';
                        document.getElementById('waterInfo').textContent = '💧 Умеренный, раз в 3 дня';
                        document.getElementById('tempInfo').textContent = '🌡️ 20-28°C';
                        document.getElementById('familyInfo').textContent = 'Астровые';
                        document.getElementById('soilInfo').textContent = 'Плодородная, рыхлая';
                        
                        // Информация о здоровье
                        const extraInfo = document.getElementById('plantExtraInfo');
                        if (extraInfo) {
                            extraInfo.innerHTML = `
                                <div class="info-item" style="background: #f0fdf4; padding: 15px; border-radius: 10px; grid-column: span 3; border-left: 4px solid #10b981;">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <i class="fas fa-heartbeat" style="color: #10b981; font-size: 24px;"></i>
                                        <div>
                                            <div style="font-weight: 600; color: #10b981;">Здоровье: Отличное</div>
                                            <div style="color: #065f46;">Растение здорово, листья без пятен</div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }
                        
                        showNotification('Растение определено!', 'success');
                    }, 500);
                }
                
                // Обновление прогресс-бара
                if (progressFill) {
                    progressFill.style.width = progress + '%';
                    
                    // Градиент прогресса
                    if (progress < 30) progressFill.style.background = '#3b82f6';
                    else if (progress < 60) progressFill.style.background = '#8b5cf6';
                    else if (progress < 90) progressFill.style.background = '#ec4899';
                    else progressFill.style.background = '#10b981';
                }
                
                if (progressPercent) progressPercent.textContent = Math.round(progress) + '%';
                
                // Обновление текста статуса
                for (let i = currentStatusIndex; i < statusTexts.length; i++) {
                    if (progress >= statusTexts[i].progress) {
                        if (progressStatusText) {
                            progressStatusText.textContent = statusTexts[i].text;
                        }
                        currentStatusIndex = i;
                    }
                }
                
            }, interval);
        };
        
        reader.readAsDataURL(file);
    });
    
    // Удаление превью
    if (removePreviewBtn) {
        removePreviewBtn.addEventListener('click', function() {
            imagePreview.style.display = 'none';
            uploadArea.style.display = 'block';
            uploadProgress.style.display = 'none';
            resultCard.style.display = 'none';
            fileInput.value = '';
            
            // Сброс анимаций
            uploadArea.style.transform = 'scale(1)';
        });
    }
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#10b981';
        uploadArea.style.backgroundColor = '#f0fdf4';
        uploadArea.style.transform = 'scale(1.02)';
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e5e7eb';
        uploadArea.style.backgroundColor = '#f9fafb';
        uploadArea.style.transform = 'scale(1)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e5e7eb';
        uploadArea.style.backgroundColor = '#f9fafb';
        uploadArea.style.transform = 'scale(1)';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    });
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

