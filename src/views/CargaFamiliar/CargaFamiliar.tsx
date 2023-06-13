import React from 'react'

export default function CargaFamiliar() {
    return (
        <div>

            <h1 className="text-center mb-4 ">Carga Familiar</h1>
            <div className="container text-center">
                <div className="row row-cols-auto mb-4">
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="cedula" className="col-sm col-form-label">Cedula:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="cedula" />
                            </div>

                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="nombres" className="col-sm col-form-label">Nombres: </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="nombres" />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="apellidos" className="col-sm col-form-label">Apellidos: </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="apellidos" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="fechaN" className="col-sm col-form-label">Fecha de nacimiento: </label>
                            <div className="col-sm-8">
                            <input type="date" className="form-control" id="fechaN" />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="archivo" className="col-sm col-form-label">Subir PDF: </label>
                            <div className="col-sm-8">
                            <input type="file" className="form-control" id="archivo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-primary m-5">Agregar</button>
                        <button type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
