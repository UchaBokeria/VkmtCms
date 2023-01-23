import { Component } from "react";
import { Outlet, NavLink } from "react-router-dom";

import { Auth } from "@serv/Auth";
import Logo from "$assets/Images/logo.svg";
import { Loading } from "@comp/Loading/Loading";

export default class Layout extends Component <any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            routes: props.routes,
            Loading: true,
            Toggle: true,
        };
    }

    Links = () => {
        return this.state.routes.map((e, x) => {
            if(!e.hidden)  return (
            <NavLink to={`${e.path}`} key={`link-${x}`} onClick={()=> this.setState({Loading: true})}>
                <i className="material-icons" key={`icon-route-${x}`}>{e.icon}</i>
                {this.state.Toggle && <p key={`routerLink-${x}`}>{e.name}</p>}
            </NavLink>);
        });
    };

    Loading = () => {
        setTimeout(()=> this.setState({Loading: false}), 2000)
        return (
            // @ts-ignore
            this.state.Loading && <div className="Loading-wrap"><Loading fullwindow="true" type="spinningBubbles" /></div>
        );
    }

    ToggleButton = () => {
        return (
        <div >
            <i onClick={(e) => {
                this.setState({ Toggle: !this.state.Toggle })
                localStorage.setItem("ToggleMenu", this.state.Toggle)
            }} className="material-icons ` ${this.state.Toggle ? 'toggle':'aqua'}`" >
                {this.state.Toggle ? "close" : "menu"}
            </i>
        </div>);
    };

    render() {
        return (
        <div className="Layout">
            {this.Loading()}
            <menu className={ this.state.Toggle ? 'maximize' : 'minimize' }>
                {   this.state.Toggle && 
                    <div className="logo">
                        <NavLink to={"/"} onClick={()=> this.setState({Loading: true})}><img src={Logo} alt="L"/></NavLink>
                    </div>
                }
                {/* {this.ToggleButton()} */}
                <div className="links-wrapper">{this.Links()}</div>

                <NavLink to="/signout" key={0} onClick={e=> Auth.Logout()} className="sign-out">
                    <i className="material-icons-outlined" key="icon-route-0">logout</i>
                    {this.state.Toggle && <p key="routerLink-0" className="sign-out">Sign out</p>}
                </NavLink>
            </menu>

            <div className={`content ${this.state.Toggle ? "max" : "min"}`}> <Outlet /> </div>
        </div>);
    }
}