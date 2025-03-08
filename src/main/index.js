import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/logo.png?asset'
import query from './database' // Import the database module
import bcrypt from 'bcryptjs'
import Store from 'electron-store'
// import Cookies from 'js-cookie'

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
// get users

ipcMain.handle('get-users', async () => {
  try {
    const users = await query('SELECT * FROM users')
    return users
  } catch (error) {
    console.error('Failed to get users:', error)
  }
})

// check user
ipcMain.handle('check-user', async (_, user) => {
  try {
    const sql = `
      SELECT username, email, phone FROM users 
      WHERE username = ? OR email = ? OR phone = ?
    `
    const results = await query(sql, [user.username, user.email, user.phone])

    if (results.length > 0) {
      const duplicateFields = []
      results.forEach((row) => {
        if (row.username === user.username) duplicateFields.push('username')
        if (row.email === user.email) duplicateFields.push('email')
        if (row.phone === user.phone) duplicateFields.push('phone')
      })

      return { exists: true, duplicateFields }
    }

    return { exists: false }
  } catch (error) {
    console.error('Error checking user:', error)
    throw error
  }
})

// create user
ipcMain.handle('create-user', async (_, user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const sql = `
      INSERT INTO users (username, password, phone, email, account_type, is_active, signup_date)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `
    const result = await query(sql, [
      user.username,
      hashedPassword,
      user.phone,
      user.email,
      user.account_type,
      user.is_active || true // Default to true if not provided
    ])

    if (result.affectedRows === 1) {
      return { success: true }
    } else {
      return { success: false }
    }
  } catch (error) {
    console.error('Failed to create user:', error)
    throw error
  }
})

// delete user
ipcMain.handle('delete-user', async (_, userId) => {
  try {
    const sql = 'DELETE FROM users WHERE user_id = ?'
    const result = await query(sql, [userId])

    if (result.affectedRows === 1) {
      return { success: true, message: 'User deleted successfully' }
    } else {
      return { success: false, error: 'User not found' }
    }
  } catch (error) {
    console.error('Failed to delete user:', error)
    throw error
  }
})

// update user
ipcMain.handle('update-user', async (_, userData) => {
  try {
    const { userId, ...user } = userData

    // Hash the password only if it's provided
    let hashedPassword = user.password
    if (user.password) {
      hashedPassword = await bcrypt.hash(user.password, 10)
    }

    const sql = `
      UPDATE users 
      SET username = ?, email = ?, phone = ?, password = ?, account_type = ?, is_active = ?
      WHERE user_id = ?
    `
    const result = await query(sql, [
      user.username,
      user.email,
      user.phone,
      hashedPassword,
      user.account_type,
      user.is_active,
      userId
    ])

    if (result.affectedRows === 1) {
      return { success: true, message: 'User updated successfully' }
    } else {
      return { success: false, error: 'User not found' }
    }
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
})

// login user & session creation
ipcMain.handle('login', async (_, credentials) => {
  try {
    const [user] = await query('SELECT * FROM users WHERE username = ? AND is_active = 1', [
      credentials.username
    ])

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password)
    if (!isMatch) {
      return { success: false, error: 'Invalid password' }
    }

    // Create session data
    const session = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      account_type: user.account_type
    }

    // Save session data using electron-store
    const store = new Store()
    store.set('session', session)

    return { success: true, session }
  } catch (error) {
    console.error('Failed to login:', error)
    return { success: false, error: 'Login failed. Please try again later.' }
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
