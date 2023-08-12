import React from "react";
import {Button} from "primereact/button";

interface RowActionsProps {
    onEdit: () => void;
    onRemove: () => void;
}

function RowActionTemplate({onEdit, onRemove}: RowActionsProps) {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={onEdit}/>
            <Button
                icon="pi pi-trash"
                rounded
                outlined
                severity="danger"
                className="mr-2"
                onClick={onRemove}
            />

        </React.Fragment>
    )
}

export default RowActionTemplate;
