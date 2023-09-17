import * as ExcelJS from 'exceljs';
import saveAs from "file-saver";
import {IExcelReportParams} from "../../interfaces/Secondary/IExcelReportParams";

export const excelExport = async (params: IExcelReportParams) => {
    // create a workbook
    const workbook = new ExcelJS.Workbook();

    // add a worksheet
    const worksheet = workbook.addWorksheet(params.reportName,
        {
            properties: {tabColor: {argb: '177B487B'}},
        });

    // columns
    const columns = params.headerItems

    worksheet.mergeCells("A2:I2");
    worksheet.getRow(2).height = 70;
    worksheet.getRow(2).alignment = {vertical: 'middle', horizontal: 'center'}

    const customCell = worksheet.getCell("A2");
    customCell.font = {
        name: "Franklin Gothic Book",
        family: 4,
        size: 20,
        underline: true,
        bold: true
    };

    customCell.value = params.reportName;

    // insert logo
    const base64LogoContent = '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';
    const logo = workbook.addImage({
        base64: base64LogoContent,
        extension: 'png'
    });

    /* worksheet.addImage(logo, {
        tl: { col: 6, row: 2 }, // top-left cell
        ext: { width: 200, height: 100 }, // image dimensions
    });*/

    worksheet.addImage(logo, 'G2:I2');

    const headerRow = worksheet.getRow(4);
    headerRow.height = 20;
    headerRow.font = {name: "Franklin Gothic Book", bold: true, color: {argb: 'FFFFFFFF'}};
    headerRow.alignment = {horizontal: "center", vertical: "middle"}
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: 'FF0C3255'}
    }
    headerRow.border = {
        top: {style: 'thin', color: {argb: 'FFFCBF64'}},
        left: {style: 'thin', color: {argb: 'FFFCBF64'}},
        bottom: {style: 'thin', color: {argb: 'FFFCBF64'}},
        right: {style: 'thin', color: {argb: 'FFFCBF64'}},
    }

    for (let i = 0; i < columns.length; i++) {
        const currentColumnWidth = columns[i].width;
        worksheet.getColumn(i + 1).width = currentColumnWidth !== undefined ? currentColumnWidth : 20;
        const cell = headerRow.getCell(i + 1);
        cell.value = columns[i].header;
    }

    // set auto filer
    worksheet.autoFilter = {
        from: 'A4',
        to: {
            row: 4,
            column: columns.length
        }
    }

    worksheet.views = [{state: "frozen", ySplit: 4}];

    // insert data
    for (let i = 0; i < params.rowData.length; i++) {
        const currentCount = i + 1
        const dataRow = worksheet.getRow(4 + currentCount);
        dataRow.outlineLevel = 1;

        dataRow.values = Object.values(params.rowData[i]);
        dataRow.font = {
            name: "Franklin Gothic Book",
        }
        dataRow.border = {
            top: {style: 'thin', color: {argb: 'FFFCBF64'}},
            left: {style: 'thin', color: {argb: 'FFFCBF64'}},
            bottom: {style: 'thin', color: {argb: 'FFFCBF64'}},
            right: {style: 'thin', color: {argb: 'FFFCBF64'}},
        }
    }


    workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
            new Blob([buffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),
            `Reporte - ${params.reportName}`
        )
    })
}
