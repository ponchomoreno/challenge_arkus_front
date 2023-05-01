/* eslint-disable */

import * as React from 'react';
import { Provider } from 'react-redux';
import './config/enzyme.config';
import { shallow, mount } from 'enzyme';
import {
    CLIENTES, CONCEPTOS, USOS_CFDI, UNIDADES_SAT, TIPOS_IMPUESTOS,
    TIPOS_COMPROBANTES, SERIES, PROD_SAT, CUENTAS_CONTABLES, REGIMENES_FISCALES
} from '../staticData/conceptosClientesTest';
import { mapDispatchToProps, mapStateToProps } from '../components/catalogosFacturacion';
import CatalogosFacturacion from '../components/catalogosFacturacion';
import { CatalogosFacturacion as Facturacion } from '../components/catalogosFacturacion';
import configureStore from 'redux-mock-store';

const dSeries = ({
    id: 1, clave: "A", descripcion: "Test", idEstatus: 1, idTipoDeComprobante: 1
});
const store = {
    catalogosFacturacionRepository: {
        unidadesSat: UNIDADES_SAT,
        listadoConceptos: CONCEPTOS,
        listadoClientes: CLIENTES,
        statusSaveConceptoCliente: 200,
        busquedaProdSat: { clave: 'G09', nombre: 'AUTOS' },
        usosCfdiFacturacion: USOS_CFDI,
        listadoSeries: SERIES,
        respuestaListado: 200,
        listadoTiposDeComprobante: TIPOS_COMPROBANTES,
        respuestaListadoTiposDeComprobante: 200,
        statusSaveSerie: 200,
    },
    suppliersList: {
        cuentasContablesFilter: '2000100010001000',
        impuestosFacturacion: TIPOS_IMPUESTOS,
    }
};
describe('Catologos de facturacion', () => {

    test('Se espera que el componente listado Series exista', () => {
        const middlewares = []
        const mockStore = configureStore(middlewares)
        const storecomponent = mockStore(store)
        const wrapper = mount(
            <Provider store={storecomponent}>
                <CatalogosFacturacion />
            </Provider>
        );
        expect(wrapper.exists()).toBe(true);
    });

    test('El boton "+ NUEVA SERIE" despliega el modal para agregar una nueva serie', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={[]}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        wrapper.setState({ SerieModal: true });
        wrapper.instance().agregarSerie();
        expect(wrapper.state('SerieModal')).toEqual(true);
    });

    test('El título del modal sea "AGREGAR SERIE" cuando se de click al boton "+ NUEVA SERIE"', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={[]}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        wrapper.setState({ tituloModal: '' });
        expect(wrapper.state('tituloModal')).toEqual('');
        wrapper.instance().agregarSerie();
        expect(wrapper.state('tituloModal')).toEqual('Agregar serie');
    });

    test('Se comprueba que la primer pestaña del tabs sea de Series', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={[]}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        let primerPestañaTab = expect(wrapper.find('ApoloSimcoTabs').props().tabs[0].name);
        expect(primerPestañaTab.toEqual('SERIES'));
    });

    test('opcionHover', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={[]}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        expect(wrapper.state('opcionHover')).toEqual(-1);

    });

    test('agregarSerie', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={[]}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        wrapper.instance().agregarSerie();
        expect(wrapper.state('serieModal')).toBe(true);
        expect(wrapper.state('tituloModal')).toEqual('Agregar serie');

    });

    test('handleCloseSerieModal', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={[]}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        wrapper.instance().handleCloseSerieModal();
        expect(wrapper.state('serieModal')).toBe(false);
        expect(wrapper.state('tituloModal')).toEqual('');
        expect(wrapper.state('clave')).toEqual('');
        expect(wrapper.state('descripción')).toEqual('');
        expect(wrapper.state('idEstatus')).toEqual(1);
        expect(wrapper.state('descripcionHelpterText')).toEqual('0/100 caracteres');

    });

    test('disabledBotonGuardar', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={[]}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        wrapper.instance().disabledBotonGuardar();
    });

    test('formatTable', () => {
        let serie = dSeries[0];
        const wrapper = shallow(
            <Facturacion
                listadoSeries={[]}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        wrapper.instance().formatTable(serie);
    });

    test('Montado de componentes con informacion de store de redux y testeo de tabs', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={SERIES}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        // wrapper.find('ApoloSimcoTabs')
        let onClickAgregarSerie = wrapper.find('ApoloSimcoTabs').props().tabs[0].content.props.children[0].props.children.props.onClick;
        onClickAgregarSerie();
        let onClickEditSerie = wrapper.find('ApoloSimcoTabs').props().tabs[0].content.props.children[1].props.children.props.showOnHover.props.children.props.onClick
        onClickEditSerie(1);
        let onKeyPressBusquedaCliente = wrapper.find('ApoloSimcoTabs').props().tabs[1].content.props.children[0].props.children[0].props.children.props.onKeyPress;
        wrapper.setState({ banderaChangeBusquedaCliente: true, busquedaCliente: 'prueba' });
        onKeyPressBusquedaCliente({ key: 'Enter', target: { blur: jest.fn() } });
        let onClickAgregarCliente = wrapper.find('ApoloSimcoTabs').props().tabs[1].content.props.children[0].props.children[1].props.children.props.onClick;
        onClickAgregarCliente();
        let onKeyPressClientes = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[0].props.children[0].props.children.props.onKeyPress;
        onKeyPressClientes({ key: 'Enter', target: { blur: jest.fn() } });
        let onClickAgregarConcepto = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[0].props.children[1].props.onClick;
        onClickAgregarConcepto();
        wrapper.setState({ opcionHover: 61 });
        let onClickEditConcepto = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[1].props.children.props.showOnHover.props.children.props.onClick;
        onClickEditConcepto();
        // console.log(wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[1].props.children.props.showOnHover.props.children.props);
    })
    test('Test a las funciones mapDispatchToProps y mapStateToProps', () => {
        let initialState = {
            catalogosFacturacionRepository: {
                unidadesSat: UNIDADES_SAT,
                listadoConceptos: CONCEPTOS,
                listadoClientes: CLIENTES,
                statusSaveConceptoCliente: 200,
                busquedaProdSat: { clave: 'G09', nombre: 'AUTOS' },
                usosCfdiFacturacion: USOS_CFDI,
                listadoSeries: SERIES,
                respuestaListado: 200,
                listadoTiposDeComprobante: TIPOS_COMPROBANTES,
                respuestaListadoTiposDeComprobante: 200,
                statusSaveSerie: 200,
            },
            suppliersList: {
                cuentasContablesFilter: '2000100010001000',
                impuestosFacturacion: TIPOS_IMPUESTOS,
            }
        };

        const dispatch = jest.fn();
        mapStateToProps(initialState);
        mapDispatchToProps(dispatch).actionGetAllSeries();
        mapDispatchToProps(dispatch).actionCleanSeriesList();
        mapDispatchToProps(dispatch).saveSeries();
        mapDispatchToProps(dispatch).actionGetTiposDeComprobante();
        mapDispatchToProps(dispatch).actionsGetImpuestos();
        mapDispatchToProps(dispatch).actionFilterAccount();
        mapDispatchToProps(dispatch).actionsClearCuentaContable();
        mapDispatchToProps(dispatch).actionsGetUnidadesSat();
        mapDispatchToProps(dispatch).actionsGuardarClienteConcepto();
        mapDispatchToProps(dispatch).actionGetListadoConceptos();
        mapDispatchToProps(dispatch).saveEditSeries();
        mapDispatchToProps(dispatch).actionLimpiarListadoConceptos();
        mapDispatchToProps(dispatch).actionLimpiarListadoClientes();
        mapDispatchToProps(dispatch).actionCleanStatusSaveConceptoCliente();
        mapDispatchToProps(dispatch).actionUpdateConceptoCliente();
        mapDispatchToProps(dispatch).actionFilterProdYServSat();
        mapDispatchToProps(dispatch).actionsCleanProdServSat();
        mapDispatchToProps(dispatch).actionsGetUsosCfdi();
        mapDispatchToProps(dispatch).actionGetListadoClientes();
    })

    test('Testeo de funciones varias para el tab de cliente', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={SERIES}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
                regimenesFiscalesSAT={REGIMENES_FISCALES}
                actionLimpiarListadoConceptos={jest.fn()}
                actionLimpiarListadoClientes={jest.fn()}
                actionGetAllSeries={jest.fn()}
                actionCleanSeriesList={jest.fn()}
                actionGetListadoClientes={jest.fn()}
                actionGetListadoConceptos={jest.fn()}
            />
        );
        wrapper.setState({ opcionHover: 59 });
        wrapper.instance().editarCliente();
        wrapper.setState({ opcionHover: 58, busquedaCliente: 'PRUEBA', banderaChangeBusquedaCliente: true });
        wrapper.instance().editarCliente();
        wrapper.instance().onBlurCampoBusquedaCliente();
        wrapper.setState({ busquedaCliente: '' });
        wrapper.instance().onBlurCampoBusquedaCliente();
        wrapper.setState({ opcionHover: 57 });
        wrapper.instance().editarCliente()
    })

    test('Testeo de funciones varias para el tab de conceptos', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={SERIES}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
                actionLimpiarListadoConceptos={jest.fn()}
                actionLimpiarListadoClientes={jest.fn()}
                actionGetAllSeries={jest.fn()}
                actionCleanSeriesList={jest.fn()}
                actionGetListadoClientes={jest.fn()}
                actionGetListadoConceptos={jest.fn()}
            />
        );
        wrapper.setState({ banderaChangeBusquedaConcepto: true, busquedaConcepto: 'CONCEPTO' });
        wrapper.instance().onBlurCampoBusquedaConcepto();
        wrapper.setState({ busquedaConcepto: '' });
        wrapper.instance().onBlurCampoBusquedaConcepto();
        wrapper.instance().onChangeTabCatalogosFacturacion('series');
        wrapper.instance().onChangeTabCatalogosFacturacion('clientes');
        wrapper.instance().onChangeTabCatalogosFacturacion('conceptos');
    })

    test('Testeo en componentes searchBar', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={SERIES}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
                filterProductosSat={PROD_SAT}
                actionsCleanProdServSat={jest.fn()}
                actionFilterProdYServSat={jest.fn()}
                cuentasContablesFilter={CUENTAS_CONTABLES}
            />
        );
        let onChangeSearchBarCuentaNumeroConcepto = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[2].props.children.props.dialogContentBody.props.children.
            props.children[5].props.children[1].props.children.props.onChange;
        let selectedCuentaContable = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[2].props.children.props.dialogContentBody.props.children.
            props.children[5].props.children[1].props.children.props.onOptionSelected;
        let onChangeSearchBarNombreCuenteConcepto = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[2].props.children.props.dialogContentBody.props.children.
            props.children[5].props.children[2].props.children.props.onChange;
        selectedCuentaContable('2000100010001000');
        let value = '2100';
        let valueGrande = '21002100210021002100'
        let valueVacio = '';
        onChangeSearchBarCuentaNumeroConcepto(value, 'numeroCuenta')
        onChangeSearchBarCuentaNumeroConcepto(valueVacio, 'numeroCuenta')
        onChangeSearchBarCuentaNumeroConcepto(valueGrande, 'numeroCuenta')
        onChangeSearchBarNombreCuenteConcepto(value, 'nombreCuenta')
        onChangeSearchBarNombreCuenteConcepto(valueVacio, 'nombreCuenta')
        let onChangeProdutoServicioSat = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[2].props.children.props.dialogContentBody.props.children.
            props.children[0].props.children.props.onChange;
        // let onSelectedOptionProdutoServicioSat = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[2].props.children.props.dialogContentBody.props.children.
        //     props.children[0].props.children.props.onOptionSelected;
        onChangeProdutoServicioSat('MOTOCICLETAS')
        onChangeProdutoServicioSat('MO')
        // onSelectedOptionProdutoServicioSat(3)
        let optionSelectedProdSat = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[2].props.children.props.dialogContentBody.props.children.
            props.children[0].props.children.props.onOptionSelected;
        optionSelectedProdSat(3)
        wrapper.instance().clearSearchBarProductoSat();
        wrapper.instance().clearSearchBarCuentasClientesConceptos();

        let onOptionSelectedNombreCuenta = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[2].props.children.props.dialogContentBody.props.children.
            props.children[5].props.children[2].props.children.props.onOptionSelected;
        onOptionSelectedNombreCuenta('2000100010001000');
        let onClickBotonGuardarConceptoCliente = wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[2].props.children.props.dialogContentBody.props.children.
            props.children[5].props.children[3].props.children.props.onClick;
        onClickBotonGuardarConceptoCliente('concepto')
        // console.log(wrapper.find('ApoloSimcoTabs').props().tabs[2].content.props.children[2].props.children.props.dialogContentBody.props.children.
        //     props.children[5].props.children[3].props.children.props
        // );
    })

    test('Testeo de la funcion onChange en los campos de los modales', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={SERIES}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
            />
        );
        wrapper.instance().onChangeModalClientesConceptos({ target: { name: 'importeConcepto', value: 1002.21 } })
        wrapper.instance().onChangeModalClientesConceptos({ target: { name: 'rfcCliente', value: 'MOVJ201212H87' } })
        wrapper.instance().onChangeModalClientesConceptos({ target: { name: 'correoElectronicoCliente', value: 'correo@correo.com' } })
        wrapper.instance().onChangeModalClientesConceptos({ target: { name: 'busquedaCliente', value: 'leroy' } })
        wrapper.instance().onChangeModalClientesConceptos({ target: { name: 'busquedaConcepto', value: 'prueba' } })
        wrapper.instance().onChangeModalClientesConceptos({ target: { name: 'nombreCliente', value: 'TESTEO NOMBRE' } })
        wrapper.instance().onChangeModalClientesConceptos({ target: { name: 'unidadMedidaSat', value: 'ABC' } })
        wrapper.instance().onChangeModalClientesConceptos({ target: { name: 'impuestoSat', value: 1 } })
    })
    test('Test funciones varias del componente', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={SERIES}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
                statusSaveConceptoCliente={200}
                actionGetListadoClientes={jest.fn()}
                actionCleanStatusSaveConceptoCliente={jest.fn()}
                actionGetListadoConceptos={jest.fn()}
                actionsGuardarClienteConcepto={jest.fn()}
                actionGetAllSeries={jest.fn()}
                actionsGetImpuestos={jest.fn()}
                actionsGetUsosCfdi={jest.fn()}
                actionsGetUnidadesSat={jest.fn()}
            />
        );
        wrapper.setState({ busquedaConcepto: 'prueba', busquedaCliente: 'hola' });
        wrapper.instance().getListadoConceptoCliente('concepto')
        wrapper.instance().getListadoConceptoCliente('cliente')
        wrapper.instance().guardarConceptoCliente('concepto')
        wrapper.instance().guardarConceptoCliente('cliente')
        wrapper.setState({ correoElectronicoCliente: 'correo@correo.com', rfcCliente: 'MOVJ121212J78' });
        wrapper.instance().checkRfcEmailFormat({ target: { name: 'correoElectronicoCliente' } })
        wrapper.instance().checkRfcEmailFormat({ target: { name: 'rfcCliente' } })
        wrapper.setState({ correoElectronicoCliente: 'correocoreo.c', rfcCliente: 'MOVJ11212' });
        wrapper.instance().checkRfcEmailFormat({ target: { name: 'rfcCliente' } })
        wrapper.instance().checkRfcEmailFormat({ target: { name: 'correoElectronicoCliente' } })
        wrapper.instance().selectStatus('activo');
        wrapper.instance().selectStatus('inactivo');
        wrapper.instance().selectStatus('prueba');
        wrapper.setState({ limitePaginado: 50, busquedaCliente: 'hola', busquedaConcepto: 'test' });
        wrapper.instance().getSeriesFilter({});
        wrapper.instance().getClientes({});
        wrapper.instance().getConceptos({})
        let actions = { limite: 50, pagina: 3, orden: ['asc'], ordenDir: ['asc'] }
        wrapper.instance().tableActionsConcepto(actions);
        wrapper.instance().tableActionsCliente(actions);
        wrapper.instance().tableActions(actions);
        wrapper.instance().getImpuestosClavesYUnidadesSat()
    })

    test('Test a la pestaña de series', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={SERIES}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
                saveEditSeries={jest.fn()}
                errorSaveSerie={200}
            />
        );

        wrapper.instance().editSerie(1);
        wrapper.instance().editSerie(10);
        wrapper.instance().hoverOpcionesListado(10)
        wrapper.instance().saveSerie()
        wrapper.instance().resetPagination();
        wrapper.instance().resetPaginationConcepto();
        wrapper.instance().resetPaginationCliente();
        wrapper.instance().handleChangeInputDescripcion({ target: { value: 'PRUEBA DE ALTA DE SERIES' } })
        wrapper.instance().handleChangeInput({ target: { id: 'clave', value: 'PRUEBA CLAVE' } })
        wrapper.instance().formatNumberToMoneyCatalogos(1000, true)
        wrapper.instance().formatNumberToMoneyCatalogos(-2000, true)
        // console.log(wrapper.find('ApoloSimcoTabs').props().tabs[0].content.props.children[2].
        //     props.children.props.dialogContentBody.props.children[4].props.children[1].props
        // );
    })

    test('Test a los rfc cuando son de personal moral o fisica', () => {
        const wrapper = shallow(
            <Facturacion
                listadoSeries={SERIES}
                listadoConceptosFacturacion={CONCEPTOS}
                listadoClientesFacturacion={CLIENTES}
                usosCfdi={USOS_CFDI}
                unidadesMedidaSat={UNIDADES_SAT}
                impuestosFacturacion={TIPOS_IMPUESTOS}
                statusSaveConceptoCliente={200}
                regimenesFiscalesSAT={REGIMENES_FISCALES}
            />
        );
        wrapper.setState({ rfcCliente: 'MOVJ121212J78' });
        wrapper.instance().checkRfcEmailFormat({ target: { name: 'rfcCliente' } })
        wrapper.setState({ rfcCliente: 'ELT121212J78' });
        wrapper.instance().checkRfcEmailFormat({ target: { name: 'rfcCliente' } })
        wrapper.setState({ rfcCliente: '' });
        wrapper.instance().checkRfcEmailFormat({ target: { name: 'rfcCliente' } })
    })

});

// .content.props.children[2].
//             props.children.props.dialogContentBody.props.children[4].props.children[1].props.children.props