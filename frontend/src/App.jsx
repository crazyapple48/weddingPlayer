import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from './dashboard'
import Login from './login'
import 'bootstrap/dist/css/bootstrap.min.css'


const code = new URLSearchParams(window.location.search).get('code')

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {code ? <Dashboard code={code} /> : <Login />}
    </QueryClientProvider>
)}

export default App
