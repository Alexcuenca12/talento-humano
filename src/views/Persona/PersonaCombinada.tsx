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
 


function formatDate(date: Date | undefined): string | null {
    if (!date) return null; // Manejar el caso en que no haya fecha
    const formattedDate = date.toISOString().slice(0, 10); // Formatear la fecha como "YYYY-MM-DD"
    return formattedDate;
}

function PersonaCombinada({ personaId }: { personaId: number }) {

    const [pers1, setpers1] = useState<FichaCombinada>();
    const personaService = new PersonaService();
    const [pdfContent, setPdfContent] = useState<React.ReactNode | null>(null);

    type PdfData = {
        cedula: string
        nombres: string
        apellidos: string
        correo: string
        parroquia: string
        sector: string
        genero: string
        celular: string
        telefono: string
        paisnacimiento: string
        paisresidencia: string
        edad: string
        estadocivil: string
        idioma_raiz: string
        idioma_secundario: string
        descripcionHabilidad: string
        areaestudio: string
        capacitacion: CapacitacionData[];
        experiencia: ExperienciaData[];
        referencia: RecomendacionesData[];
        habilidad: HabilidadesData[];
    };

    type ExperienciaData = {
        areaExperiencia: string;
        instiExperiencia: string;
        fechaiExperiencia: string | null;
        fehcafExperiencia: string | null;
        actividadExperiencia: string;
    };
    type RecomendacionesData = {
        primer_nombre: string;
        primer_apellido: string
        correo: string;

        
    };
    type CapacitacionData = {
        area_estudioCapacitacion: string
        intitucionCapacitacion: string
        eventoCapacitacion: string
        fechaiCapacitacion: string | null
        fechafCapacitacion: string | null
    };

    type HabilidadesData = {
        descripcion : string
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


        const descriHabi = data.habilidades ? data.habilidades.map((habilidad) => habilidad.descripcion).join('\n') : '';

        const capacitaciones: CapacitacionData[] = data.capacitaciones ? data.capacitaciones.map((capa) => ({

            area_estudioCapacitacion: capa.area_estudios,
            intitucionCapacitacion: capa.institucion,
            eventoCapacitacion: capa.tipo_evento,
            fechaiCapacitacion: formatDate(new Date(capa.fecha_inicio)),
            fechafCapacitacion: formatDate(new Date(capa.fecha_fin)),

        })) : [];

        const experiencias: ExperienciaData[] = data.experiencias ? data.experiencias.map((experiencia) => ({
            areaExperiencia: experiencia.area_trabajo,
            instiExperiencia: experiencia.institucion,
            fechaiExperiencia: formatDate(new Date(experiencia.fecha_inicio)),
            fehcafExperiencia: formatDate(new Date(experiencia.fecha_fin)),
            actividadExperiencia: experiencia.actividades,
        })) : [];
        const recomendaciones: RecomendacionesData[] = data.recomendaciones ? data.recomendaciones.map((recomendacion) => ({
            primer_nombre: recomendacion.primer_nombre,
            primer_apellido: recomendacion.primer_apellido,
            correo: recomendacion.correo
            
        })) : [];
        
        const habilidades: HabilidadesData[] = data.habilidades ? data.habilidades.map((habilidad) => ({
            descripcion: habilidad.descripcion,
            
            
        })) : [];




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
            celular: data.persona.celular,
            telefono: data.persona.telefono,
            paisnacimiento: data.persona.pais_nacimiento,
            paisresidencia: data.persona.pais_residencia,
            edad: data.persona.edad,
            estadocivil: data.persona.estado_civil,
            idioma_raiz: data.persona.idioma_raiz,
            idioma_secundario : data.persona.idioma_secundario,
            descripcionHabilidad: descriHabi,
            areaestudio: area,
            experiencia: experiencias,
            capacitacion: capacitaciones,
            referencia: recomendaciones,
            habilidad: habilidades,

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
            
            column: {
                flex: 1,
                marginLeft: 10,  // Ajusta este valor para controlar el espacio entre las columnas
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
                marginVertical: 1,
                marginTop: -10,
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
                        <View style={{ marginTop: 20 }}></View>
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

                        <Text style={styles.sectionTitle}>Experiencia</Text>
                        <View style={styles.horizontalLine}></View>
                        <View style={{ marginTop: 20 }}></View>
                        {data.experiencia.map((experiencia, index) => (
                            <View key={index} style={styles.sectionContent}>
                                <Text style={styles.sectionSubTitle}>{experiencia.areaExperiencia}</Text>
                                <Text>{experiencia.instiExperiencia}</Text>
                                <Text>{experiencia.fechaiExperiencia}  -  {experiencia.fehcafExperiencia}</Text>
                                <Text>{experiencia.actividadExperiencia}</Text>
                                {index !== data.experiencia.length - 1}
                            </View>
                        ))}

                        <Text style={styles.sectionTitle}>Estudios</Text>
                        <View style={styles.horizontalLine}></View>
                        <View style={{ marginTop: 20 }}></View>
                        {data.capacitacion.map((capacitacion, index) => (
                            <View key={index} style={styles.sectionContent}>
                                <Text style={styles.sectionSubTitle}>{capacitacion.area_estudioCapacitacion}</Text>
                                <Text style={styles.sectionContent}>{capacitacion.intitucionCapacitacion}</Text>
                                <Text style={styles.sectionContent}>{capacitacion.eventoCapacitacion}</Text>
                                <Text style={styles.sectionContent}>{capacitacion.fechaiCapacitacion}  -  {capacitacion.fechafCapacitacion}</Text>
                                {index !== data.capacitacion.length - 1}
                            </View>
                        ))}
                        


                        <Text style={styles.sectionTitle}>Referencias</Text>
                        <View style={styles.horizontalLine}></View>
                        <View style={{ marginTop: 20 }}></View>
                        {data.referencia.map((referencia, index) => (
                            <View key={index} style={styles.sectionContent}>
                                <Text style={styles.sectionContent}>Nombre: {referencia.primer_nombre}</Text>
                                <Text style={styles.sectionContent}>Apellido: {referencia.primer_apellido}</Text>
                                <Text style={styles.sectionContent}>Correo: {referencia.correo}</Text>
                                
                                {index !== data.referencia.length - 1}
                            </View>
                        ))}

                        <Text style={styles.sectionTitle}>Habilidades</Text>
                        <View style={styles.horizontalLine}></View>
                        <View style={{ marginTop: 20 }}></View>
                        {data.habilidad.map((habilidad, index) => (
                            <View key={index} style={styles.sectionContent}>
                                <Text style={styles.sectionContent}>Descripción: {habilidad.descripcion}</Text>
                                
                                
                                {index !== data.referencia.length - 1}
                            </View>
                        ))}

                        <Text style={styles.sectionTitle}>Idiomas</Text>
                        <View style={styles.horizontalLine}></View>
                        <View style={{ marginTop: 20 }}></View>
                        <View style={styles.tableRow}>
                            <View style={styles.leftColumn}>
                                <Text style={styles.sectionContent}>{data.idioma_raiz} , {data.idioma_secundario}</Text>
                                
                            </View>
                            
                        </View>
                        


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