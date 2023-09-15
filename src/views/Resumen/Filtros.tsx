import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

function Filtros() {
    const [filters, setFilters] = useState({
        contratoVigente: "",
        discapacidad: "",
        sp: "",
        genero: "",
        fechaInicio: null,
    });


    const [data, setData] = useState([
        {
            nombre: "Juan",
            apellido: "Perez",
            fechaInicio: "2023-01-01",
            fechaFin: "2023-12-31",
            contratoVigente: "NO",
            sp: "NO",
            discapacidad: "NO",
            salario: 50000,
            genero: "Masculino",
        },
        {
            nombre: "María",
            apellido: "González",
            fechaInicio: "2022-03-15",
            fechaFin: "2022-12-31",
            contratoVigente: "NO",
            sp: "SI",
            discapacidad: "Silla de ruedas",
            salario: 60000,
            genero: "Femenino",
        },
        {
            nombre: "María",
            apellido: "González",
            fechaInicio: "2005-03-15",
            fechaFin: "2017-12-31",
            contratoVigente: "SI",
            sp: "SI",
            discapacidad: "Baston",
            salario: 60000,
            genero: "Femenino",
        },
        {
            nombre: "María",
            apellido: "González",
            fechaInicio: "2016-03-15",
            fechaFin: "2018-12-31",
            contratoVigente: "SI",
            sp: "SI",
            discapacidad: "Ciego",
            salario: 60000,
            genero: "Femenino",
        },
    ]);


    const [selectedFechaInicio, setSelectedFechaInicio] = useState<Date | null>(null);

    const [filteredData, setFilteredData] = useState(data);

    // Aplicar los filtros cuando cambian
    useEffect(() => {
        applyFilters();
    }, [filters]);

    const handleFilterChange = (e: any) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleClearFilter = () => {
        setFilters({
            contratoVigente: "",
            discapacidad: "",
            sp: "",
            genero: "",
            fechaInicio: null,
        });
    };

    const applyFilters = () => {
        const filtered = data.filter((item) => {
            const fechaInicio = new Date(item.fechaInicio);
            const contratoNoVigente = item.contratoVigente === "NO";
            const trabajadoMasDe5Anios = new Date().getFullYear() - fechaInicio.getFullYear() >= 5;

            return (
                (filters.contratoVigente === "" ||
                    (filters.contratoVigente === "SI" && !contratoNoVigente) ||
                    (filters.contratoVigente === "NO" &&
                        (contratoNoVigente || !trabajadoMasDe5Anios))) &&
                (filters.discapacidad === "" ||
                    item.discapacidad.toLowerCase().includes(filters.discapacidad.toLowerCase())) &&
                (filters.sp === "" || item.sp === filters.sp) &&
                (filters.genero === "" || item.genero === filters.genero) &&
                (!filters.fechaInicio || fechaInicio >= filters.fechaInicio)
            );
        });

        setFilteredData(filtered);
    };




    const discapacidadFilter = (
        <InputText
            name="discapacidad"
            value={filters.discapacidad}
            onChange={handleFilterChange}
            placeholder="Filtrar por Discapacidad"
        />
    );

    const spFilter = (
        <Dropdown
            optionLabel="label"
            optionValue="value"
            value={filters.sp}
            onChange={(e) => setFilters({ ...filters, sp: e.value })}
            options={[
                { label: "Todos", value: "" },
                { label: "Sí", value: "SI" },
                { label: "No", value: "NO" },
            ]}
            placeholder="Filtrar por SP"
        />
    );

    const generoFilter = (
        <Dropdown
            optionLabel="label"
            optionValue="value"
            value={filters.genero}
            onChange={(e) => setFilters({ ...filters, genero: e.value })}
            options={[
                { label: "Todos", value: "" },
                { label: "Masculino", value: "Masculino" },
                { label: "Femenino", value: "Femenino" },
            ]}
            placeholder="Filtrar por Género"
        />
    );

    const contratoVigenteFilter = (

        <Dropdown
            optionLabel="label"
            optionValue="value"
            value={filters.contratoVigente}
            onChange={(e) => setFilters({ ...filters, contratoVigente: e.value })}
            options={[
                { label: "Todos", value: "" },
                { label: "Sí", value: "SI" },
                { label: "No", value: "NO" },
            ]}
            placeholder="Filtrar por Contrato Vigente"
        />
    );

    const fechaInicioFilter = (
        <Calendar
            name="fechaInicio"
            value={selectedFechaInicio}
           
            onChange={(e) => setSelectedFechaInicio(e.value as Date | null)}
            placeholder="Filtrar por Fecha de Inicio"
        />
    );


    return (
        <div>
            <h1>Tabla de Empleados</h1>
            <div>
                <label>Contrato Vigente:</label>
                {contratoVigenteFilter}
            </div>
            <div>
                {discapacidadFilter}
            </div>
            <div>
                <label>SP:</label>
                {spFilter}
            </div>
            <div>
                <label>Genero:</label>
                {generoFilter}
            </div>
            <div>
                <label>Fecha de Inicio:</label>
                {fechaInicioFilter}
            </div>

            <button onClick={handleClearFilter}>Limpiar Filtros</button>

            <DataTable value={filteredData}>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="apellido" header="Apellido"></Column>
                <Column field="fechaInicio" header="Fecha de Inicio"></Column>
                <Column field="fechaFin" header="Fecha de Fin"></Column>
                <Column field="contratoVigente" header="Contrato Vigente"></Column>
                <Column field="sp" header="SP"></Column>
                <Column field="discapacidad" header="Discapacidad"></Column>
                <Column field="salario" header="Salario"></Column>
                <Column field="genero" header="Género"></Column>
            </DataTable>
        </div>
    );
}

export default Filtros;
