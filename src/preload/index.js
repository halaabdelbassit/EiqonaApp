import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  getUsers: () => ipcRenderer.invoke('get-users'), // Expose the getUsers method
  addUser: (user) => ipcRenderer.invoke('add-user', user),
  checkUser: (user) => ipcRenderer.invoke('check-user', user),
  // authUser: (user) => ipcRenderer.invoke('auth-user', user),
  deleteUser: (userId) => ipcRenderer.invoke('delete-user', userId),
  updateUser: (userId, userData) =>
    ipcRenderer.invoke('update-user', { user_id: userId, ...userData })
}

// Use `contextBridge` APIs to expose Electron APIs to the renderer
try {
  contextBridge.exposeInMainWorld('api', api) // Expose the api object
} catch (error) {
  console.error('Failed to expose APIs:', error)
}
