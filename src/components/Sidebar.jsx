import React from 'react';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import {NavLink} from "react-router-dom";


export const Sidebar = ({classes, cities}) => {
    return (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {cities.map(city => (
                    <NavLink to={`/city/${city.id}`}>
                        <ListItem button key={city.id}>
                            <ListItemIcon><LocationCityIcon/></ListItemIcon>
                            <ListItemText primary={city.name}/>
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </div>
    )
};


