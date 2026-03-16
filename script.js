/* Основные стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
    color: #333;
    min-height: 100vh;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

/* Шапка */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    margin-bottom: 30px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.8rem;
    font-weight: 700;
    color: #2c3e50;
}

.logo i {
    color: #27ae60;
    font-size: 2rem;
}

.ai-text {
    color: #3498db;
    background: linear-gradient(45deg, #3498db, #2ecc71);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
}

.nav {
    display: flex;
    gap: 30px;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #7f8c8d;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s;
}

.nav-link:hover, .nav-link.active {
    color: #27ae60;
    background: rgba(39, 174, 96, 0.1);
}

.user-menu {
    display: flex;
    align-items: center;
    gap: 15px;
}

.btn-notification {
    position: relative;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #7f8c8d;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s;
}

.btn-notification:hover {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
}

.notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #e74c3c;
    color: white;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 18px;
    text-align: center;
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3498db, #2ecc71);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
}

.btn-login, .btn-logout {
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-login {
    background: #27ae60;
    color: white;
}

.btn-logout {
    background: #e74c3c;
    color: white;
}

.btn-login:hover {
    background: #219653;
    transform: translateY(-2px);
}

.btn-logout:hover {
    background: #c0392b;
    transform: translateY(-2px);
}

/* Основной контент */
.main-content {
    margin-bottom: 40px;
}

.welcome-section {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.welcome-section h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 15px;
}

.welcome-section i {
    color: #27ae60;
    margin-right: 15px;
}

.subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    max-width: 600px;
    margin: 0 auto;
}

.user-welcome {
    margin-top: 20px;
    padding: 15px;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 10px;
    display: inline-block;
}

/* Карточки */
.dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

@media (max-width: 1200px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}

.card {
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
}

.card-header {
    margin-bottom: 25px;
}

.card-header h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 10px;
}

.card-subtitle {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-top: 5px;
}

/* Загрузка изображений */
.upload-area {
    border: 3px dashed #ddd;
    border-radius: 15px;
    padding: 50px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 20px;
}

.upload-area:hover {
    border-color: #27ae60;
    background: rgba(39, 174, 96, 0.05);
}

.upload-icon {
    font-size: 3rem;
    color: #7f8c8d;
    margin-bottom: 15px;
}

.upload-text {
    color: #7f8c8d;
    margin-bottom: 20px;
    font-size: 1.1rem;
}

.btn-select-file {
    background: #3498db;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.btn-select-file:hover {
    background: #2980b9;
    transform: translateY(-2px);
}

.file-info {
    color: #95a5a6;
    font-size: 0.9rem;
    margin-top: 15px;
}

/* Предпросмотр изображения */
.image-preview {
    margin-bottom: 20px;
    text-align: center;
}

#previewImage {
    max-width: 100%;
    max-height: 300px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-remove-preview {
    margin-top: 15px;
    background: #e74c3c;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-remove-preview:hover {
    background: #c0392b;
}

/* Прогресс загрузки */
.upload-progress {
    margin-bottom: 20px;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.progress-bar {
    height: 10px;
    background: #ecf0f1;
    border-radius: 5px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #27ae60, #2ecc71);
    border-radius: 5px;
    width: 0%;
    transition: width 0.3s;
}

.progress-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    color: #7f8c8d;
}

/* Результат распознавания */
.result-card {
    background: linear-gradient(135deg, #f8fff9 0%, #e8f5e9 100%);
    border-radius: 15px;
    padding: 25px;
    border: 2px solid #27ae60;
}

.plant-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
}

.plant-icon {
    font-size: 2.5rem;
    color: #27ae60;
}

.plant-header h3 {
    font-size: 1.4rem;
    color: #2c3e50;
}

.confidence {
    color: #27ae60;
    font-weight: 600;
    font-size: 0.9rem;
    margin-top: 5px;
}

