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
import { IHabilidadesData } from '../../interfaces/Primary/IHabilidades';
import { HabilidadesService } from '../../services/HabilidadesService'
import { IContratoData } from '../../interfaces/Primary/IContrato';
import { ContratoService } from '../../services/ContratoService'
import swal from 'sweetalert';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

function HabilidadesPDF() {
    const [habi1, sethabi1] = useState<IHabilidadesData[]>([]);
    const habilidadService = new HabilidadesService();

    const [con1, setcon1] = useState<IContratoData[]>([]);
    const contratoService = new ContratoService();



    const [pdfContent, setPdfContent] = useState<React.ReactNode | null>(null);


    useEffect(() => {
        habilidadService.getAll()
            .then((data) => {
                console.log("Data fetched from API:", data);
                sethabi1(data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });

        contratoService.getAll()
            .then((datac) => {
                console.log("Data fetched from API:", datac);
                setcon1(datac);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
    }, []);



    const generatePdfContent = () => {
        const habilidadesDescriptions = habi1.map((habilidad) => habilidad.descripcion);
        const contratosCargos = con1.map((contrato) => contrato.cargo);
        const contratosAnio = con1.map((contrato) => contrato.anio_duracion);
        return { habilidades: habilidadesDescriptions, contratos: contratosCargos, contratoa: contratosAnio };
    }

    const handleGeneratePDF = () => {
        const { habilidades, contratos, contratoa } = generatePdfContent();


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
                    <View style={styles.margin}>
                        <Text style={styles.title1}>HOJA DE VIDA</Text>
                        <Text style={styles.title}>Habilidades</Text>
                        <Text style={styles.subtitle}>Descripcion</Text>
                        <br />
                        {habilidades.map((descripcion, index) => (
                            <View key={index}>
                                <Text style={styles.description}>{descripcion}</Text>
                            </View>
                        ))}
                        <Text style={styles.title}>Contratos</Text>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>Cargo</Text>
                                <Text style={styles.tableCell}>Años</Text>
                            </View>
                            {/* Iterar simultáneamente por ambos arrays */}
                            {contratos.map((cargo, indexc) => (
                                <View style={styles.tableRow} key={indexc}>
                                    <Text style={styles.tableCont}>{cargo}</Text>
                                    <Text style={styles.tableCont}>{contratoa[indexc]}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
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
export default HabilidadesPDF;