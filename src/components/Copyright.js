import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Copyright() {
    const date = new Date().getFullYear();
    return (
        <Container>
            <Typography variant="caption">Copyright © Stone Franklin {date}</Typography>
        </Container>
    );
}

export default Copyright;