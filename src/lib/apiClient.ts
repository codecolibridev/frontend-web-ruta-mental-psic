import axios from 'axios';

const apiClient = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
     timeout: 10000,
});

// interceptor for authentication ( in future )
apiClient.interceptors.request.use(
     (config) => {
          // here we can add auth token to headers

          return config;
     },
     (error) => Promise.reject(error)
);

// interceptor for responses (generic error handling)
apiClient.interceptors.response.use(
     (response) => {
          return response;
     },
     (error) => {
          // handle errors globally
          return Promise.reject(error);
     }
);

export { apiClient };
