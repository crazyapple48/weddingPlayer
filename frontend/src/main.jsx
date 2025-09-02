import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          console.warn("React Query caught 404, clearing deviceId");
          sessionStorage.removeItem("deviceId");
          setDeviceId(null);
        }
      }
    },
    mutations: {
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          console.warn("React Query caught 404 in mutation, clearing deviceId");
          sessionStorage.removeItem("deviceId");
          setDeviceId(null);
        }
      }
    }
  }
})


createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
)
