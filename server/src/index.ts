import app from './app'
import login from './controller/login'

const App = new app (
    [new login()], 5000
)

App.listen()
