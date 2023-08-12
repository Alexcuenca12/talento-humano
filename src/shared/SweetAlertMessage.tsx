import Swal from "sweetalert2";

export const showSucessInfoMessage = (message: string, icon: 'success' | 'info' = 'success') => {
    Swal.fire({
        icon: icon,
        text: message,
        showConfirmButton: false,
        timer: 1500
    });
}

export const showErrorMessage = (message: string) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    })
}

export const confirmDeleteActionDialog = (onDelete: () => Promise<void>) => {
    Swal.fire({
        title: 'Confirmación',
        text: '¿Estás seguro de eliminar el elemento seleccionado?',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            onDelete().then(() => {
                showSucessInfoMessage('Registro Eliminado');
            }).catch((error) => {
                showErrorMessage(error.message)
            })
        }
    })
}



