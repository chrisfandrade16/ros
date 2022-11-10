# ROS (Restaurant Ordering System)

A web application for customers and stuff to manage restaurant orders.

# Development Process

To setup the environment...

1. Run "git clone https://github.com/chrisfandrade16/ros.git" on your computer
2. Run "cd ros" to enter the application's directory
3. Install the "Prettier" extension on your text editor for consistent formatting
4. Go to Code -> Preferences -> Settings, search "Format on Save", and check that box
5. Select and right-click any code, click "Format Document", and choose "Prettier" as your default formatter

To create your branch...

1. Run "git checkout master" to enter master branch
2. Run "git pull" to get latest changes
3. Run "git branch < your_branch_name >" to create your branch based on the latest master branch
4. Run "git checkout < your_branch_name >" to enter your branch

To run your branch...

1. Run "npm install" at root directory to install required libraries
2. Run "npm run start" at root directory to run a local development server for viewing the compiled application live in browser

To save your branch...

1. Add desired changes to code
2. Run "git add \*" from root directory to stage all your changes
3. Run "git commit -m < your_commit_message >" to commit your changes
4. Run "git push" to push your changes to your branch

To merge your branch...

1. Run "git checkout master" to enter the master branch
2. Run "git pull" to get latest changes
3. Run "git checkout < your_branch_name > to enter your brnach
4. Run "git rebase master" to get all the new changes from master onto your branch before merging
5. Run "git rebase --skip" continuously until the rebase is no longer in progress (this is to skip a coomit-by-commit conflicts in favour of seeing all merge conflicts at once)
6. Use your text editor to solve the merge conflicts
7. Run "npm run build" to update the build (a static compiled single HTML file of the application)
8. Run "git add \*", "git commit -m < your_commit_message >", and "git push" to stage, commit, and push your resolved conflicts to your branch
9. Submit a pull request on GitHub to get confirmation before merging your branch into the master branch
