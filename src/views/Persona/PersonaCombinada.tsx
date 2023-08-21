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
import DatosPersonales from './Datos_personales'
import Presentacion from "./Presentacion";
import Recomendacion from "./Recomendaciones";
import Instruccion from "./Instrucciones";
import Habilidades from "./Habilidades";
import Experiencia from "./Experiencias";
import Certificados from "./Certificados";
import { InstruccionFormalData } from "../../interfaces/Primary/IInstrucc_Formal";

function PersonaCombinada({ personaId }: { personaId: number }) {

    const [pers1, setpers1] = useState<FichaCombinada | null>(null);
    const personaService = new PersonaService();
    const [pdfContent, setPdfContent] = useState<React.ReactNode | null>(null);

    type PdfData = {
        cedula: String
        nombres: String
        apellidos: String
        correo: String
        area_estudioCapacitacion: String
        celular: String
        telefono: String
        paisnacimiento: String
        paisresidencia: String
        edad: String
        estadocivil: String
        descripcionHabilidad: String
        actividadExperiencia: String
        foto: String
        genero: String
        primer_nombre_apellido_reco: String
        correo_reco: String
        Instruccion_form: String
       certificado: String
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

        const areaEstudios = data.capacitaciones.map((capacitacion) => capacitacion.area_estudios).join('\n');
        const descriHabi = data.habilidades.map((habilidad) => habilidad.descripcion).join('\n');
        const actiExper = data.experiencias.map((experiencia) => experiencia.actividades).join('\n');
        const nombresApellidosReco = data.recomendaciones.map((experiencia) => `${experiencia.primer_nombre} ${experiencia.primer_apellido}`).join('\n');
        console.log("instruccion " + data.instruccion)
        const Instruccion_form = data.instruccion ? data.instruccion.map((instru: InstruccionFormalData) => instru.areaEstudios).join('\n') : '';
        //const Instruccion_form = data.instruccion.map((instru: InstruccionFormalData) => instru.areaEstudios).join('\n');
        const correo_reco = data.recomendaciones.map((experiencia) => experiencia.correo).join('\n');
        const certificado = data.recomendaciones.map((experiencia) => experiencia.documentoRecomendacion).join('\n');
        


        return {
            cedula: data.persona.ci_pasaporte,
            nombres: data.persona.nombres,
            apellidos: data.persona.apellidos,
            correo: data.persona.correo,
            area_estudioCapacitacion: areaEstudios,
            celular: data.persona.celular,
            telefono: data.persona.telefono,
            paisnacimiento: data.persona.pais_nacimiento,
            paisresidencia: data.persona.pais_residencia,
            edad: data.persona.edad,
            estadocivil: data.persona.estado_civil,
            descripcionHabilidad: descriHabi,
            actividadExperiencia: actiExper,
            foto: data.persona.foto,
            genero: data.persona.genero,
            primer_nombre_apellido_reco: nombresApellidosReco,
            correo_reco: correo_reco,
            Instruccion_form: Instruccion_form,
            certificado: certificado

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
            verticalLine: {
                borderLeftWidth: 1,       // Ancho de la línea
                borderLeftColor: 'blue', // Color de la línea
                marginHorizontal: 10,     // Espacio a ambos lados de la línea
                height: '100%',           // Asegura que la línea abarque toda la altura
              },
        });

        const MyDocument = ({ data }: { data: PdfData }) => (
            <Document>
    <Page style={styles.page}>
      <View style={styles.margin}>
        <View style={styles.tableRow}>
          <View style={styles.column}>
            <View>
              <Presentacion datos={pdfData} />
            </View>

            <View style={styles.section}>
              <DatosPersonales datos={pdfData} />
            </View>
          </View>

          <View style={styles.verticalLine}></View> {/* Línea vertical */}
          
          <View style={styles.column}>
            <View style={styles.section}>
              <Recomendacion datos={pdfData} />
            </View>

            <View style={styles.section}>
              <Instruccion datos={pdfData} />  
            </View>

            <View style={styles.section}>
              <Habilidades datos={pdfData} />
            </View>

            <View style={styles.section}>
              <Experiencia datos={pdfData} />
            </View>
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