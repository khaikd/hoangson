import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/css/icons.css';
import './assets/css/style.css';
import './App.css';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import About from './views/About';
import Cruise from './views/cruises/Cruise';
import Room from './views/rooms/Room';
import Profile from './views/Profile';
import Category from './views/categories/Category';
import Material from './views/materials/Material';
import Warehouse from './views/warehouses/Warehouse';
import Unit from './views/units/Unit';
import Depot from './views/depots/Depot';
import Export from './views/exports/Export';
import User from './views/users/User';
import Construction from './views/constructions/Construction';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './components/routing/ProtectedRoute';
import PostContextProvider from './contexts/PostContext';
import CruiseContextProvider from './contexts/CruiseContext';
import RoomContextProvider from './contexts/RoomContext';
import CategoryContextProvider from './contexts/CategoryContext';
import MaterialContextProvider from './contexts/MaterialContext';
import ConstructionContextProvider from './contexts/ConstructionContext';
import WarehouseContextProvider from './contexts/WarehouseContext';
import UnitContextProvider from './contexts/UnitContext';
import DepotContextProvider from './contexts/DepotContext';
import ExportContextProvider from './contexts/ExportContext';

function App() {
  return (
    <AuthContextProvider>
      <ConstructionContextProvider>
        <WarehouseContextProvider>
          <MaterialContextProvider>
            <CategoryContextProvider>
              <CruiseContextProvider>
                <RoomContextProvider>
                  <UnitContextProvider>
                    <PostContextProvider>
                      <DepotContextProvider>
                        <ExportContextProvider>
                          <Router>
                            <Switch>
                              <Route exact path='/' component={Landing} />
                              <Route exact path='/login' render={ props => <Auth { ...props } authRoute='login' /> } />
                              <Route exact path='/register' render={ props => <Auth { ...props } authRoute='register' /> } />
                              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
                              <ProtectedRoute exact path='/about' component={About} />
                              <ProtectedRoute exact path='/rooms' component={Room} />
                              <ProtectedRoute exact path='/cruises' component={Cruise} />
                              <ProtectedRoute exact path='/profile/:id' component={Profile} />
                              <ProtectedRoute exact path='/categories' component={Category} />
                              <ProtectedRoute exact path='/materials' component={Material} />
                              <ProtectedRoute exact path='/constructions' component={Construction} />
                              <ProtectedRoute exact path='/warehouses' component={Warehouse} />
                              <ProtectedRoute exact path='/units' component={Unit} />
                              <ProtectedRoute exact path='/depots' component={Depot} />
                              <ProtectedRoute exact path='/exports' component={Export} />
                              <ProtectedRoute exact path='/users' component={User} />
                            </Switch>
                          </Router>
                        </ExportContextProvider>
                      </DepotContextProvider>
                    </PostContextProvider>
                  </UnitContextProvider>
                </RoomContextProvider>
              </CruiseContextProvider>
            </CategoryContextProvider>
          </MaterialContextProvider>
        </WarehouseContextProvider>
      </ConstructionContextProvider>
    </AuthContextProvider>
  );
}

export default App;
