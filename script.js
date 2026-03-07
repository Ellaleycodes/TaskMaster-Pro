// Data Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let stats = JSON.parse(localStorage.getItem('stats')) || {
    points: 0,
    streak: 0,
    lastCompletionDate: null,
    completedToday: 0,
    totalCompleted: 0
};

// Pomodoro Timer
let timerInterval = null;
let timeRemaining = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let isBreak = false;

// Achievements
const achievements = [
    { id: 'first-task', name: 'First Step', description: 'Complete your first task', icon: '🎯', condition: () => stats.totalCompleted >= 1 },
    { id: 'ten-tasks', name: 'Getting Started', description: 'Complete 10 tasks', icon: '⭐', condition: () => stats.totalCompleted >= 10 },
    { id: 'streak-3', name: 'On a Roll', description: 'Maintain a 3-day streak', icon: '🔥', condition: () => stats.streak >= 3 },
    { id: 'streak-7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '💪', condition: () => stats.streak >= 7 },
    { id: 'points-100', name: 'Century Club', description: 'Earn 100 points', icon: '💯', condition: () => stats.points >= 100 },
    { id: 'points-500', name: 'Point Master', description: 'Earn 500 points', icon: '👑', condition: () => stats.points >= 500 }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateStats();
    updateAchievements();
    setupEventListeners();
    checkStreak();
});

function setupEventListeners() {
    // Task Form
    document.getElementById('taskForm').addEventListener('submit', addTask);

    // View Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Timer Controls
    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);
}

