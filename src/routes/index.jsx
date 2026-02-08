import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/AboutMe';
import NotFoundPage from '@/pages/NotFound';
import ContactPage from '@/pages/ContactMe'
import ProjectPage from '@/pages/Projects'
import ResumePage from '@/pages/Resume'
import ServicesPage from '@/pages/Services'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage/>
      },
      {
        path: 'projects',
        element: <ProjectPage/>
      },
      {
        path: 'resume',
        element: <ResumePage/>
      },
      {
        path: 'services',
        element: <ServicesPage/>
      }
    ],
  },
]);