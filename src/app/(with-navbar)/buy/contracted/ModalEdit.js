import React, { useState, useEffect } from 'react';
import GetRequest from '@/app/ConfigAPI';
import {
    API_CONTRACT
} from '../../../../../api';
import {
    Success,
    ConfirmCancel,
    ConfirmRestore,
    ConfirmUpdate
} from '@/app/componnent/SweetAlertComponent/ResponseMessage'
import {
    Modal,
    Button,
    Form,
    FloatingLabel,
} from 'react-bootstrap';

export default function ModalEdit({ show, handleClose, id }) {
    const [defaultValues, setDefaultValues] = useState({});

    const [witnessOneName, setWitnessOneName] = useState('');
    const [witnessTwoName, setWitnessTwoName] = useState('');
    const [conAmount, setCoAmount] = useState('');
    const [conNote, setConNote] = useState('');

    // *** function *** //
    const ResetData = () => {
        setWitnessOneName(defaultValues.witnessone_name);
        setWitnessTwoName(defaultValues.witnesstwo_name);
        setCoAmount(defaultValues.con_amount);
        setConNote(defaultValues.con_note);
    }

    const handleCloseResetData = () => {
        ResetData();
        handleClose();
    }
    // *** //

    // fetch //
    const fetchContract = async () => {
        try {
            const result = await GetRequest(`${API_CONTRACT}/${id}`, 'GET', null);

            // data default //
            setDefaultValues(result);

            // data //
            setWitnessOneName(result.witnessone_name);
            setWitnessTwoName(result.witnesstwo_name);
            setCoAmount(result.con_amount);
            setConNote(result.con_note);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        if (show) {
            fetchContract();
        }
    }, [show, id]);
    // --- //

    // submit //
    const handleSubmit = (event) => {
        event.preventDefault();

        ConfirmUpdate().then((result) => {
            if (result.isConfirmed) {
                const editData = async () => {
                    try {
                        const formdata = new FormData();
                        formdata.append("id", id);
                        formdata.append("witnessOneName", witnessOneName);
                        formdata.append("witnessTwoName", witnessTwoName);
                        formdata.append("conAmount", conAmount);

                        if (conNote === '') {
                            formdata.append("conNote", '-');
                        } else {
                            formdata.append("conNote", conNote);
                        }

                        const response = await GetRequest(API_CONTRACT, 'PATCH', formdata)

                        if (response.message === 'Update Successfully!') {
                            Success("แก้ไขข้อมูลสำเร็จ!").then(() => handleClose())
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                }

                editData()
            }
        });
    }
    // --- //

    // cancel
    const handleCancel = () => {
        ConfirmCancel().then((result) => {
            if (result.isConfirmed) {
                handleCloseResetData();
            }
        });
    }
    // -- //

    // restore //
    const handleRestore = (event) => {
        event.preventDefault();

        ConfirmRestore().then((result) => {
            if (result.isConfirmed) {
                ResetData();
            }
        });
    }
    // --- //

    return (
        <Modal show={show} onHide={handleCancel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูลสัญญา</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="รหัสจอง"
                        className='mb-3'
                    >
                        <Form.Control type="text" defaultValue={id} readOnly disabled />
                    </FloatingLabel>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">เลขที่สัญญา</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    defaultValue={defaultValues.con_number}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">เลขที่สัญญาจะซื้อจะขายที่ดิน</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    defaultValue={defaultValues.con_numLandSale}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col-md-6'>
                            <label className="col-form-label">ชื่อพยานคนที่หนึ่ง</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="ชื่อพยานคนที่หนึ่ง"
                                    value={witnessOneName}
                                    onChange={(e) => setWitnessOneName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="col-form-label">ชื่อพยานคนที่สอง</label>
                            <div className="mt-1">
                                <Form.Control
                                    type="text"
                                    placeholder="ชื่อพยานคนที่สอง"
                                    value={witnessTwoName}
                                    onChange={(e) => setWitnessTwoName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">จำนวนเงินทำสัญญา</label>
                        <div className="mt-1">
                            <Form.Control
                                type="number"
                                placeholder="จำนวนเงินทำสัญญา"
                                value={conAmount}
                                onChange={(e) => setCoAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="col-form-label">หมายเหตุ</label>
                        <div className="mt-1">
                            <Form.Control
                                as='textarea'
                                placeholder="หมายเหตุ (ถ้าไม่ต้องการกรอกหมายเหตุให้เว้นช่องกรอกนี้ไว้)"
                                value={conNote}
                                onChange={(e) => setConNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRestore}>
                            คืนค่า
                        </Button>
                        <Button variant="warning" type='submit'>
                            แก้ไขข้อมูล
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}