function addTask(e) {
    e.preventDefault();

    const task = {
        id: Date.now(),
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        importance: document.getElementById('taskImportance').value,
        urgency: document.getElementById('taskUrgency').value,
        deadline: document.getElementById('taskDeadline').value,
        estimate: parseInt(document.getElementById('taskEstimate').value) || 0,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    e.target.reset();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.completed = !task.completed;

    if (task.completed) {
        // Award points
        let points = 10;
        if (task.importance === 'important') points += 5;
        if (task.urgency === 'urgent') points += 5;
        if (task.estimate) points += Math.floor(task.estimate / 10);
        
        stats.points += points;
        stats.completedToday += 1;
        stats.totalCompleted += 1;
        
        updateStreak();
    } else {
        stats.completedToday = Math.max(0, stats.completedToday - 1);
    }

    saveTasks();
    saveStats();
    renderTasks();
    updateStats();
    updateAchievements();
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    const currentView = document.querySelector('.view-section.active').id;
    
    if (currentView === 'listView') {
        renderListView();
    } else {
        renderMatrixView();
    }
}

function renderListView() {
    const taskList = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p>No tasks yet. Add your first task to get started!</p>
            </div>
        `;
        return;
    }

    taskList.innerHTML = tasks.map(task => createTaskHTML(task)).join('');
}

function renderMatrixView() {
    const quadrants = {
        'urgent-important': document.getElementById('urgentImportant'),
        'not-urgent-important': document.getElementById('notUrgentImportant'),
        'urgent-not-important': document.getElementById('urgentNotImportant'),
        'not-urgent-not-important': document.getElementById('notUrgentNotImportant')
    };

    // Clear all quadrants
    Object.values(quadrants).forEach(q => q.innerHTML = '');

    // Sort tasks into quadrants
    tasks.forEach(task => {
        const key = `${task.urgency}-${task.importance}`;
        const quadrant = quadrants[key];
        if (quadrant) {
            quadrant.innerHTML += createTaskHTML(task);
        }
    });

    // Add empty state to empty quadrants
    Object.values(quadrants).forEach(q => {
        if (q.innerHTML === '') {
            q.innerHTML = '<p style="color: #999; font-size: 0.9rem;">No tasks in this quadrant</p>';
        }
    });
}

function createTaskHTML(task) {
    const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;
    const deadlineText = task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline';

    return `
        <li class="task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}">
            <div class="task-header">
                <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
                <div class="task-badges">
                    ${task.urgency === 'urgent' ? '<span class="badge badge-urgent">Urgent</span>' : ''}
                    ${task.importance === 'important' ? '<span class="badge badge-important">Important</span>' : ''}
                    ${task.estimate ? `<span class="badge badge-time">${task.estimate}min</span>` : ''}
                </div>
            </div>
            ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
            <div class="task-meta">
                <span>📅 ${deadlineText}</span>
                ${isOverdue ? '<span style="color: #dc3545;">⚠️ Overdue</span>' : ''}
            </div>
            <div class="task-actions">
                <button class="btn ${task.completed ? 'btn-secondary' : 'btn-success'}" onclick="toggleTask(${task.id})">
                    ${task.completed ? '↩️ Undo' : '✓ Complete'}
                </button>
                <button class="btn btn-danger" onclick="deleteTask(${task.id})">🗑️ Delete</button>
            </div>
        </li>
    `;
}

function updateStats() {
    document.getElementById('totalPoints').textContent = stats.points;
    document.getElementById('currentStreak').textContent = stats.streak;
    document.getElementById('completedToday').textContent = stats.completedToday;
    
    const totalTime = tasks.reduce((sum, task) => sum + (task.estimate || 0), 0);
    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
    document.getElementById('totalTime').textContent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = stats.lastCompletionDate ? new Date(stats.lastCompletionDate).toDateString() : null;

    if (!lastDate) {
        stats.streak = 1;
    } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastDate === today) {
            // Already counted today
        } else if (lastDate === yesterdayStr) {
            stats.streak += 1;
        } else {
            stats.streak = 1;
        }
    }

    stats.lastCompletionDate = new Date().toISOString();
}

function checkStreak() {
    if (stats.lastCompletionDate) {
        const lastDate = new Date(stats.lastCompletionDate).toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        const today = new Date().toDateString();

        if (lastDate !== today && lastDate !== yesterdayStr) {
            stats.streak = 0;
            stats.completedToday = 0;
            saveStats();
            updateStats();
        }
    }
}

function updateAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    
    achievementsList.innerHTML = achievements.map(achievement => {
        const unlocked = achievement.condition();
        return `
            <div class="achievement-item ${unlocked ? '' : 'achievement-locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                    ${unlocked ? '<span style="color: #28a745; font-weight: bold;">✓ Unlocked</span>' : '<span style="color: #999;">🔒 Locked</span>'}
                </div>
            </div>
        `;
    }).join('');
}

function switchView(view) {
    // Update tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });

    // Update views
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });

    if (view === 'list') {
        document.getElementById('listView').classList.add('active');
    } else {
        document.getElementById('matrixView').classList.add('active');
    }

    renderTasks();
}

// Pomodoro Timer Functions
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById('timerStatus').textContent = isBreak ? 'Break time!' : 'Focus time!';
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    document.getElementById('timerStatus').textContent = 'Paused';
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    timeRemaining = 25 * 60;
    isBreak = false;
    updateTimerDisplay();
    document.getElementById('timerStatus').textContent = 'Ready to focus';
}

function updateTimer() {
    timeRemaining--;

    if (timeRemaining < 0) {
        clearInterval(timerInterval);
        isRunning = false;

        if (!isBreak) {
            // Pomodoro complete, start break
            alert('🎉 Pomodoro complete! Time for a 5-minute break.');
            stats.points += 25;
            saveStats();
            updateStats();
            timeRemaining = 5 * 60;
            isBreak = true;
            document.getElementById('timerStatus').textContent = 'Break time!';
        } else {
            // Break complete
            alert('⏰ Break is over! Ready for another pomodoro?');
            timeRemaining = 25 * 60;
            isBreak = false;
            document.getElementById('timerStatus').textContent = 'Ready to focus';
        }
    }

    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Storage Functions
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveStats() {
    localStorage.setItem('stats', JSON.stringify(stats));
                           }
                                                                    
