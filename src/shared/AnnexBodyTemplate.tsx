import {Button} from "primereact/button";
import {decoder} from "../services/functions/decoder";

export function annexBodyTemplate(fileContent: string, fileName: string) {

    const base64File = fileContent as string;
    return base64File ? (
        <Button type="button"
                icon="pi pi-file-pdf"
                severity="danger"
                rounded
                onClick={() => decoder(base64File, fileName)}
                data-pr-tooltip="PDF">
        </Button>
    ) : (<span>Sin Anexo</span>)

}
