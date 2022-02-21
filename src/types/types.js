//aqui colocamos los types o tipos de acciones

export const types = {

    login: '[Auth] Login',
    logout: '[Auth] Logout',

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    notesAddNew: '[Notes] New note', // para añadir
    notesActive: '[Notes] Set active note', //para ver la nota activa
    notesLoad: '[Notes] Load notes', //para cargar todas las notas
    notesUpdated: '[Notes] Updated note', //para actualizar las notas
    notesFileUrl: '[Notes] Updated image url', //para subir el archivo
    notesDelete: '[Notes] Delete note', //eliminando la nota
    notesLogoutCleaning: '[Notes] Logout Cleaning' //purgamos toda la info de las notas de usuario

}