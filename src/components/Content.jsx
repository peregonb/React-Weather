import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {API} from "../api/api";
import {createUseStyles} from 'react-jss'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import StickyHeadTable from "./StickyHeadTable";

const useStyles = createUseStyles({
    root: {
        marginBottom: 30
    },
    img: {
        height: 100,
        width: 100
    },
    name: {
        textAlign: 'center'
    },
    wrap: {
        display: 'flex',
        flexDirection: 'column'
    },
    value: {
        fontSize: 70
    },
    temperature: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
    },
    '@media (max-width: 420px)': {
        value: {
            fontSize: 50
        },
        img: {
            height: 80,
            width: 80
        },
    }

});

const Content = (props) => {
    const classes = useStyles();
    const cityId = (() => props.match.params.id ? props.match.params.id : 703448)();
    let [apiCity, setApiCity] = useState(null);
    let [apiWeekly, setApiWeekly] = useState(null);

    useEffect(() => {
        (async () => {
            let cityResponse = await API.getCity(cityId);
            setApiCity(cityResponse);

            let weeklyResponse = await API.getWeeklyWeatherFromCity(cityId);
            setApiWeekly(weeklyResponse);
        })();
    }, [cityId]);


    return (
        apiCity ? (
                <>
                    <Card variant="outlined" className={classes.root}>
                        <CardContent className={classes.wrap}>
                            <Typography variant="h4" className={classes.name}>
                                {apiCity.name}
                            </Typography>
                            <div className={classes.temperature}>
                                <div className={classes.value}>
                                    {Math.round(apiCity.main.temp)}°
                                </div>
                                <img className={classes.img}
                                     src={`http://openweathermap.org/img/wn/${apiCity.weather[0].icon}@2x.png`} alt=""/>
                            </div>
                        </CardContent>
                    </Card>
                    <StickyHeadTable apiWeekly={apiWeekly}/>
                </>
            )
            :
            <div>Fetching data from Api, please wait ...</div>
    )
};

export const ContentContainer = withRouter(Content);






