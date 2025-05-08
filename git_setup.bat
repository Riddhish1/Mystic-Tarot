@echo off
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
git add .
git commit -m "Initial commit: Tarot Reading Application"
git remote add origin https://github.com/Riddhish1/Mystic-Tarot.git
git branch -M main
git push -u origin main
echo Done!
pause 