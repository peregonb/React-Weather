import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    {id: 'time', label: 'Время', minWidth: 100},
    {id: 'type', label: 'Тип погоды', minWidth: 250},
    {id: 'temperature', label: 'Температура', minWidth: 100},
    {id: 'feelsLike', label: 'Чувствуется как', minWidth: 140},
    {id: 'speed', label: 'Скорость ветра', minWidth: 140},
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 'calc(100vw - 288px)'
    },
    container: {
        maxHeight: 440,
    },
    span: {
        float: 'left'
    },
    img: {
        marginRight: 10,
        float: 'left'
    },
    '@media (max-width: 600px)': {
        root: {
            maxWidth: 'calc(100vw - 48px)'
        },
        pagi: {
            paddingLeft: 15,
            paddingRight: 15
        }
    }
});

export default function StickyHeadTable({apiWeekly}) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        apiWeekly ? (
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {apiWeekly.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={Date.now()} key={row.code}>
                                            <TableCell key={'time'}>
                                                {row.dt_txt.slice(0, -3)}
                                            </TableCell>
                                            <TableCell className={classes.row} key={'type'}>
                                                <img height={30} width={30} className={classes.img}
                                                     src={`http://openweathermap.org/img/wn/${row.weather[0].icon}.png`}
                                                     alt=""/>
                                                <span className={classes.span}>{row.weather[0].description}</span>
                                            </TableCell>
                                            <TableCell key={'temperature'}>
                                                {Math.round(row.main.temp)}°
                                            </TableCell>
                                            <TableCell key={'feelsLike'}>
                                                {Math.round(row.main.feels_like)}°
                                            </TableCell>
                                            <TableCell key={'speed'}>
                                                {row.wind.speed} м/с
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[4, 10, 20]}
                        component="div"
                        count={apiWeekly.list.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelRowsPerPage={"Страниц:"}
                        classes={classes.pagi}
                    />
                </Paper>) :
            <div>Fetching data from Api, please wait ...</div>
    );
}