import './App.scss';
import Layout from './Layout';

import { useRoutes } from "react-router-dom";
import { NavigationService } from "@serv/Navigation";

const Routing:any = await NavigationService.routes();

export default () => {
  return useRoutes([{
    element: <Layout routes={Routing}/>,
    children: Routing.map(e => { return { path: `/${e.path}/*`, element: <e.element /> } }),
  }])
}