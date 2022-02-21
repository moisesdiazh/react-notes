import React from 'react'
import {Provider} from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

export const JournalApp = () => {
    return (
        // colocamos nuestro provider y le pasamos el store
        <Provider store={store}> 

            <AppRouter />
        </Provider>
    )
}
