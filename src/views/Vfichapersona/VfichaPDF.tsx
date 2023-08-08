import { Card } from "primereact/card";
import { Fieldset } from "primereact/fieldset";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import cardHeader from "../../shared/CardHeader";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { Divider } from "primereact/divider";
import { Ivficahapersona} from '../../interfaces/Primary/Ivfichapersona';
import { VfichapersonaService } from '../../services/VfichapersonaService'
import swal from 'sweetalert';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

function VfichaPDF() {
    const [habi1, sethabi1] = useState<Ivficahapersona[]>([]);
    const vfichapersonaService = new VfichapersonaService();




    const [pdfContent, setPdfContent] = useState<React.ReactNode | null>(null);


    useEffect(() => {
        vfichapersonaService.getAll()
        
            .then((data) => {
                console.log("Data fetched from API:", data);
                console.log("Datos obtenidos: ", vfichapersonaService.getAll());
                sethabi1(data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });

    }, []);



    const generatePdfContent = () => {

        const filteredData = habi1.filter((ficha) => ficha.id_persona === 1);
        
        console.log("Filtered Data:", filteredData);


        const ficedula = habi1.map((ficha) => ficha.carga_cedula);
        const fiedad = habi1.map((ficha) => ficha.carga_edad);
        const ficargo = habi1.map((ficha) => ficha.con_cargo);
        const fiperidodo = habi1.map((ficha) => ficha.ho_periodo);


        return { cedula: ficedula, edad: fiedad, cargo: ficargo, periodo: fiperidodo };

    }

    const handleGeneratePDF = () => {
        const { cedula, edad, cargo, periodo } = generatePdfContent();


        const styles = StyleSheet.create({
            page: {
                padding: 20,
            },
            margin: {
                borderWidth: 1, // Ancho del borde
                borderColor: 'black', // Color del borde
                padding: 20, // Espacio dentro del margen para el contenido
            },
            title1: {
                fontSize: 22,
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
                color: 'black',
            },
            title: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
                color: 'red',
            },
            subtitle: {
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 10,
                color: 'blue',

            },
            description: {
                fontSize: 12,
                marginBottom: 5,
            },
            tableContainer: {
                marginTop: 10,
                display: 'flex',
            },
            tableRow: {
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#000',
                alignItems: 'center',
            },
            tableCell: {
                fontSize: 15,
                padding: 5,
                flex: 1,
                textAlign: 'center',
                color: 'blue',
            },
            tableCont: {
                fontSize: 12,
                padding: 5,
                flex: 1,
                textAlign: 'center',

            },
        });

        const MyDocument = () => (
            <Document>
                <Page style={styles.page}>
                    <View>
                        <Text style={styles.title1}>Hoja de Vida</Text>
                        <Text style={styles.title1}>ISTA</Text>
                    </View>

                    {/* Table Header */}
                    <View style={styles.tableContainer}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Cedula</Text>
                            <Text style={styles.tableCell}>Edad</Text>
                            <Text style={styles.tableCell}>Cargo</Text>
                            <Text style={styles.tableCell}>Periodo</Text>
                        </View>
                    </View>

                    {/* Table Data */}
                    {cedula.map((ced, index) => (
                        <View key={index} style={styles.tableContainer}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCont}>{ced}</Text>
                                <Text style={styles.tableCont}>{edad[index].toString()}</Text>
                                <Text style={styles.tableCont}>{cargo[index]}</Text>
                                <Text style={styles.tableCont}>{periodo[index]}</Text>
                            </View>
                        </View>
                    ))}
                </Page>
            </Document>
        );

        // Generar el blob del PDF y descargarlo
        const pdfBlob = <PDFDownloadLink document={<MyDocument />} fileName="habilidades.pdf">
            {({ blob, url, loading, error }) =>
                loading ? 'Generando PDF...' : 'Descargar PDF'
            }
        </PDFDownloadLink>;

        // Mostrar el enlace para descargar el PDF
        setPdfContent(pdfBlob);
    };

    return (
        <div
            className="flex align-items-center justify-content-center w-auto min-w-min">
            <Button
                type="button"
                className="w-30 text-3xl min-w-min"
                label="Generar pdf"
                style={{
                    background: '#ff0000',
                    borderRadius: '20%',
                    fontSize: '30px',
                    width: '70px',
                    height: '50px',
                    color: "black",
                    justifyContent: 'center'
                }}
                onClick={handleGeneratePDF}
            />
            {pdfContent}

        </div>

    )


}
export default VfichaPDF;