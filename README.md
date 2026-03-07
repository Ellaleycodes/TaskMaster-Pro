# 🎯 TaskMaster Pro

A smart, feature-rich to-do list application with Eisenhower Matrix, Pomodoro Timer, and gamification elements. Built with vanilla JavaScript - no frameworks required!

![TaskMaster Pro](https://img.shields.io/badge/version-1.0.0-gold) ![License](https://img.shields.io/badge/license-MIT-gold) ![HTML5](https://img.shields.io/badge/HTML5-black?logo=html5) ![CSS3](https://img.shields.io/badge/CSS3-gold?logo=css3) ![JavaScript](https://img.shields.io/badge/JavaScript-black?logo=javascript)

## ✨ Features

### 📊 **Eisenhower Matrix View**
Organize your tasks into four quadrants based on urgency and importance:
- 🔴 **Urgent & Important** - Do these first
- 🟡 **Not Urgent & Important** - Schedule these
- 🔵 **Urgent & Not Important** - Delegate these
- ⚫ **Not Urgent & Not Important** - Eliminate these

### 🍅 **Pomodoro Timer**
Built-in 25-minute focus timer with 5-minute breaks to boost productivity:
- Start/Pause/Reset controls
- Automatic break notifications
- Earn bonus points for completing pomodoros

### 🎮 **Gamification System**
Stay motivated with points, streaks, and achievements:
- Earn points for completing tasks
- Build daily completion streaks
- Unlock achievements as you progress
- Track your productivity stats

### ⏱️ **Time Estimates**
- Set estimated time for each task
- View total time needed for your tasks
- Better plan your day

### 🎨 **Premium Design**
- Stunning black and gold theme
- Animated background with flowing gold streaks
- Smooth transitions and hover effects
- Fully responsive design

### 💾 **Local Storage**
- All data saved automatically in your browser
- No account required
- Your data stays private and offline

## 🚀 Demo

[Live Demo](https://github.com/Ellaleycodes/TaskMaster-Pro.git)

## 🛠️ Installation

### Option 1: Use Directly
1. Download `index.html`
2. Open it in any modern web browser
3. Start organizing your tasks!

### Option 2: Clone Repository
```bash
git clone https://github.com/Ellaleycodes/TaskMaster-Pro.git
# Open index.html in your browser
```

### Option 3: Deploy to GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your app will be live at https://github.com/Ellaleycodes/TaskMaster-Pro.git

## 📖 How to Use

### Adding Tasks
1. Fill in the task form with:
   - **Title** (required)
   - **Description** (optional)
   - **Importance** (Important/Not Important)
   - **Urgency** (Urgent/Not Urgent)
   - **Deadline** (optional)
   - **Time Estimate** (optional, in minutes)
2. Click "Add Task"

### Viewing Tasks
- **List View**: See all tasks in a simple list
- **Matrix View**: See tasks organized by the Eisenhower Matrix

### Using Pomodoro Timer
1. Click "Start" to begin a 25-minute focus session
2. Work on your task until the timer goes off
3. Take a 5-minute break when prompted
4. Repeat!

### Earning Points
- Complete a task: 10 points (base)
- Important task: +5 bonus points
- Urgent task: +5 bonus points
- Time estimate bonus: +1 point per 10 minutes
- Complete a pomodoro: +25 points

### Achievements
Unlock achievements by:
- ✅ Completing your first task
- ⭐ Completing 10 tasks
- 🔥 Maintaining a 3-day streak
- 💪 Maintaining a 7-day streak
- 💯 Earning 100 points
- 👑 Earning 500 points

## 🎯 Why TaskMaster Pro?

**What makes this different from other to-do apps?**

✅ **No Sign-up Required** - Start using immediately, no account needed

✅ **Completely Offline** - Works without internet, data stays on your device

✅ **Smart Prioritization** - Eisenhower Matrix helps you focus on what matters

✅ **Productivity Focused** - Built-in Pomodoro timer keeps you in flow

✅ **Gamified** - Points and achievements make productivity fun

✅ **Zero Dependencies** - Pure HTML/CSS/JS, no frameworks or libraries

✅ **Privacy First** - Your data never leaves your browser

## 🧑‍💻 Technologies Used

- **HTML5** - Structure
  -**CSS3** - Styling with gradients, animations, and flexbox/grid
- **Vanilla JavaScript** - All functionality, no frameworks
- **LocalStorage API** - Data persistence
- **Web Animations** - Smooth UI transitions

## 🗂️ File Structure

```
taskmaster-pro/
│
├── index.html          # Main application file (all-in-one)
├── README.md           # This file
└── LICENSE            # MIT License
```

## 🔧 Customization

The app is highly customizable! All code is in a single HTML file:

**Change Colors:**
- Find the CSS section (`<style>` tag)
- Modify color variables (search for `#FFD700`, `#DAA520`, etc.)

**Modify Points System:**
- Find the `toggleTask()` function in JavaScript
- Adjust the point values

**Change Timer Duration:**
- Find `let timeRemaining = 25 * 60` in JavaScript
- Modify to your preferred duration (in seconds)

**Add Features:**
- The code is well-commented and organized
- Feel free to fork and extend!

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 Future Enhancements

Potential features for future versions:
- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Export/import tasks
- [ ] Dark/light theme toggle
- [ ] Multiple color themes
- [ ] Drag and drop task reordering
- [ ] Task search and filtering
- [ ] Weekly/monthly analytics
- [ ] Subtasks support
- [ ] Cloud sync (optional)

## 🐛 Known Issues

- Timer continues in background tabs (browser limitation)
- Data is browser-specific (clearing browser data will delete tasks)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Eisenhower Matrix concept by President Dwight D. Eisenhower
- Pomodoro Technique by Francesco Cirillo
- Inspired by modern productivity apps

## 📧 Contact

Immanuella Udofia - ellaudofia792@gmail.com
LinkedIn:https://www.linkedin.com/in/immanuella-udofia-224327325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app

Project Link 🔗https://github.com/Ellaleycodes/TaskMaster-Pro.git

---

⭐ If you found this helpful, please give it a star!

Made with ❤️ and ☕ by Ellaleycodes
