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
import swal from 'sweetalert';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


function HabilidadesContext() {
  const [habi1, sethabi1] = useState<IHabilidadesData[]>([]);
  const [formData, setFormData] = useState<IHabilidadesData>({
    id_habilidades: 0,
    descripcion: "",
    id_persona: 0,
  });

  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState<number | undefined>(undefined);
  const habilidadService = new HabilidadesService();
  const [pdfContent, setPdfContent] = useState<React.ReactNode | null>(null);


  useEffect(() => {


    habilidadService.getAll()
      .then((data) => {
        sethabi1(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });

  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.descripcion) {

      swal('Advertencia', 'Por favor, complete todos los campos', 'warning');
      return;

    }
    // Crear una instancia de Persona con el id deseado (por ejemplo, 1)
    const personaData = {
      id_persona: 1, // Coloca aquí el id válido de la persona
    };


    // Asignar el valor "1" al campo id_persona en formData
    const dataToSend = {
      ...formData,
      persona: personaData, // Aquí se establece el valor "1" como una cadena
    };

    habilidadService
      .save(dataToSend)
      .then((response) => {

        resetForm();
        console.log("guardado: ", dataToSend)
        swal('Habilidad', 'Datos Guardados Correctamente', 'success');
        habilidadService.getAll()
          .then((data) => {
            sethabi1(data);
            console.log("datos son: ", data)
          })
          .catch((error) => {
            console.error("Error al obtener los datos:", error);
          });
      })
      .catch((error) => {
        console.error('Error al enviar el formulario:', error);
      });
  };

  const handleDelete = (id: number | undefined) => {
    if (id !== undefined) {
      swal({
        title: 'Confirmar Eliminación',
        text: '¿Estás seguro de eliminar este registro?',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancelar',
            visible: true,
            className: 'cancel-button',
          },
          confirm: {
            text: 'Sí, eliminar',
            className: 'confirm-button',
          },
        },
      }).then((confirmed) => {
        if (confirmed) {
          habilidadService
            .delete(id)
            .then(() => {
              sethabi1(habi1.filter((habi) => habi.id_habilidades !== id));
              swal('Eliminado', 'El registro ha sido eliminado correctamente', 'error');
            })
            .catch((error) => {
              console.error('Error al eliminar el registro:', error);
              swal('Error', 'Ha ocurrido un error al eliminar el registro', 'error');
            });
        }
      });
    }
  };

  const handleEdit = (id: number | undefined) => {
    if (id !== undefined) {
      const editItem = habi1.find(habi => habi.id_habilidades === id);
      if (editItem) {
        setFormData(editItem);
        setEditMode(true);
        setEditItemId(id);

      }
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItemId !== undefined) {
      habilidadService.update(Number(editItemId), formData as IHabilidadesData)
        .then((response) => {
          swal({
            title: "Habilidad",
            text: "Datos actualizados correctamente",
            icon: "success"
          });
          setFormData({ ...formData });
          sethabi1(habi1.map((habi) => habi.id_habilidades === editItemId ? response : habi));
          setEditMode(false);
          setEditItemId(undefined);
        })
        .catch((error) => {
          console.error("Error al actualizar el formulario:", error);
        });
    }
  };

  const resetForm = () => {
    setFormData({
      descripcion: "",
      id_persona: formData.id_persona,

    });
    setEditMode(false);
    setEditItemId(undefined);

  };

  const generatePdfContent = () => {
    return habi1.map((habilidad) => habilidad.descripcion);
  };

  const handleGeneratePDF = () => {
    const dataToPdf = generatePdfContent();

    const styles = StyleSheet.create({
      page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
      },
      description: {
        fontSize: 16,
        marginBottom: 10,
      },
    });

    const MyDocument = () => (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>Habilidades</Text>
          {dataToPdf.map((descripcion, index) => (
            <View key={index}>
              <Text style={styles.description}>{descripcion}</Text>
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
    <Fieldset className="fgrid col-fixed" >
      <Card
        header={cardHeader}
        className="border-solid border-blue-800 border-3">

        <div className="h1-rem">
          <Divider align="center">
            <h1 className="text-7xl font-smibold lg:md-2">Habilidades</h1>
          </Divider>
        </div>
        <div className="flex justify-content-center ">
          <form onSubmit={editMode ? handleUpdate : handleSubmit}>
            <div className="flex align-content-center w-auto max-w-full">
              <InputTextarea autoResize rows={5} cols={30}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Describa su habilidad"
                className="w-max text-2xl " />

            </div>

            <div
              className="flex flex-row  w-full h-full justify-content-center  flex-grow-1  row-gap-8 gap-8 flex-wrap mt-6">
              <div
                className="flex align-items-center justify-content-center w-auto min-w-min">
                <Button type="submit" label={editMode ? 'Actualizar' : 'Guardar'}
                  onClick={editMode ? handleUpdate : handleSubmit}
                  className="w-full text-3xl min-w-min "
                  rounded />
              </div>
              <div
                className="flex align-items-center justify-content-center w-auto min-w-min">
                <Button type="button" label="Cancel" onClick={resetForm}
                  className="w-full text-3xl min-w-min"
                  rounded />
              </div>
            </div>

          </form>
        </div>

        <table style={{ minWidth: '70rem' }} className="mt-5  w-full h-full text-3xl font-medium">
          <thead>
            <tr style={{ backgroundColor: '#0C3255', color: 'white' }}>
              <th>Descripciones Agregadas</th>
              <th>Acciones</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {habi1.map((habilidad) => (
              <tr className='text-center' key={habilidad.id_habilidades?.toString()} >

                <td>{habilidad.descripcion}</td>
                <td></td>
                <td>
                  <Button
                    type="button"
                    className="w-30 text-3xl min-w-min"
                    label="✎"

                    style={{
                      background: '#ff9800',
                      borderRadius: '10%',
                      fontSize: '30px',
                      width: '70px',
                      height: '50px',
                      color: "black",
                      justifyContent: 'center',
                      marginRight: '5px' // Espacio entre los botones
                    }}
                    onClick={() => handleEdit(habilidad.id_habilidades?.valueOf())}
                  // Agrega el evento onClick para la operación de editar

                  />
                  <Button
                    type="button"
                    className="w-30 text-3xl min-w-min"
                    label="✘"
                    style={{
                      background: '#ff0000',
                      borderRadius: '10%',
                      fontSize: '30px',
                      width: '70px',
                      height: '50px',
                      color: "black",
                      justifyContent: 'center'
                    }}
                    onClick={() => handleDelete(habilidad.id_habilidades?.valueOf())}
                  // Agrega el evento onClick para la operación de eliminar

                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="flex align-items-center justify-content-center w-auto min-w-min">
          <Button
            type="button"
            className="w-30 text-3xl min-w-min"
            label="Generar pdf"
            style={{
              background: '#ff0000',
              borderRadius: '10%',
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






      </Card>
    </Fieldset>
  )
}

export default HabilidadesContext;
