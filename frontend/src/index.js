import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Produits from "views/Produits";
import MesReclamation from "views/mes-réclamations";
import DétailsReclamtion from "views/détails-réclamations";
import AddReclamation from "views/AddReclamation";
import Service from "views/Service";
import RépReclamation from "views/reponse-réclamations";
import Chat from "views/Chat";
import DétailsProd from "views/DétailsProd";
import DétailsService from "views/DétailsService";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/services" exact component={Service} />
      <Route path="/mes-réclamations" exact component={MesReclamation} />
      <Route path="/réponse-réclamations" exact component={RépReclamation} />
      <Route path="/détails-réclamations" exact component={DétailsReclamtion} />
      <Route path="/Envoyer-réclamation" exact component={AddReclamation} />
      <Route path="/produits" exact component={Produits} />
      <Route path="/détails-produit" exact component={DétailsProd} />
      <Route path="/détails-service" exact component={DétailsService} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
