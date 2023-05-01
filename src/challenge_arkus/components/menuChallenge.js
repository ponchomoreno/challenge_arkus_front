import React from 'react';
import { Icon } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import { CardActionArea } from '@mui/material';
import './menuChallenge.css';
import * as route from '../../routesChallenge/routes';

const MenuChallenge = () => {


    /*  useEffect(() => {
         dispatch(getUsersChallenge())
     }, []) */

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className='containerMenu'>
                <div><span className='fontStyleTitle'>Please choose an option</span></div>
                <div className='optionsMenu'>
                    <Link to={route.USERS_VIEW} style={{ textDecoration: 'none', color: 'black' }}>
                        <Card sx={{ width: 200, height: 150 }} className='cardStyle'>
                            <CardActionArea >
                                <CardContent>
                                    <Icon
                                        size="large"
                                        sx={{ width: '100%', height: 50 }}
                                    >
                                        <SentimentSatisfiedAltIcon sx={{ fontSize: 50 }} />
                                    </Icon>
                                    <Typography variant="h3" component="div">
                                        USERS
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    <Link to={route.ACCOUNTS_VIEW} style={{ textDecoration: 'none', color: 'black' }}>
                        <Card sx={{ width: 300, height: 150 }} style={{ marginRight: '1rem' }}>
                            <CardActionArea>
                                <CardContent>
                                    <Icon
                                        size="large"
                                        sx={{ width: '100%', height: 50 }}
                                    >
                                        <AccountBoxIcon sx={{ fontSize: 50 }} />
                                    </Icon>
                                    <Typography variant="h3" component="div">
                                        ACCOUNTS
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    <Link to={route.TEAMS_VIEW} style={{ textDecoration: 'none', color: 'black' }}>
                        <Card sx={{ width: 200, height: 150 }}>
                            <CardActionArea>
                                <CardContent>
                                    <Icon
                                        size="large"
                                        sx={{ width: '100%', height: 50 }}
                                    >
                                        <GroupsIcon sx={{ fontSize: 50 }} />
                                    </Icon>
                                    <Typography variant="h3" component="div">
                                        TEAMS
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MenuChallenge;