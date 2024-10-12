import React, { Component } from 'react';
import Swal from 'sweetalert2';

export default class SA2E extends Component {
    componentDidMount() {
        this.showError('Test error message');
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

    render() {
        return <>Hello World!</>
    }
}