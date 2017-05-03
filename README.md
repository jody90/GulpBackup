# Gulp Backup Script

Simple Backup Script who zip's given Files and moves them to given Directory

```javascript
// Max Count of last Archives that will be kept
const MAX_ARCHIVES_TO_KEEP = 3;

// Destination where we copy the final archive.zip
const DEST_PATH = "dist/";

// Array of Files/Folders we want to backup
const FILES = [
    'src/**/*',
];
```

## Installation

1. git clone https://github.com/jody90/GulpBackup.git <br>
2. npm install <br>
3. gulp
