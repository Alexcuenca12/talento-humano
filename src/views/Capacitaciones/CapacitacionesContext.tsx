import React from 'react'

export default function CapacitacionesContext() {
    return (
        <div>
            <h1 className="text-center mb-4 ">Capacitaciones</h1>
            <div className="container text-center">

                <div className="row row-cols-auto mb-4">

                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="cedula" className="col-sm col-form-label">Institucion:</label>
                            <div className="col-sm-auto">
                                <select className="col-sm form-select" id="validationCustom04" required>
                                    <option selected disabled value="">Escoger Opcion</option>
                                    <option>...</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid state.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="nombres" className="col-sm col-form-label">Tipo de Evento: </label>
                            <div className="col-sm-auto">
                                <select className="col-sm form-select" id="validationCustom04" required>
                                    <option selected disabled value="">Escoger Opcion</option>
                                    <option>...</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid state.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="input3" className="col-sm col-form-label">Area de Estudio: </label>
                            <div className="col-sm-auto">
                                <select className="col-sm form-select" id="validationCustom04" required>
                                    <option selected disabled value="">Escoger Opcion</option>
                                    <option>...</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid state.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row row-cols-auto mb-4">

                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="fechaD" className="col-sm col-form-label">Desde: </label>
                            <div className="col-sm-auto">
                                <input type="date" className="form-control" id="fechaD"/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="fechaH" className="col-sm col-form-label">Hasta: </label>
                            <div className="col-sm-auto">
                                <input type="date" className="form-control" id="fechaH"/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="input3" className="col-sm col-form-label">Numero de dias: </label>
                            <div className="col-sm-auto">
                                <input type="text" className="form-control" id="input3"/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row row-cols mb-4">

                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="input3" className="col-sm-auto col-form-label">Nombre de evento:</label>
                            <div className="col-sm-auto">
                                <input type="text" className="form-control" id="input3"/>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="input3" className="col-sm-auto col-form-label">Tipo de certificado: </label>
                            <div className="col-sm-auto">
                                <select className="col-sm form-select" id="validationCustom04" required>
                                    <option selected disabled value="">Escoger Opcion</option>
                                    <option>...</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid state.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="input3" className="col-sm-auto col-form-label">N de Horas Totales: </label>
                            <div className="col-sm-auto">
                                <input type="text" className="form-control" id="input3"/>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row row-cols-auto">
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="archivo" className="col-sm-auto col-form-label">Subir PDF: </label>
                            <div className="col-sm-auto">
                                <input type="file" className="form-control" id="archivo"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
