import {Button} from "primereact/button";
import React from "react";
import * as XLSX from 'xlsx';

interface reportXLSX {
    reportName: string,
    reportData: any [],
    columnNames: string []
}
export function ReportBar({reportName, reportData, columnNames}: reportXLSX) {

    const exportExcel = () => {
        console.log(reportData)

        let rows: any[][] = [];

        reportData.forEach((data) => {
            const mappedData = Object.keys(data).map((attribute) => data[attribute]);
            rows.push(mappedData);
        });


        // add style to the table header
        const headerStyle = {
            font: {bold: true},
            alignment: {horizontal: 'center'}
        }

        // add style to the table cells
        const cellStyle = {
            font: {
                sz: "11",
                bold: true,
            },
            alignment: {
                vertical: "middle",
                horizontal: "center",
                wrapText: true,
            },
            border: {
                top: {style: "thin", color: {rgb: "125085"}},
                bottom: {style: "thin", color: {rgb: "125085"}},
                left: {style: "thin", color: {rgb: "125085"}},
                right: {style: "thin", color: {rgb: "125085"}}
            }
        }

        const data = [columnNames, ...rows];
        // create a new sheet
        const workSheet = XLSX.utils.aoa_to_sheet(
            [
                [{t: 's', v: reportName, s: {font: {bold: true}, alignment: {horizontal: 'center'}}}],
                ...data
            ]
        )

        // merge cell to display the header
        // apply changes
        workSheet['!merges'] = [
            {s: {r: 0, c: 0}, e: {r: 0, c: 10}},
        ];
        workSheet['!cols'] = [{wch: 14}, {width: 14}, {width: 14}, {width: 25}, {width: 18}, {width: 18}, {width: 25}, {width: 18}, {width: 25}, {width: 14}, {width: 14}];

        const headerStyleSetUp = {...cellStyle, ...headerStyle};

        // create a work book
        const workBook = XLSX.utils.book_new();

        // add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workBook, workSheet, "Registros");

        // transform the workbook to an Excel file
        const excelFile = XLSX.write(workBook, {bookType: 'xlsx', type: 'array'});

        // create a blob with the Excel file
        const blob = new Blob([excelFile], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

        // create a URL to the blob object
        const fileURL = URL.createObjectURL(blob);

        // create a temporal link and activate it automatically
        const temporalLink = document.createElement('a');
        temporalLink.href = fileURL;
        temporalLink.download = `Reporte ${reportName}`;
        temporalLink.click();

        // free the URL object
        URL.revokeObjectURL(fileURL);
    }
    return (
        <div className="flex align-items-center justify-content-end pt-5">
            <Button type="button"
                    icon="pi pi-file-excel"
                    severity="success"
                    rounded
                    data-pr-tooltip="XLS"
                    onClick={() => exportExcel()}
            />
        </div>
    )
}
