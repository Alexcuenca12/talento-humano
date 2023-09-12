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
import { FichaCombinada } from '../../interfaces/Primary/IFichaCombinada';
import { PersonaService } from '../../services/PersonaService'
import swal from 'sweetalert';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


function formatDate(dateString: string | undefined): string | null {
    if (!dateString) return null; // Manejar el caso en que no haya fecha
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null; // Verificar si la fecha es válida
    const formattedDate = date.toISOString().slice(0, 10); // Formatear la fecha como "YYYY-MM-DD"
    return formattedDate;
}
function PersonaCombinada({ personaId }: { personaId: number }) {

    const [pers1, setpers1] = useState<FichaCombinada>();
    const personaService = new PersonaService();
    const [pdfContent, setPdfContent] = useState<React.ReactNode | null>(null);

    type PdfData = {
        cedula: String
        nombres: String
        apellidos: String
        correo: String
        parroquia: String
        sector: String
        genero: String
        area_estudioCapacitacion: String
        intitucionCapacitacion: String
        eventoCapacitacion: String
        fechaiCapacitacion: string | null
        fechafCapacitacion: string | null
        celular: String
        telefono: String
        paisnacimiento: String
        paisresidencia: String
        edad: String
        estadocivil: String
        descripcionHabilidad: String
        actividadExperiencia: String
        areaExperiencia: String
        fechaiExperiencia: string | null
        fehcafExperiencia: string | null
        instiExperiencia: String
        areaestudio: String
    };


    useEffect(() => {
        personaService.getById(personaId)

            .then((data) => {
                console.log("Data fetched from API:", data);
                console.log("datos de personacombianda", personaService.getById(personaId))
                setpers1(data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });

    }, [personaId]);


    if (!pers1) {
        return <div>Cargando...</div>;
    }


    const generatePdfContent = (): PdfData => {
        const data = pers1; // Obtén el primer objeto de la matriz


        const areaEstudios = data.capacitaciones ? data.capacitaciones.map((capacitacion) => capacitacion.tipo_certicado).join('\n') : '';
        const instiEstudios = data.capacitaciones ? data.capacitaciones.map((capacitacion) => capacitacion.institucion).join('\n') : '';
        const eventoEstudios = data.capacitaciones ? data.capacitaciones.map((capacitacion) => capacitacion.tipo_evento).join('\n') : '';
        const finiEstudios = data.capacitaciones ? data.capacitaciones.map((capacitacion) => capacitacion.fecha_inicio).join('\n') : '';
        const ffinEstudios = data.capacitaciones ? data.capacitaciones.map((capacitacion) => capacitacion.fecha_fin).join('\n') : '';




        const descriHabi = data.habilidades ? data.habilidades.map((habilidad) => habilidad.descripcion).join('\n') : '';
        const actiExper = data.experiencias ? data.experiencias.map((experiencia) => experiencia.actividades).join('\n') : '';
        const areaExper = data.experiencias ? data.experiencias.map((experiencia) => experiencia.area_trabajo).join('\n') : '';
        const finiExper = data.experiencias ? data.experiencias.map((experiencia) => experiencia.fecha_inicio).join('\n') : '';
        const ffinExper = data.experiencias ? data.experiencias.map((experiencia) => experiencia.fecha_fin).join('\n') : '';
        const instExper = data.experiencias ? data.experiencias.map((experiencia) => experiencia.institucion).join('\n') : '';




        const area = data.instruccionformal ? data.instruccionformal.map((instruccion) => instruccion.institucion_educativa).join('\n') : '';

        console.log('Instrucción Formal - Datos:', pers1.instruccionformal);


        return {
            cedula: data.persona.ci_pasaporte,
            nombres: data.persona.nombres,
            apellidos: data.persona.apellidos,
            correo: data.persona.correo,
            parroquia: data.persona.parroquia_recidencial,
            sector: data.persona.sector,
            genero: data.persona.genero,
            area_estudioCapacitacion: areaEstudios,
            eventoCapacitacion: eventoEstudios,
            intitucionCapacitacion: instiEstudios,
            fechaiCapacitacion: formatDate(finiEstudios),
            fechafCapacitacion: formatDate(ffinEstudios),
            celular: data.persona.celular,
            telefono: data.persona.telefono,
            paisnacimiento: data.persona.pais_nacimiento,
            paisresidencia: data.persona.pais_residencia,
            edad: data.persona.edad,
            estadocivil: data.persona.estado_civil,
            descripcionHabilidad: descriHabi,
            actividadExperiencia: actiExper,
            areaExperiencia: areaExper,
            fechaiExperiencia: formatDate(finiExper),
            fehcafExperiencia: formatDate(ffinExper),
            instiExperiencia: instExper,
            areaestudio: area,

        };
    };


    const handleGeneratePDF = () => {
        const pdfData = generatePdfContent();

        console.log(pdfData)

        const styles = StyleSheet.create({
            page: {
                padding: 20,
            },
            margin: {
                borderWidth: 1,
                borderColor: 'black',
                padding: 20,
            },
            title: {
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
                color: 'black',
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
            section: {
                marginTop: 20,
                marginBottom: 20,
            },
            sectionTitle: {
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
                color: 'black',
            },
            sectionSubTitle: {
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 10,
                color: 'black',
            },
            sectionContent: {
                fontSize: 12,
                marginBottom: 5,
            },
            profileImage: {
                width: 100,
                height: 100,
                marginBottom: 10,
                alignSelf: 'center',
            },
            column: {
                flex: 1,
                marginLeft: 10,  // Ajusta este valor para controlar el espacio entre las columnas
            },
            verticalLine: {
                borderLeftWidth: 1,
                borderLeftColor: 'black',
                marginHorizontal: 10,  // Ajusta este valor para controlar el espacio a ambos lados de la línea
            },
            listContainer: {
                marginTop: 10,
            },
            listItem: {
                fontSize: 12,
                marginBottom: 5,
            },
            nameContainer: {
                backgroundColor: 'lightblue',
                textAlign: 'center',
                padding: 10,
                marginBottom: 10,
            },
            nameText: {
                fontSize: 24,
                fontWeight: 'bold',
                color: 'black',
            },
            horizontalLine: {
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                marginVertical: 5,
            },
            leftColumn: {
                flex: 1,
            },
            rightColumn: {
                flex: 1,
            },
        });

        const MyDocument = ({ data }: { data: PdfData }) => (
            <Document>
                <Page style={styles.page}>
                    <View style={styles.margin}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>{data.nombres} {data.apellidos}</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Datos</Text>
                        <View style={styles.horizontalLine}></View>
                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text style={styles.sectionContent}>{data.celular} , {data.telefono}</Text>
                                <Text style={styles.sectionContent}>{data.correo}</Text>
                                <Text style={styles.sectionContent}>{data.parroquia} , {data.sector} , {data.paisnacimiento}</Text>
                            </View>
                            <View style={styles.rightColumn}>
                                <Text style={styles.sectionContent}>{data.edad} años , {data.estadocivil}, {data.genero} , {data.paisresidencia}</Text>
                                <Text style={styles.sectionContent}>DNI: {data.cedula}</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
                        <View style={styles.horizontalLine}></View>
                        <Text style={styles.sectionSubTitle}>{data.areaExperiencia}</Text>
                        <Text style={styles.sectionContent}>{data.instiExperiencia}</Text>
                        <Text style={styles.sectionContent}>{data.fechaiExperiencia} - {data.fehcafExperiencia}</Text>
                        <Text style={styles.sectionContent}>{data.actividadExperiencia}</Text>

                        <Text style={styles.sectionTitle}>Estudios</Text>
                        <View style={styles.horizontalLine}></View>
                        <Text style={styles.sectionSubTitle}>{data.area_estudioCapacitacion}</Text>
                        <Text style={styles.sectionContent}>{data.intitucionCapacitacion}</Text>
                        <Text style={styles.sectionContent}>{data.eventoCapacitacion}</Text>
                        <Text style={styles.sectionContent}>{data.fechaiCapacitacion} - {data.fechafCapacitacion}</Text>

                        <Text style={styles.sectionTitle}>Referencias</Text>
                        <View style={styles.horizontalLine}></View>
                    </View>
                </Page>
            </Document>
        );

        // Generar el blob del PDF y descargarlo
        const pdfBlob = (
            <PDFDownloadLink document={<MyDocument data={pdfData} />} fileName="habilidades.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Generando PDF...' : ' Descargar PDF'
                }
            </PDFDownloadLink>
        );


        // Mostrar el enlace para descargar el PDF
        setPdfContent(pdfBlob);
    };

    return (
        <div
            className="flex align-items-center justify-content-center w-auto min-w-min">
            <Button
                type="button"
                className="w-30 text-3xl min-w-min"
                label="Generar HOJA DE VIDA"
                style={{
                    background: '#ff0000',
                    borderRadius: '20%',
                    fontSize: '50px',
                    width: '100px',
                    height: '80px',
                    color: "black",
                    justifyContent: 'center'
                }}
                onClick={handleGeneratePDF}
            />
            {pdfContent}

        </div>

    )


}
export default PersonaCombinada;