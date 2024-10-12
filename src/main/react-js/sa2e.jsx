import React, { Component } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import Swal from 'sweetalert2';

export default class SA2E extends Component {
    constructor(props) {
        super(props);

        this.onClickShowError = this.onClickShowError.bind(this);
    }

    async showError(message) {
        try {
            const rs = await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: message,
                backdrop: true
            });

            console.error('sweetalert2 finished', rs);
        } catch (e) {
            console.error('sweetalert2 error', e);
        }
    }

    onClickShowError() {
        this.showError('Test error message');
    }

    render() {
        return <>
        <Dialog open={true}>
            <DialogTitle>Error test</DialogTitle>
            <DialogContent>
                Just testing sweetalert2.fire error message
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={this.onClickShowError}>Show Error</Button>
            </DialogActions>
        </Dialog>
        </>
    }
}