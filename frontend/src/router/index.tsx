import { createBrowserRouter } from 'react-router-dom'
import MainView from '../view/main.view';
import HistoryView from '../view/HistoryView/index.view';
import RequestView from '../view/Request.view';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainView />,
        children: [
            {
                path: 'ride',
                element: <RequestView />
            },
            {
                path: 'history/:customer_id',
                element: <HistoryView />
            }
        ]
    }
]);

export default router;