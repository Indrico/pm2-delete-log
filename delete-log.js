const fs = require('fs');
const path = require('path');
const logDirectory = '/home/app/.pm2/logs'; // Replace with your log directory path

const deleteOldLogs = () => {
  const files = fs.readdirSync(logDirectory);

  files.forEach((file) => {
    const filePath = path.join(logDirectory, file);
    const stats = fs.statSync(filePath);
    const ageInDays = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);

    if (ageInDays > 7) {
      fs.unlinkSync(filePath);
      console.log(`Deleted old log: ${filePath}`);
    }
  });
};

deleteOldLogs();