.plant-care-tips {
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.plant-care-tips h4 {
    color: #2c3e50;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.care-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}

.care-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    border-left: 4px solid #27ae60;
}

.care-item i {
    color: #27ae60;
}

.plant-extra-info {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #7f8c8d;
}

.btn-save-result {
    width: 100%;
    background: #3498db;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.btn-save-result:hover {
    background: #2980b9;
    transform: translateY(-2px);
}

/* Влажность почвы */
.humidity-display {
    margin-bottom: 30px;
}

.humidity-scale {
    position: relative;
    height: 40px;
    background: linear-gradient(90deg, #e74c3c, #f39c12, #27ae60, #3498db);
    border-radius: 20px;
    margin: 20px 0;
    overflow: hidden;
}

.scale-mark {
    position: absolute;
    top: -25px;
    font-size: 0.8rem;
    color: #7f8c8d;
}

.scale-mark.dry { left: 10px; }
.scale-mark.ideal { left: 50%; transform: translateX(-50%); }
.scale-mark.wet { right: 10px; }

.humidity-indicator {
    position: absolute;
    top: 0;
    left: 47%;
    transform: translateX(-50%);
    background: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border: 3px solid #27ae60;
}

.humidity-value {
    font-weight: 700;
    color: #2c3e50;
}

.humidity-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.current-level .level-title {
    color: #7f8c8d;
    font-size: 0.9rem;
}

.level-value {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
}

.status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.status-dot.ideal-dot {
    background: #27ae60;
}

/* Панель управления */
.control-panel {
    margin-bottom: 25px;
}

.control-panel h3 {
    margin-bottom: 20px;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 10px;
}

.control-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.control-label span:first-child {
    color: #2c3e50;
    font-weight: 500;
}

.control-status {
    color: #7f8c8d;
    font-size: 0.9rem;
}

.control-status.active {
    color: #27ae60;
    font-weight: 600;
}

.control-slider {
    flex: 1;
    max-width: 200px;
    height: 8px;
    background: #ecf0f1;
    border-radius: 4px;
    margin: 0 20px;
    overflow: hidden;
}

.slider-fill {
    height: 100%;
    background: linear-gradient(90deg, #f39c12, #27ae60);
    border-radius: 4px;
}

/* Переключатели */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
}

input:checked + .slider {
    background-color: #27ae60;
}

input:checked + .slider:before {
    transform: translateX(26px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.btn-refresh {
    width: 100%;
    background: #95a5a6;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.btn-refresh:hover {
    background: #7f8c8d;
    transform: translateY(-2px);
}

/* Датчики */
.sensors-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

@media (max-width: 768px) {
    .sensors-grid {
        grid-template-columns: 1fr;
    }
}

.sensor-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e9ecef;
}

.sensor-icon {
    font-size: 1.5rem;
    color: #3498db;
    background: rgba(52, 152, 219, 0.1);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sensor-info {
    flex: 1;
}

.sensor-name {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.sensor-value {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2c3e50;
}

.unit {
    font-size: 0.9rem;
    color: #7f8c8d;
    font-weight: normal;
}

.sensor-status {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.sensor-status.excellent {
    background: rgba(39, 174, 96, 0.1);
    color: #27ae60;
}

.sensor-status.ideal {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
}

.sensor-status.normal {
    background: rgba(241, 196, 15, 0.1);
    color: #f39c12;
}

.sensor-status.good {
    background: rgba(155, 89, 182, 0.1);
    color: #9b59b6;
}

/* График */
.history-chart {
    height: 200px;
    margin-top: 20px;
}

/* Рекомендации */
.recommendation-list {
    margin-bottom: 20px;
}

.recommendation-item {
    display: flex;
    gap: 15px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    margin-bottom: 15px;
    border-left: 4px solid #3498db;
}

.recommendation-item.urgent {
    border-left-color: #e74c3c;
}

.recommendation-item.warning {
    border-left-color: #f39c12;
}

.recommendation-item.info {
    border-left-color: #3498db;
}

.rec-icon {
    font-size: 1.2rem;
    color: #3498db;
}

.rec-icon.urgent {
    color: #e74c3c;
}

.rec-icon.warning {
    color: #f39c12;
}

.rec-icon.info {
    color: #3498db;
}

.rec-content {
    flex: 1;
}

.rec-content h4 {
    color: #2c3e50;
    margin-bottom: 8px;
}

.rec-time {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.btn-view-all {
    width: 100%;
    background: none;
    border: 2px solid #3498db;
    color: #3498db;
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.btn-view-all:hover {
    background: #3498db;
    color: white;
}

/* Подвал */
.footer {
    margin-top: 50px;
    padding: 30px;
    background: #2c3e50;
    color: white;
    border-radius: 20px;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 700;
}

.footer-logo i {
    color: #27ae60;
}

.footer-info {
    text-align: center;
}

.footer-info p {
    margin-bottom: 5px;
}

.copyright {
    color: #95a5a6;
}

.footer-links {
    display: flex;
    gap: 20px;
}

.footer-links a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: #27ae60;
}

/* AI Статус */
.ai-status {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 100;
    border-left: 4px solid #27ae60;
}

.ai-status-content {
    display: flex;
    align-items: center;
    gap: 15px;
}

.ai-status-icon {
    font-size: 1.8rem;
}

.ai-status-title {
    font-weight: 700;
    color: #2c3e50;
    font-size: 0.9rem;
}

.ai-status-subtitle {
    color: #7f8c8d;
    font-size: 0.8rem;
}

/* Модальные окна */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal.active {
    display: flex;
}

.modal-content {
    background: white;
    border-radius: 12px;
    padding: 0;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-content.wide {
    max-width: 800px;
}

.modal-header {
    padding: 20px 30px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #2c3e50;
}

.modal-close {
    background: none;
    border: none;
    font-size: 28px;
    color: #7f8c8d;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-body {
    padding: 30px;
    overflow-y: auto;
}

/* Табы авторизации */
.auth-tabs {
    display: flex;
    margin-bottom: 30px;
    border-bottom: 2px solid #eee;
}

.auth-tab {
    padding: 12px 24px;
    background: none;
    border: none;
    font-size: 1rem;
    color: #7f8c8d;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
}

.auth-tab.active {
    color: #27ae60;
    font-weight: 600;
}

.auth-tab.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #27ae60;
    border-radius: 3px 3px 0 0;
}

/* Формы */
.auth-form {
    display: none;
}

.auth-form.active {
    display: block;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #2c3e50;
}

.form-group input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
}

.form-group input:focus {
    border-color: #27ae60;
    outline: none;
}

.btn-auth {
    width: 100%;
    background: #27ae60;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.btn-auth:hover {
    background: #219653;
    transform: translateY(-2px);
}

/* История */
.history-list {
    max-height: 400px;
    overflow-y: auto;
}

.empty-history {
    text-align: center;
    padding: 50px 20px;
    color: #95a5a6;
}

.empty-history i {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #ddd;
}

.history-item {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 15px;
    border-left: 4px solid #27ae60;
}

.history-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
}

.history-plant-name {
    font-weight: 700;
    color: #2c3e50;
    font-size: 1.1rem;
}

.history-date {
    color: #7f8c8d;
    font-size: 0.9rem;
}

.history-care-tips {
    color: #7f8c8d;
    margin-bottom: 15px;
}

.history-care-details {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.history-care-item {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #7f8c8d;
    font-size: 0.9rem;
}

/* Утилиты */
.hidden {
    display: none !important;
}
// Firebase конфигурация - ВАШИ ДАННЫЕ
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
let notifications = [];
let recognitionHistory = [];

// DOM элементы
const elements = {
    authModal: document.getElementById('authModal'),
    historyModal: document.getElementById('historyModal'),
    loginBtn: document.getElementById('loginBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    userAvatar: document.getElementById('userAvatar'),
    userWelcome: document.getElementById('userWelcome'),
    userName: document.getElementById('userName'),
    notificationBadge: document.getElementById('notificationBadge'),
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    authTabs: document.querySelectorAll('.auth-tab'),
    closeAuthModal: document.getElementById('closeAuthModal'),
    closeHistoryModal: document.getElementById('closeHistoryModal'),
    historyNavBtn: document.getElementById('historyNavBtn'),
    saveResultBtn: document.getElementById('saveResultBtn')
};

// ========== УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ ==========

// Открыть модальное окно авторизации
function openAuthModal(tab = 'login') {
    elements.authModal.style.display = 'flex';
    
    // Переключение вкладки
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active');
        document.querySelector('[data-tab="login"]').classList.add('active');
    } else {
        document.getElementById('registerForm').classList.add('active');
        document.querySelector('[data-tab="register"]').classList.add('active');
    }
}

// Закрыть модальное окно авторизации
function closeAuthModal() {
    elements.authModal.style.display = 'none';
}

// Открыть историю
function openHistoryModal() {
    if (!currentUser) {
        showNotification('Необходимо войти в систему', 'error');
        openAuthModal('login');
        return;
    }
    elements.historyModal.style.display = 'flex';
    loadUserHistory();
}

// Закрыть историю
function closeHistoryModal() {
    elements.historyModal.style.display = 'none';
}

// ========== АВТОРИЗАЦИЯ ==========

// Регистрация
async function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const username = document.getElementById('registerUsername').value;
    
    if (password.length < 6) {
        showNotification('Пароль должен быть не менее 6 символов', 'error');
        return;
    }
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // Обновляем профиль пользователя
        await userCredential.user.updateProfile({
            displayName: username
        });
        
        showNotification('Регистрация успешна!', 'success');
        closeAuthModal();
        
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        
        let message = 'Ошибка при регистрации';
        switch(error.code) {
            case 'auth/email-already-in-use':
                message = 'Этот email уже зарегистрирован';
                break;
            case 'auth/invalid-email':
                message = 'Некорректный email';
                break;
            case 'auth/weak-password':
                message = 'Слишком простой пароль';
                break;
        }
        
        showNotification(message, 'error');
    }
}

// Вход
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showNotification('Вход выполнен успешно!', 'success');
        closeAuthModal();
        
    } catch (error) {
        console.error('Ошибка входа:', error);
        
        let message = 'Ошибка при входе';
        switch(error.code) {
            case 'auth/user-not-found':
                message = 'Пользователь не найден';
                break;
            case 'auth/wrong-password':
                message = 'Неверный пароль';
                break;
            case 'auth/invalid-email':
                message = 'Некорректный email';
                break;
            case 'auth/user-disabled':
                message = 'Аккаунт заблокирован';
                break;
        }
        
        showNotification(message, 'error');
    }
}

// Выход
async function handleLogout() {
    try {
        await auth.signOut();
        showNotification('Вы вышли из системы', 'info');
    } catch (error) {
        console.error('Ошибка при выходе:', error);
        showNotification('Ошибка при выходе', 'error');
    }
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ==========

// Обновление UI в зависимости от статуса авторизации
function updateUIForUser(user) {
    currentUser = user;
    
    if (user) {
        // Пользователь авторизован
        elements.loginBtn.style.display = 'none';
        elements.logoutBtn.style.display = 'block';
        elements.userAvatar.style.display = 'flex';
        elements.userWelcome.style.display = 'block';
        
        // Обновляем имя пользователя
        const displayName = user.displayName || user.email.split('@')[0];
        elements.userName.textContent = displayName;
        
        // Обновляем аватар
        if (user.photoURL) {
            elements.userAvatar.innerHTML = `<img src="${user.photoURL}" alt="Avatar">`;
        } else {
            elements.userAvatar.innerHTML = `<i class="fas fa-user"></i>`;
        }
        
        // Загружаем данные пользователя
        loadUserData();
        
    } else {
        // Пользователь не авторизован
        elements.loginBtn.style.display = 'block';
        elements.logoutBtn.style.display = 'none';
        elements.userAvatar.style.display = 'none';
        elements.userWelcome.style.display = 'none';
        
        // Скрываем контент, требующий авторизации
        resetToGuestView();
    }
}

// Сброс к гостевому виду
function resetToGuestView() {
    // Скрываем результаты распознавания
    document.getElementById('resultCard').style.display = 'none';
    document.getElementById('uploadProgress').style.display = 'none';
    
    // Очищаем превью если есть
    const imagePreview = document.getElementById('imagePreview');
    const uploadArea = document.getElementById('uploadArea');
    if (imagePreview.style.display === 'block') {
        imagePreview.style.display = 'none';
        uploadArea.style.display = 'block';
    }
}

// Загрузка данных пользователя
async function loadUserData() {
    // Здесь будет загрузка истории из базы данных
    // Пока используем localStorage
    const saved = localStorage.getItem(`history_${currentUser.uid}`);
    if (saved) {
        recognitionHistory = JSON.parse(saved);
        updateNotificationBadge();
    }
}

// ========== УВЕДОМЛЕНИЯ ==========

// Показать уведомление
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                         type === 'error' ? 'fa-exclamation-circle' : 
                         'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Обновить бейдж уведомлений
function updateNotificationBadge() {
    const count = notifications.length;
    elements.notificationBadge.textContent = count;
    elements.notificationBadge.style.display = count > 0 ? 'block' : 'none';
}

// ========== ИСТОРИЯ ==========

// Сохранить результат в историю
function saveResultToHistory() {
    if (!currentUser) {
        showNotification('Войдите, чтобы сохранять историю', 'error');
        openAuthModal('login');
        return;
    }
    
    const previewImage = document.getElementById('previewImage');
    if (!previewImage.src) {
        showNotification('Сначала проанализируйте растение', 'error');
        return;
    }
    
    const result = {
        id: Date.now(),
        plantName: document.getElementById('plantName').textContent,
        confidence: document.getElementById('plantConfidence').textContent,
        careText: document.getElementById('plantCareText').textContent,
        image: previewImage.src,
        date: new Date().toLocaleString()
    };
    
    recognitionHistory.unshift(result);
    
    // Сохраняем в localStorage (позже заменим на базу данных)
    localStorage.setItem(`history_${currentUser.uid}`, JSON.stringify(recognitionHistory));
    
    showNotification('Результат сохранен в историю!', 'success');
}

// Загрузить историю пользователя
function loadUserHistory() {
    const historyList = document.getElementById('historyList');
    
    if (recognitionHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-leaf"></i>
                <p>У вас пока нет истории распознавания</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = recognitionHistory.map(item => `
        <div class="history-item">
            <img src="${item.image}" alt="${item.plantName}">
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

// Удалить элемент истории
window.deleteHistoryItem = function(id) {
    recognitionHistory = recognitionHistory.filter(item => item.id !== id);
    localStorage.setItem(`history_${currentUser.uid}`, JSON.stringify(recognitionHistory));
    loadUserHistory();
    showNotification('Запись удалена', 'info');
};

// ========== ИНИЦИАЛИЗАЦИЯ ==========

// Слушатель состояния авторизации
auth.onAuthStateChanged((user) => {
    updateUIForUser(user);
});

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    
    // Кнопки авторизации
    if (elements.loginBtn) elements.loginBtn.addEventListener('click', () => openAuthModal('login'));
    if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', handleLogout);
    if (elements.userAvatar) elements.userAvatar.addEventListener('click', () => openAuthModal('login'));
    
    // Модальные окна
    if (elements.closeAuthModal) elements.closeAuthModal.addEventListener('click', closeAuthModal);
    if (elements.closeHistoryModal) elements.closeHistoryModal.addEventListener('click', closeHistoryModal);
    if (elements.historyNavBtn) elements.historyNavBtn.addEventListener('click', openHistoryModal);
    if (elements.saveResultBtn) elements.saveResultBtn.addEventListener('click', saveResultToHistory);
    
    // Переключение вкладок
    elements.authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            openAuthModal(tabName);
        });
    });
    
    // Формы
    if (elements.loginForm) elements.loginForm.addEventListener('submit', handleLogin);
    if (elements.registerForm) elements.registerForm.addEventListener('submit', handleRegister);
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === elements.authModal) closeAuthModal();
        if (e.target === elements.historyModal) closeHistoryModal();
    });
    
    // Инициализация остального функционала
    initializeApp();
});

// Инициализация приложения
function initializeApp() {
    // Загрузка демо-рекомендаций
    loadRecommendations();
    
    // Инициализация графика
    initializeChart();
    
    // Обработчики для загрузки изображений
    initializeImageUpload();
    
    // Обновление года в подвале
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()} HelpingPlantsAI`;
    }
    
    // Обновление показаний сенсоров (демо)
    setInterval(updateSensorData, 30000); // Обновление каждые 30 секунд
}

// Загрузка рекомендаций
function loadRecommendations() {
    const recommendations = [
        {
            icon: 'fa-tint',
            title: 'Полив',
            description: 'Умеренный полив 2 раза в неделю',
            priority: 'high'
        },
        {
            icon: 'fa-sun',
            title: 'Освещение',
            description: 'Яркий рассеянный свет 8-10 часов',
            priority: 'medium'
        },
        {
            icon: 'fa-leaf',
            title: 'Подкормка',
            description: 'Удобрение для цветущих растений',
            priority: 'low'
        }
    ];
    
    const list = document.getElementById('recommendationList');
    if (list) {
        list.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item priority-${rec.priority}">
                <i class="fas ${rec.icon}"></i>
                <div class="recommendation-content">
                    <strong>${rec.title}</strong>
                    <p>${rec.description}</p>
                </div>
            </div>
        `).join('');
    }
}

// Инициализация графика
function initializeChart() {
    const canvas = document.getElementById('sensorChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                label: 'Влажность почвы %',
                data: [45, 42, 38, 35, 40, 45, 47],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Обновление данных сенсоров (демо)
function updateSensorData() {
    const randomHumidity = Math.floor(Math.random() * 30) + 35; // 35-65%
    
    const humidityValue = document.getElementById('humidityValue');
    const currentHumidity = document.getElementById('currentHumidity');
    const humidityDot = document.getElementById('humidityDot');
    const humidityStatus = document.getElementById('humidityStatus');
    
    if (humidityValue) humidityValue.textContent = randomHumidity + '%';
    if (currentHumidity) currentHumidity.textContent = randomHumidity + '%';
    
    if (humidityDot && humidityStatus) {
        if (randomHumidity < 40) {
            humidityDot.className = 'status-dot dry';
            humidityStatus.textContent = 'Сухо';
        } else if (randomHumidity > 60) {
            humidityDot.className = 'status-dot wet';
            humidityStatus.textContent = 'Влажно';
        } else {
            humidityDot.className = 'status-dot ideal';
            humidityStatus.textContent = 'Идеально';
        }
    }
}

// Инициализация загрузки изображений
function initializeImageUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const imagePreview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const removePreviewBtn = document.getElementById('removePreviewBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const resultCard = document.getElementById('resultCard');
    
    if (!uploadArea || !fileInput) return;
    
    if (selectFileBtn) {
        selectFileBtn.addEventListener('click', () => fileInput.click());
    }
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (previewImage) previewImage.src = e.target.result;
                if (imagePreview) imagePreview.style.display = 'block';
                if (uploadArea) uploadArea.style.display = 'none';
                
                // Показываем прогресс загрузки
                if (uploadProgress) uploadProgress.style.display = 'block';
                
                // Симуляция анализа
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 10;
                    const progressFill = document.getElementById('progressFill');
                    const progressPercent = document.getElementById('progressPercent');
                    const progressStatusText = document.getElementById('progressStatusText');
                    
                    if (progressFill) progressFill.style.width = progress + '%';
                    if (progressPercent) progressPercent.textContent = progress + '%';
                    
                    if (progress === 30) {
                        if (progressStatusText) progressStatusText.textContent = 'Анализ изображения...';
                    } else if (progress === 60) {
                        if (progressStatusText) progressStatusText.textContent = 'Поиск в базе данных...';
                    } else if (progress === 90) {
                        if (progressStatusText) progressStatusText.textContent = 'Формирование рекомендаций...';
                    }
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        if (uploadProgress) uploadProgress.style.display = 'none';
                        if (resultCard) resultCard.style.display = 'block';
                        
                        // Обновляем демо-данные
                        const plantNames = ['Монстера', 'Фикус', 'Спатифиллум', 'Орхидея', 'Кактус'];
                        const randomPlant = plantNames[Math.floor(Math.random() * plantNames.length)];
                        
                        const plantNameEl = document.getElementById('plantName');
                        if (plantNameEl) plantNameEl.textContent = randomPlant;
                    }
                }, 300);
            };
            reader.readAsDataURL(file);
        }
    });
    
    if (removePreviewBtn) {
        removePreviewBtn.addEventListener('click', () => {
            if (imagePreview) imagePreview.style.display = 'none';
            if (uploadArea) uploadArea.style.display = 'block';
            if (resultCard) resultCard.style.display = 'none';
            if (uploadProgress) uploadProgress.style.display = 'none';
            fileInput.value = '';
        });
    }
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        }
    });
}

// Кнопка обновления
const refreshBtn = document.getElementById('refreshBtn');
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        showNotification('Данные обновляются...', 'info');
        setTimeout(() => {
            updateSensorData();
            showNotification('Данные обновлены', 'success');
        }, 1000);
    });
}

// Переключатели
const autoWatering = document.getElementById('autoWatering');
if (autoWatering) {
    autoWatering.addEventListener('change', (e) => {
        showNotification(e.target.checked ? 'Автополив включен' : 'Автополив выключен', 'info');
    });
}

const notificationsToggle = document.getElementById('notifications');
if (notificationsToggle) {
    notificationsToggle.addEventListener('change', (e) => {
        showNotification(e.target.checked ? 'Уведомления включены' : 'Уведомления выключены', 'info');
    });
}

const aiMode = document.getElementById('aiMode');
if (aiMode) {
    aiMode.addEventListener('change', (e) => {
        showNotification(e.target.checked ? 'AI режим активирован' : 'AI режим деактивирован', 'info');
    });
}

// Документация
const docsLink = document.getElementById('docsLink');
if (docsLink) {
    docsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Документация в разработке', 'info');
    });
}

// Кнопка "Показать все рекомендации"
const viewAllBtn = document.getElementById('viewAllBtn');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        showNotification('Все рекомендации доступны после входа', 'info');
        if (!currentUser) {
            openAuthModal('login');
        }
    });
}
