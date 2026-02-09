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
    path: '/my_portfolio/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/my_portfolio/about',
        element: <AboutPage />,
      },
      {
        path: '/my_portfolio/contact',
        element: <ContactPage/>
      },
      {
        path: '/my_portfolio/projects',
        element: <ProjectPage/>
      },
      {
        path: '/my_portfolio/resume',
        element: <ResumePage/>
      },
      {
        path: '/my_portfolio/services',
        element: <ServicesPage/>
      }
    ],
  },
]);