import "./Tabs.scss";
import { Component, Suspense } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";

export default class Tabs extends Component <any, any>{
  constructor(props) {
    super(props);
    this.state = {
        default: props.config.default,
        title: props.config.title,
        tabs: props.config.tabs,
    };
  }

  render() {
    return (
      <>
      <div className={this.state.title+"-tabs` tabs"} key={this.state.title+"-key-tabs"}>
        <div className={this.state.title+'-tab-buttons tab-links'} key={this.state.title+"-key-tab-container"}>
        {
            this.state.tabs.map((e, x) => {
              if(!e.hasOwnProperty("hidden") || e.hidden) return (
                <NavLink to={e.path} key={this.state.title+"-link-" + e.name}>
                <i className="material-icons" key={this.state.title+"-tab-icon-route-" + x}>{e.icon}</i>
                {<p key={this.state.title+"-tab-Link-" + x}>{e.name}</p>}
                </NavLink>)
            })
        }
        </div>
        <div className={"tabs-outlet "+this.state.title+`-tabs-outlet`} key={this.state.title+"-key-tab-outlet"}>
          <Suspense>
            <Routes>
            {
                this.state.tabs.map((e, x) =>
                <Route key={`${this.state.title}-tab-route-${x}`} path={e.path} element={<e.element />}/> )
            }
            <Route path="/" element={<Navigate to={this.state.default} replace />}/>
            </Routes>
          </Suspense>
        </div>
      </div>
      </>
    );
  }
}