import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/logo.png?asset'
import db from './database' // Import the database module

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    title: 'الأيقونة للطباعة والإشهار',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true, // Enable context isolation
      nodeIntegration: false // Disable Node.js integration in the renderer process
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// ======================================================
// IPC Endpoints for database operations
ipcMain.handle('get-users', async () => {
  try {
    // Use the db object to query the database
    const users = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
          reject(err) // Reject the promise if there's an error
        } else {
          resolve(rows) // Resolve with the query results
        }
      })
    })
    return users // Return the users to the renderer process
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error // Throw the error to the renderer process
  }
})

ipcMain.handle('add-user', async (_, user) => {
  try {
    // Use the db object to insert the new user into the database
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (username, phone, password) VALUES (?, ?, ?)',
        [user.username, user.phone, user.password],
        (err) => {
          if (err) {
            reject(err) // Reject the promise if there's an error
          } else {
            resolve() // Resolve if the query is successful
          }
        }
      )
    })
    console.log('User added successfully:', user)
    return { success: true }
  } catch (error) {
    console.error('Error adding user:', error)
    throw error // Throw the error to the renderer process
  }
})

ipcMain.handle('check-user', async (_, user) => {
  try {
    const existingUser = await new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE username = ? OR phone = ?',
        [user.username, user.phone],
        (err, row) => {
          if (err) {
            reject(err) // Reject the promise if there's an error
          } else {
            resolve(row) // Resolve with the query result
          }
        }
      )
    })

    // If a user exists, return their details
    if (existingUser) {
      return { exists: true, user: existingUser }
    } else {
      return { exists: false }
    }
  } catch (error) {
    console.error('Error checking user:', error)
    throw error // Throw the error to the renderer process
  }
})

// session object to store the current user session when logged in
let session = null

// Login handler
ipcMain.handle('login', async (_, credentials) => {
  try {
    // Query the database to check if the user exists
    const user = await new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [credentials.username, credentials.password],
        (err, row) => {
          if (err) {
            reject(err)
          } else {
            resolve(row)
          }
        }
      )
    })

    if (user) {
      // Create a session
      session = { userId: user.user_id, username: user.username }
      return { success: true, user: session }
    } else {
      return { success: false, message: 'Invalid username or password' }
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
})

// Logout handler
ipcMain.handle('logout', async () => {
  session = null // Clear the session
  return { success: true }
})

// Get session handler
ipcMain.handle('get-session', async () => {
  return session // Return the current session
})

// delete user by id if exist
ipcMain.handle('delete-user', async (_, userId) => {
  try {
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE user_id = ?', [userId], (err) => {
        if (err) {
          reject(err) // Reject the promise if there's an error
        } else {
          resolve() // Resolve if the query is successful
        }
      })
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error // Throw the error to the renderer process
  }
})

// update user if exist
ipcMain.handle('update-user', async (_, user) => {
  try {
    await new Promise((resolve, reject) => {
      db.run(
        'UPDATE users SET username = ?, phone = ?, password = ?, active = ? WHERE user_id = ?',
        [user.username, user.phone, user.password, user.active ? 1 : 0, user.user_id],
        (err) => {
          if (err) {
            reject(err) // Reject the promise if there's an error
          } else {
            resolve() // Resolve if the query is successful
          }
        }
      )
    })
    return { success: true }
  } catch (error) {
    console.error('Error updating user:', error)
    throw error // Throw the error to the renderer process
  }
})

// =====================================================

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
